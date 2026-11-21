// Replays a Spotter session recording through the current tracking engine and compares
// what the engine decides now with what happened in the session.
//
//   node gym-coach/test/replay.mjs <recording.json> [--photos <dir>] [--events]
//
// --photos writes the recording's still photos to a folder. --events prints the full event timeline.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import zlib from 'node:zlib';

export function loadEngine() {
  const html = fs.readFileSync(fileURLToPath(new URL('../index.html', import.meta.url)), 'utf8');
  new Function(html.match(/<script id="engine">([\s\S]*?)<\/script>/)[1])();
  return globalThis.GymEngine;
}

/* Split the recording at each lift selection and replay every stretch through a fresh tracker. */
export function replay(rec, E = loadEngine()) {
  const lifts = rec.events.filter((e) => e.type === 'lift');
  const end = rec.ended ?? (rec.frames.length ? rec.frames[rec.frames.length - 1][0] : 0);
  return lifts.map((l, i) => {
    const t0 = l.t, t1 = i + 1 < lifts.length ? lifts[i + 1].t : end + 0.01, def = E.EX[l.id];
    const inSeg = (e) => e.t >= t0 && e.t < t1;
    const frames = rec.frames.filter((f) => f[0] >= t0 && f[0] < t1);
    const seg = { id: l.id, name: def ? def.name : l.id, t0, t1, frames: frames.length, noPerson: 0, notReady: 0, ready: 0, views: {}, hidden: {},
      recorded: { sets: [], dropped: 0 }, replayed: { sets: [], dropped: 0, events: [], detail: [] }, flags: [], edits: [], signal: null };
    for (const e of rec.events.filter(inSeg)) {
      if (e.type === 'setEnd') seg.recorded.sets.push(e.reps);
      else if (e.type === 'cancel') seg.recorded.dropped++;
      else if (e.type === 'flag') seg.flags.push(e);
      else if (['redo', 'repEdit', 'endNow', 'gesture'].includes(e.type)) seg.edits.push(e);
    }
    if (!def || def.manual) return seg;
    const tr = new E.Tracker(l.id); let lo = Infinity, hi = -Infinity;
    for (const row of frames) {
      const { t, m } = E.unpackFrame(row, rec.fields);
      for (const e of tr.update(t, m)) {
        if (e.type === 'setEnd') { seg.replayed.sets.push(e.set.reps); seg.replayed.detail.push({ reps: e.set.reps, short: e.set.short, lastShort: e.set.lastShort, missed: e.set.missed, ends: e.set.perRep.map((r) => r.ext) }); } else if (e.type === 'cancel') seg.replayed.dropped++;
        seg.replayed.events.push({ t: +(e.type === 'setEnd' || e.type === 'setStart' ? e.t : t).toFixed(2), type: e.type, n: e.rep && e.rep.n });
      }
      if (!m) { seg.noPerson++; continue; }
      seg.views[m.view] = (seg.views[m.view] || 0) + 1;
      for (const k of def.joints) if (m.seen[k] < 0.5) seg.hidden[k] = (seg.hidden[k] || 0) + 1;
      const v = m[def.signal]; if (v != null) { lo = Math.min(lo, v); hi = Math.max(hi, v); }
      if (tr.ready) seg.ready++; else if (!tr.moving && !tr.active) seg.notReady++;
    }
    const last = tr.endNow(t1); if (last && last.type === 'setEnd') seg.replayed.sets.push(last.set.reps);
    seg.signal = isFinite(lo) ? { name: def.signal, min: Math.round(lo), max: Math.round(hi), restZone: def.rest === 'high' ? `> ${def.hi}` : `< ${def.lo}`, farZone: def.rest === 'high' ? `< ${def.lo}` : `> ${def.hi}` } : null;
    return seg;
  });
}

const clockOf = (t) => `${Math.floor(t / 60)}:${String(Math.floor(t % 60)).padStart(2, '0')}`;
const pct = (n, d) => (d ? Math.round(n / d * 100) + '%' : '-');

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const [file, ...flags] = process.argv.slice(2);
  if (!file) { console.error('usage: node replay.mjs <recording.json> [--photos <dir>] [--events]'); process.exit(1); }
  const rec = JSON.parse(file.endsWith('.gz') ? zlib.gunzipSync(fs.readFileSync(file)).toString('utf8') : fs.readFileSync(file, 'utf8')), E = loadEngine();
  console.log(`Recording ${rec.started} · ${rec.day} · build ${rec.build} · ${clockOf(rec.ended || 0)} long · ${rec.frames.length} frames · ${rec.photos.length} photos · video ${rec.video.join('x')}`);
  console.log(`Profile: ${JSON.stringify(rec.profile)}`);
  if (rec.notes) console.log(`Notes: ${rec.notes}`);
  for (const s of replay(rec, E)) {
    console.log(`\n${clockOf(s.t0)}-${clockOf(s.t1)}  ${s.name}`);
    if (!s.frames) { console.log('  no frames'); continue; }
    console.log(`  sets in the session: [${s.recorded.sets.join(', ')}]  dropped single reps: ${s.recorded.dropped}`);
    if (s.signal) {
      console.log(`  sets when replayed:  [${s.replayed.sets.join(', ')}]  dropped single reps: ${s.replayed.dropped}`);
      for (const d of s.replayed.detail) console.log(`    ${d.reps} reps · end of range per rep: ${d.ends.join(' ')}` + (d.short ? ` · ${d.short} short` : '') + (d.missed ? ` · ${d.missed} missed` : ''));
      console.log(`  ${s.signal.name} ranged ${s.signal.min}-${s.signal.max} (rest zone ${s.signal.restZone}, far zone ${s.signal.farZone})`);
      console.log(`  in position ${pct(s.ready, s.frames)} of frames · idle and out of position ${pct(s.notReady, s.frames)} · nobody in view ${pct(s.noPerson, s.frames)}`);
      console.log(`  view: ${Object.entries(s.views).map(([k, v]) => `${k} ${pct(v, s.frames)}`).join(', ') || '-'}` + (Object.keys(s.hidden).length ? ` · hidden joints: ${Object.entries(s.hidden).map(([k, v]) => `${k} ${pct(v, s.frames)}`).join(', ')}` : ''));
    }
    for (const f of s.flags) console.log(`  FLAG ${clockOf(f.t)} "${f.reason}"${f.note ? ' - ' + f.note : ''} (phase ${f.phase}, ${f.reps} reps counted)`);
    for (const e of s.edits) console.log(`  ${clockOf(e.t)} ${e.type} ${JSON.stringify({ ...e, t: undefined, type: undefined })}`);
  }
  if (flags.includes('--events')) {
    console.log('\nTimeline');
    for (const e of rec.events) console.log(`  ${clockOf(e.t)} ${String(e.t).padStart(8)} ${e.type} ${JSON.stringify({ ...e, t: undefined, type: undefined })}`);
  }
  const pi = flags.indexOf('--photos');
  if (pi >= 0 && flags[pi + 1]) {
    fs.mkdirSync(flags[pi + 1], { recursive: true });
    rec.photos.forEach((p, i) => fs.writeFileSync(path.join(flags[pi + 1], `${String(i).padStart(2, '0')}-${clockOf(p.t).replace(':', 'm')}s-${p.why.replace(/\W+/g, '-')}.jpg`), Buffer.from(p.jpeg, 'base64')));
    console.log(`\nWrote ${rec.photos.length} photos to ${flags[pi + 1]}`);
  }
}
