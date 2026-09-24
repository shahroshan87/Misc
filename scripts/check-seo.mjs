// Build gate: basic SEO lint over dist/. Fails the build on errors.
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { parse } from 'node-html-parser';

const DIST = 'dist';
const files = [];
(function walk(d) {
  for (const f of readdirSync(d)) {
    const p = join(d, f);
    if (statSync(p).isDirectory()) walk(p);
    else if (p.endsWith('.html')) files.push(p);
  }
})(DIST);

const errors = [];
const titles = new Map();
const BANNED = /\b(lorem|TODO)\b|\{\{|\bundefined\b|\bNaN\b/;
for (const file of files) {
  const root = parse(readFileSync(file, 'utf8'));
  const title = root.querySelector('title')?.text.trim() ?? '';
  const desc = root.querySelector('meta[name="description"]')?.getAttribute('content') ?? '';
  const h1s = root.querySelectorAll('h1').length;
  const canon = root.querySelectorAll('link[rel="canonical"]');
  if (!title || title.length > 70) errors.push(`${file}: title missing or >70 chars (${title.length})`);
  if (desc.length < 70 || desc.length > 170) errors.push(`${file}: meta description length ${desc.length}`);
  if (h1s !== 1 && !file.endsWith('404.html')) errors.push(`${file}: expected 1 h1, found ${h1s}`);
  if (canon.length !== 1) errors.push(`${file}: expected 1 canonical, found ${canon.length}`);
  for (const img of root.querySelectorAll('img')) if (!img.hasAttribute('alt')) errors.push(`${file}: img without alt`);
  if (BANNED.test(root.querySelector('main')?.text ?? '')) errors.push(`${file}: banned placeholder text`);
  if (titles.has(title)) errors.push(`${file}: duplicate title with ${titles.get(title)}`);
  titles.set(title, file);
}
if (errors.length) { console.error(`SEO gate failed:\n- ${errors.join('\n- ')}`); process.exit(1); }
console.log(`SEO gate passed (${files.length} pages).`);
