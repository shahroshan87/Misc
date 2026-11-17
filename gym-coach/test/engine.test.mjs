// Runs the tracking engine from index.html against synthetic joint-angle traces.
// Usage: node gym-coach/test/engine.test.mjs
import fs from 'node:fs';
import assert from 'node:assert/strict';
import { fileURLToPath } from 'node:url';
import { replay } from './replay.mjs';

const html = fs.readFileSync(fileURLToPath(new URL('../index.html', import.meta.url)), 'utf8');
const src = html.match(/<script id="engine">([\s\S]*?)<\/script>/)[1];
new Function(src)();
const { packFrame, unpackFrame, EX, EQUIP, PATTERNS, Tracker, measure, ruleCoach, available, lacking, options, buildSplit } = globalThis.GymEngine;

const SEEN = { sh: 1, el: 1, wr: 1, hip: 1, kn: 1, an: 1 };
const base = { knee: 175, hip: 175, elbow: 170, shoulder: 10, thigh: 85, lean: 5, bodyLine: 175, kneeRatio: 1, wristsUp: 0, handsHigh: 1, wristDrop: 0.55, view: 'side', seen: SEEN };
const FPS = 30;
// Cosine move of one signal from a to b and back; other metrics supplied by `extra(phase 0..1)`.
function* repTrace(key, a, b, down, up, extra = () => ({})) {
  const n1 = Math.round(down * FPS), n2 = Math.round(up * FPS);
  for (let i = 1; i <= n1; i++) { const k = (1 - Math.cos(Math.PI * i / n1)) / 2; yield { ...base, [key]: a + (b - a) * k, ...extra(k) }; }
  for (let i = 1; i <= n2; i++) { const k = (1 + Math.cos(Math.PI * i / n2)) / 2; yield { ...base, [key]: a + (b - a) * k, ...extra(k) }; }
}
function* hold(m, secs) { for (let i = 0; i < secs * FPS; i++) yield m; }
function run(exId, frames, t0 = 100) {
  const tr = new Tracker(exId), ev = []; let t = t0;
  for (const m of frames) { t += 1 / FPS; ev.push(...tr.update(t, m ? { ...m, knee: m.knee + (Math.random() - 0.5) * 2 } : null)); }
  return { ev, tr, t };
}
const of = (ev, type) => ev.filter((e) => e.type === type);
function* chain(...gens) { for (const g of gens) yield* g; }

