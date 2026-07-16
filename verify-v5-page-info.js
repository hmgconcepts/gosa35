#!/usr/bin/env node
/* School Connect v5 — verifier for 111 enhanced chatbot PAGE_INFO entries. */
const fs = require('fs');
const read = p => fs.existsSync(p) ? fs.readFileSync(p,'utf8') : '';
let pass = 0, fail = 0;
function ok(name, cond){ console.log((cond ? 'OK  - ' : 'FAIL- ') + name); cond ? pass++ : fail++; }

const super_js = read('assets/js/super.js');
const html = fs.readdirSync('.').filter(f => f.endsWith('.html'));

// Count PAGE_INFO entries
const pageInfoMatches = super_js.match(/PAGE_INFO\s*[:=]|["']\w+["']\s*:\s*\{[\s\S]*?description/i) || [];
const pageInfoBlock = super_js.match(/PAGE_INFO[\s\S]{0,80000}/)?.[0] || '';
const entryCount = (pageInfoBlock.match(/["']([a-z_-]+)["']\s*:\s*\{/g) || []).length;

ok(`PAGE_INFO has ${entryCount} entries (>=80)`, entryCount >= 80);
ok(`PAGE_INFO has ${entryCount} entries (>=100)`, entryCount >= 100);
ok('PAGE_INFO has description field', /description/.test(pageInfoBlock));
ok('PAGE_INFO has detailed fields', /purpose\s*:/.test(pageInfoBlock) && /does\s*:/.test(pageInfoBlock) && /who\s*:/.test(pageInfoBlock));
ok('PAGE_INFO has benefits field', /benefit\s*:|advantages\s*:/i.test(pageInfoBlock));

// Check that all major pages have chatbot descriptions
const majorPages = ['dashboard', 'students', 'staff', 'finance', 'reports', 'results', 'attendance', 'timetable', 'messages', 'surveys', 'voting', 'diary', 'analytics'];
let covered = 0;
for (const p of majorPages) {
  if (pageInfoBlock.includes(p) || pageInfoBlock.includes(p.replace('_', '-'))) covered++;
}
ok(`Major pages have chatbot descriptions: ${covered}/${majorPages.length} (>=10)`, covered >= 10);

console.log(`\nV5 page-info verification: ${pass} passed, ${fail} failed.`);
process.exit(fail ? 1 : 0);
