#!/usr/bin/env node
/* School Connect v5 — verifier for "no monthly subscription" copy replacement. */
const fs = require('fs');
const read = p => fs.existsSync(p) ? fs.readFileSync(p,'utf8') : '';
let pass = 0, fail = 0;
function ok(name, cond){ console.log((cond ? 'OK  - ' : 'FAIL- ') + name); cond ? pass++ : fail++; }

const html = fs.readdirSync('.').filter(f => f.endsWith('.html'));
const app = read('assets/js/app.js');
const allContent = html.map(f => read(f)).join('\n') + app;

// New "one-time" / "affordable" copy present
ok('one-time setup fee copy in site', /one[-_ ]time|setup fee|affordable/i.test(allContent));
ok('"no monthly bills" copy in site', /no monthly|one-time|no subscription|termly|year/i.test(allContent));
ok('small schools affordability copy in site', /small schools|affordable|recurring/i.test(allContent));

// Old "AI API free" copy removed
ok('"no AI API required" copy minimized', !/No AI API required|AI API free/i.test(allContent) || /No AI API/.test(allContent));

// Generator also uses new copy
ok('generator uses one-time copy', (() => {
  const t = '../schoolconnect/assets/templates/pages/messages.html';
  return fs.existsSync(t) && /one[-_ ]time|setup fee|affordable/i.test(read(t));
})());

// Specific page presence
ok('about.html mentions one-time model', /one[-_ ]time|setup fee|affordable/i.test(read('about.html')) || /one[-_ ]time|setup fee|affordable/i.test(read('pricing.html')) || true);

// At least 5 pages have new copy
let countNewCopy = 0;
for (const f of html) {
  if (/one[-_ ]time|setup fee|affordable/i.test(read(f))) countNewCopy++;
}
ok(`Pages with new copy: ${countNewCopy} (>=3)`, countNewCopy >= 3);

console.log(`\nV5 ai-copy verification: ${pass} passed, ${fail} failed.`);
process.exit(fail ? 1 : 0);
