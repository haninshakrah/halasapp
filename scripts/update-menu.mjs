// Hämtar Malmö stads seniormeny och skriver menu.json. Kör: node scripts/update-menu.mjs
import { writeFile } from 'node:fs/promises';

const URL_ = 'https://malmo.se/Bo-och-leva/Stod-och-omsorg/Stod-till-aldre/Malmo-stads-restauranger-for-seniorer.html';
const OUT = process.argv[2] || 'menu.json';

const res = await fetch(URL_, { headers: { 'User-Agent': 'hala-menu-sync/1.0' } });
if (!res.ok) throw new Error('HTTP ' + res.status);
const html = await res.text();

const text = html
  .replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/gi, '')
  .replace(/<\/(p|li|h\d|div|tr|br)>|<br\s*\/?>/gi, '\n')
  .replace(/<[^>]+>/g, '')
  .replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&auml;/g, 'ä').replace(/&ouml;/g, 'ö').replace(/&aring;/g, 'å')
  .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(n));

const start = text.search(/(Måndag|Tisdag|Onsdag|Torsdag|Fredag|Lördag|Söndag) \d+\/\d+:/);
const end = text.indexOf('Restauranger', start);
if (start < 0) throw new Error('Hittade ingen meny i sidan, strukturen kan ha ändrats');

const lines = text.slice(start, end > start ? end : undefined)
  .split('\n').map(l => l.replace(/\s+/g, ' ').trim()).filter(Boolean)
  .filter(l => !/^Vecka \d+$/.test(l));

const out = []; let block = [], cur = null, alt = '', green = '', mode = null;
const closeBlock = () => { if (cur) block.push(cur); cur = null; block.forEach(d => { d.alt = alt.trim(); d.green = green.trim(); }); out.push(...block); block = []; alt = green = ''; };

let year = new Date().getFullYear(), lastMonth = 0;
for (const l of lines) {
  const m = l.match(/^(Måndag|Tisdag|Onsdag|Torsdag|Fredag|Lördag|Söndag) (\d+)\/(\d+): ?(.*)$/);
  if (m) {
    if (mode === 'green') closeBlock(); else if (cur) { block.push(cur); }
    const mo = +m[3]; if (mo < lastMonth) year++; lastMonth = mo;
    cur = { date: `${year}-${String(mo).padStart(2, '0')}-${m[2].padStart(2, '0')}`, lunch: m[4] };
    mode = 'day'; continue;
  }
  if (l.startsWith('Veckans alternativ:')) { if (cur) block.push(cur); cur = null; mode = 'alt'; alt = l.slice(19); continue; }
  if (l.startsWith('Veckans gröna:')) { mode = 'green'; green = l.slice(14); continue; }
  if (mode === 'day' && cur) cur.lunch += ' ' + l;
  else if (mode === 'alt') alt += ' ' + l;
  else if (mode === 'green') green += ' ' + l;
}
if (mode === 'green') closeBlock();
if (!out.length) throw new Error('Tom meny');

await writeFile(OUT, JSON.stringify({
  source: 'Malmö stad – Malmö stads restauranger för seniorer',
  pageUpdated: (text.match(/senast uppdaterad:?\s*(\d{4}-\d{2}-\d{2})/i) || [])[1] || new Date().toISOString().slice(0, 10),
  price: '99 kr, inkl. bröd, salladsbuffé, dryck, dessert och kaffe',
  hours: 'Lunch serveras kl. 11.30–14.00',
  days: out,
}, null, 1));
console.log(`Skrev ${out.length} dagar till ${OUT}`);