// 1. Five squats to depth, then standing: one set of 5, clean, ends after the quiet gap.
{
  const squat = () => repTrace('knee', 172, 70, 1.4, 1.0, (k) => ({ thigh: 85 - 85 * k, lean: 5 + 35 * k }));
  const { ev } = run('squat', chain(hold(base, 2), squat(), squat(), squat(), squat(), squat(), hold(base, 12)));
  assert.equal(of(ev, 'setStart').length, 1);
  assert.equal(of(ev, 'rep').length, 5);
  const end = of(ev, 'setEnd'); assert.equal(end.length, 1);
  assert.equal(end[0].set.reps, 5);
  assert.deepEqual(Object.keys(end[0].set.fixes), []);
  assert.ok(Math.abs(end[0].set.ecc - 1.4) < 0.25 && Math.abs(end[0].set.con - 1.0) < 0.25, `tempo ${end[0].set.ecc}/${end[0].set.con}`);
  assert.ok(end[0].t - of(ev, 'rep')[4].rep.t === 0, 'set end is stamped at the last rep, so rest time is exact');
}
// 2. Shallow, fast squats are counted and flagged.
{
  const shallow = () => repTrace('knee', 172, 105, 0.4, 0.6, (k) => ({ thigh: 85 - 50 * k }));
  const { ev } = run('squat', chain(hold(base, 1), shallow(), shallow(), shallow(), hold(base, 11)));
  const set = of(ev, 'setEnd')[0].set;
  assert.equal(set.reps, 3);
  assert.equal(set.fixes.depth.n, 3);
  assert.ok(set.fixes.control, 'fast descent flagged');
}
// 3. Sitting down on a bench for a minute is not a rep.
{
  const sit = { ...base, knee: 90, thigh: 5 };
  const { ev } = run('squat', chain(hold(base, 2), hold(sit, 60), hold(base, 15)));
  assert.equal(of(ev, 'rep').length, 0);
}
// 4. Two sets with a rest between: rest is measured from last rep to first movement.
{
  const squat = () => repTrace('knee', 172, 70, 1.2, 1.0, (k) => ({ thigh: 85 - 85 * k }));
  const { ev } = run('squat', chain(hold(base, 1), squat(), squat(), hold(base, 90), squat(), squat(), squat(), hold(base, 12)));
  const starts = of(ev, 'setStart'), ends = of(ev, 'setEnd');
  assert.equal(ends.length, 2); assert.deepEqual(ends.map((e) => e.set.reps), [2, 3]);
  const rest = starts[1].t - ends[0].t;
  assert.ok(Math.abs(rest - 90) < 1, `rest ${rest}`);
}
// 5. Overhead press: arms swinging at the sides do not count; presses overhead do; soft lockout is flagged.
{
  const rack = { ...base, elbow: 60, wristsUp: 1, wristDrop: 0.05 };
  const swing = () => repTrace('elbow', 60, 170, 0.6, 0.6, () => ({ wristsUp: 0, wristDrop: 0.05 }));
  const press = (top) => repTrace('elbow', 60, top, 0.9, 1.1, (k) => ({ wristsUp: 1, wristDrop: 0.05 - 0.5 * k }));
  let r = run('ohp', chain(hold(rack, 1), swing(), swing(), hold(rack, 10)));
  assert.equal(of(r.ev, 'rep').length, 0);
  r = run('ohp', chain(hold(rack, 1), press(172), press(172), press(153), hold(rack, 10)));
  const set = of(r.ev, 'setEnd')[0].set;
  assert.equal(set.reps, 3); assert.equal(set.fixes.lockout.n, 1);
  assert.ok(Math.abs(set.con - 0.9) < 0.25, 'pressing up is the lifting phase');
}
// 6. Curl with body swing is flagged; grinding last rep shows up as slowdown.
{
  const curl = (up, swing) => repTrace('elbow', 165, 45, up, 1.0, (k) => ({ lean: 5 + swing * k }));
  const { ev } = run('curl', chain(hold(base, 1), curl(0.8, 0), curl(0.8, 0), curl(0.9, 20), curl(1.6, 20), hold(base, 10)));
  const set = of(ev, 'setEnd')[0].set;
  assert.equal(set.reps, 4); assert.equal(set.fixes.swing.n, 2);
  assert.ok(set.slow > 0.6 && set.slow < 1.4, `slow ${set.slow}`);
}
// 7. Walking out of frame ends the set; losing a needed joint pauses counting.
{
  const squat = () => repTrace('knee', 172, 70, 1.2, 1.0, (k) => ({ thigh: 85 - 85 * k }));
  const { ev } = run('squat', chain(hold(base, 1), squat(), squat(), hold(null, 5)));
  assert.equal(of(ev, 'setEnd')[0].set.reps, 2);
  const noAnkles = { ...base, seen: { ...SEEN, an: 0.1 } };
  assert.equal(of(run('squat', chain(hold(noAnkles, 1), [...squat()].map((m) => ({ ...m, seen: noAnkles.seen })))).ev, 'rep').length, 0);
}
// 8. Manual sets and forced end.
{
  const tr = new Tracker('manual');
  assert.equal(tr.startManual(10).type, 'setStart');
  const e = tr.endNow(55); assert.equal(e.set.reps, 0); assert.equal(e.set.dur, 45); assert.equal(e.set.tracked, false);
  assert.equal(tr.endNow(60), null);
}
// 9. Geometry: a standing stick figure reads as straight; a parallel squat reads thigh ~0 and knee ~90.
{
  const P = (x, y, z = 0) => ({ x, y, z, visibility: 1 });
  const fig = (hipY, kneeX) => { const w = []; for (let i = 0; i < 33; i++) w.push(P(0, 0));
    for (const [s, dz] of [[0, -0.15], [1, 0.15]]) {       // left, right
      w[11 + s] = P(0, hipY - 0.5, dz); w[13 + s] = P(0, hipY - 0.2, dz); w[15 + s] = P(0, hipY + 0.05, dz);
      w[23 + s] = P(0, hipY, dz); w[25 + s] = P(kneeX, hipY === 0 ? 0.45 : hipY, dz); w[27 + s] = P(kneeX, 0.9, dz);
    } return w; };
  const img = (w) => w.map((p) => ({ x: 0.5 + p.x * 0.4, y: 0.1 + p.y * 0.4, visibility: 1 }));
  let w = fig(0, 0), m = measure(w, img(w), 16 / 9);
  assert.ok(m.knee > 175 && m.hip > 175 && m.lean < 2 && m.thigh > 85, JSON.stringify(m));
  assert.equal(m.view, 'side');
  assert.equal(m.raise, 0, 'arms down is not a signal');
  w[0] = P(0, -0.7); w[15] = P(0, -0.9, -0.15); m = measure(w, img(w), 16 / 9);
  assert.equal(m.raise, 1, 'one hand above the head, the other down, is the signal');
  w[16] = P(0, -0.9, 0.15); m = measure(w, img(w), 16 / 9);
  assert.equal(m.raise, 0, 'both hands overhead (a press or pull-up) is not');
  w = fig(0.45, 0.45); m = measure(w, img(w), 16 / 9);
  assert.ok(Math.abs(m.thigh) < 2 && Math.abs(m.knee - 90) < 2, `thigh ${m.thigh} knee ${m.knee}`);
}
// 10. Rule coach.
{
  const mk = (reps, slow, fixes = {}) => ({ reps, slow, fixes });
  assert.match(ruleCoach(mk(8, 0.2), { lo: 6, hi: 8 }, 185, 5).say, /Go up to 190/);
  const low = ruleCoach(mk(3, 0.7), { lo: 6, hi: 8 }, 185, 5);
  assert.equal(low.nextWeight, 165); assert.match(low.say, /close to your limit/);
  assert.match(ruleCoach(mk(7, 0.05, { depth: { text: 'Just above parallel', n: 4 } }), { lo: 6, hi: 8 }, 185, 5).say, /just above parallel\. I saw it on 4 of 7/);
}
// 12. One stray movement is not a set: it is held back, then dropped.
{
  const squat = () => repTrace('knee', 172, 70, 1.2, 1.0, (k) => ({ thigh: 85 - 85 * k }));
  const { ev } = run('squat', chain(hold(base, 2), squat(), hold(base, 15)));
  assert.deepEqual(ev.map((e) => e.type), ['maybe', 'cancel']);
}
// 13. Bench: arm movements while standing at the rack are ignored; presses while lying down count; sitting up ends the set.
{
  const sx = { wristsUp: 0, lean: 5 }, lx = { lean: 85, wristsUp: 1, wristDrop: -0.5 }, standing = { ...base, ...sx }, lying = { ...base, ...lx };
  const fiddle = () => repTrace('elbow', 170, 70, 0.7, 0.7, () => sx);
  const press = () => repTrace('elbow', 170, 80, 1.3, 1.0, () => lx);
  const { ev, tr } = run('bench', chain(hold(standing, 2), fiddle(), fiddle(), fiddle(), hold(standing, 12)));
  assert.equal(ev.length, 0, 'nothing counted before lying down');
  assert.equal(tr.ready, false);
  const r = run('bench', chain(hold(standing, 2), fiddle(), fiddle(), hold(lying, 2), press(), press(), press(), press(), hold(lying, 1), hold(standing, 6)));
  const end = of(r.ev, 'setEnd'), reps = of(r.ev, 'rep');
  assert.equal(end.length, 1); assert.equal(end[0].set.reps, 4);
  assert.deepEqual(Object.keys(end[0].set.fixes), [], 'no lockout call on bench');
  assert.equal(reps[0].late, true, 'the first rep is confirmed by the second');
  const idx = r.ev.indexOf(end[0]), lastRepT = reps[3].rep.t;
  assert.ok(of(r.ev.slice(idx), 'rep').length === 0);
  // the set ended because the lifter sat up, well before the 8 s quiet gap
  const tr2 = new Tracker('bench'); let t = 0, endedAt = null;
  for (const m of chain(hold(lying, 2), press(), press(), hold(lying, 1), hold(standing, 7))) { t += 1 / FPS; if (tr2.update(t, m).some((e) => e.type === 'setEnd') && endedAt == null) endedAt = t; }
  assert.ok(endedAt != null && endedAt < 2 + 2 * 2.3 + 1 + 3.5, `ended at ${endedAt}`);
}
// 14. Rows: bending the arms while standing upright is ignored; rows from a hinge count. Ready shows only in position.
{
  const upright = { ...base, lean: 5 }, hinged = { ...base, lean: 50 };
  const load = () => repTrace('elbow', 170, 80, 0.8, 0.8, () => ({ lean: 5 }));
  const row = () => repTrace('elbow', 170, 70, 0.8, 1.0, (k) => ({ lean: 50, wristDrop: 0.55 - 0.3 * k }));
  assert.equal(run('row', chain(hold(upright, 2), load(), load(), load(), hold(upright, 10))).ev.length, 0);
  const tr = new Tracker('row'); let t = 0;
  for (const m of hold(upright, 2)) tr.update(t += 1 / FPS, m);
  assert.equal(tr.ready, false, 'not ready standing upright');
  for (const m of hold(hinged, 1)) tr.update(t += 1 / FPS, m);
  assert.equal(tr.ready, true, 'ready once hinged and still');
  const { ev } = run('row', chain(hold(upright, 2), load(), hold(hinged, 1.5), row(), row(), row(), row(), row(), hold(hinged, 10)));
  assert.equal(of(ev, 'setEnd')[0].set.reps, 5);
}
// 15. Recordings: frames survive packing, and a recorded session replays to the same sets it produced live.
{
  const m = { ...base, knee: 123.46, wristDrop: 0.547, kneeRatio: null, raise: 0, kneeMin: 120, hipMin: 170, elbowMin: 160, view: 'angled', seen: { ...SEEN, an: 0.44 } };
  const back = unpackFrame(packFrame(12.5, m));
  assert.equal(back.t, 12.5); assert.equal(back.m.knee, 123.5); assert.equal(back.m.wristDrop, 0.55); assert.equal(back.m.kneeRatio, null);
  assert.equal(back.m.view, 'angled'); assert.equal(back.m.seen.an, 0.4); assert.equal(unpackFrame(packFrame(3, null)).m, null);
  const full = (x) => ({ ...base, raise: 0, kneeMin: x.knee ?? base.knee, hipMin: base.hip, elbowMin: x.elbow ?? base.elbow, ...x });
  const squat = () => [...repTrace('knee', 172, 70, 1.2, 1.0, (k) => ({ thigh: 85 - 85 * k }))].map(full);
  const row = () => [...repTrace('elbow', 170, 70, 0.8, 1.0, (k) => ({ lean: 50, wristDrop: 0.55 - 0.3 * k }))].map(full);
  const idle = (x, secs) => [...hold(full(x), secs)];
  const part1 = [...idle({}, 2), ...squat(), ...squat(), ...squat(), ...idle({}, 12)];
  const part2 = [...idle({ lean: 5 }, 2), ...row().map((f) => ({ ...f, lean: 5 })), ...idle({ lean: 50 }, 1.5), ...row(), ...row(), ...row(), ...row(), ...idle({ lean: 50 }, 10)];
  const rec = { started: 'x', day: 'Test', build: 't', video: [1280, 720], profile: {}, photos: [], notes: '', frames: [], events: [{ t: 0, type: 'lift', id: 'squat' }] };
  let t = 0;
  for (const f of part1) rec.frames.push(packFrame(+(t += 1 / FPS).toFixed(2), f));
  rec.events.push({ t: +t.toFixed(2) + 0.01, type: 'lift', id: 'row' }, { t: +t.toFixed(2) + 3, type: 'flag', reason: 'Counted before I was ready', phase: 'ready', reps: 0 });
  for (const f of part2) rec.frames.push(packFrame(+(t += 1 / FPS).toFixed(2), f));
  rec.ended = +t.toFixed(2);
  const segs = replay(JSON.parse(JSON.stringify(rec)), globalThis.GymEngine);
  assert.deepEqual(segs.map((x) => [x.id, x.replayed.sets]), [['squat', [3]], ['row', [4]]], 'replay reproduces the sets, and ignores the arm bends before the hinge');
  assert.equal(segs[1].flags.length, 1); assert.equal(segs[1].signal.name, 'elbow'); assert.ok(segs[1].ready > 0 && segs[1].notReady > 0);
}
// 11. Equipment: lifts are offered only when the equipment allows, and built splits respect that.
{
  const all = Object.keys(EQUIP);
  for (const pat of Object.keys(PATTERNS)) assert.ok(options(pat, all).length, 'full gym covers ' + pat);
  assert.equal(available('squat', ['barbell']), false);
  assert.deepEqual(lacking('squat', ['barbell']), ['Squat rack or stands']);
  assert.equal(available('dbbench', ['dumbbells', 'incline']), true, 'an incline bench also works flat');
  assert.equal(available('pushup', []), true);
  for (const days of [3, 4, 5]) for (const goal of ['muscle', 'strength', 'fatloss', 'general']) for (const eq of [all, [], ['dumbbells', 'bench'], ['bands'], ['pullupbar'], ['kettlebell']]) {
    const { plan, gaps } = buildSplit(days, goal, eq);
    assert.equal(plan.length, days);
    for (const d of plan) {
      assert.ok(d.exercises.length >= 2, `${days}d ${goal} [${eq}] ${d.name} has ${d.exercises.length} lifts`);
      assert.equal(new Set(d.exercises.map((e) => e.id)).size, d.exercises.length, 'no lift twice in a day');
      for (const e of d.exercises) { assert.ok(available(e.id, eq), e.id + ' needs missing equipment'); assert.ok(e.sets >= 2 && e.lo < e.hi && e.rest > 0); }
    }
    if (eq === all) assert.deepEqual(gaps, []);
  }
  const bw = buildSplit(4, 'muscle', []);
  assert.deepEqual(bw.gaps.sort(), ['Biceps', 'Lats', 'Side delts'].sort());
  assert.ok(bw.plan.flatMap((d) => d.exercises).filter((e) => !EX[e.id].manual).every((e) => e.hi >= 20), 'bodyweight lifts get a higher rep ceiling');
  const home = buildSplit(4, 'muscle', ['barbell', 'rack', 'bench', 'dumbbells', 'pullupbar']);
  assert.deepEqual(home.plan[0].exercises.map((e) => e.id).slice(0, 4), ['bench', 'row', 'ohp', 'pullup']);
  const weekly = {};
  for (const d of home.plan) for (const e of d.exercises) weekly[EX[e.id].pattern] = (weekly[EX[e.id].pattern] || 0) + e.sets;
  console.log('weekly direct sets, 4-day muscle split, typical home gym:', JSON.stringify(weekly));
}
for (const [id, d] of Object.entries(EX)) if (!d.manual) assert.ok(d.hi > d.lo && d.joints.length && d.maxRep, id);
console.log('engine: all checks passed');
