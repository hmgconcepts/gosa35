#!/usr/bin/env node
/* School Connect v5 — verifier for smart recipient picker in messages. */
const fs = require('fs');
const read = p => fs.existsSync(p) ? fs.readFileSync(p,'utf8') : '';
let pass = 0, fail = 0;
function ok(name, cond){ console.log((cond ? 'OK  - ' : 'FAIL- ') + name); cond ? pass++ : fail++; }

const page = read('messages.html');
const app = read('assets/js/app.js');

// Smart picker UI
ok('messages has search input', /id=["']msg-search["']/.test(page));
ok('messages has filterList handler', /filterList/.test(page));
ok('messages has selectByClass handler', /selectByClass/.test(page));
ok('messages has invertSelection handler', /invertSelection/.test(page));
ok('messages has quickFilter handler', /quickFilter/.test(page));
ok('messages has filter buttons (with-email, with-phone, no-account)', /with-email/.test(page) && /with-phone/.test(page) && /no-account/.test(page));
ok('search input has placeholder', /placeholder=["'][^"']*search|filter|🔍/i.test(page));
ok('smart picker applies text match', /toLowerCase\(\)\.includes/.test(page) || /match/.test(page));

// MSG namespace
ok('MSG namespace defined', /const MSG\s*=/.test(page) || /var MSG\s*=/.test(page));
ok('MSG.filterList defined', /filterList[\(\s:]/.test(page));
ok('MSG.applyFilter defined', /applyFilter/.test(page));

// Existing recipient functionality preserved
ok('multi-select still present', /multiple/.test(page) && /size=/.test(page));
ok('Select all still present', /Select all/.test(page));
ok('recipient_id delivery still present', /recipient_id/.test(page));

console.log(`\nV5 smart-picker verification: ${pass} passed, ${fail} failed.`);
process.exit(fail ? 1 : 0);
