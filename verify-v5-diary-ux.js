#!/usr/bin/env node
/* School Connect v5 — verifier for clear diary UX. */
const fs = require('fs');
const read = p => fs.existsSync(p) ? fs.readFileSync(p,'utf8') : '';
let pass = 0, fail = 0;
function ok(name, cond){ console.log((cond ? 'OK  - ' : 'FAIL- ') + name); cond ? pass++ : fail++; }

const page = read('diary.html');
const app = read('assets/js/app.js');

// Clear structure
ok('diary has entry list', /entry|entries|list/i.test(page));
ok('diary has date picker', /date|type=.date|input.*date/.test(page));
ok('diary has status indicator (open/done)', /status|open|done|closed|pending/i.test(page));
ok('diary has priority indicator', /priority|urgent|high|low/i.test(page));
ok('diary has reminder section', /reminder|due|deadline|notification|alert/i.test(page));

// Functions
ok('diary has renderEntries function', /renderEntries|renderList|loadEntries/i.test(page));
ok('diary has createEntry function', /createEntry|addEntry|newEntry|save|openPost|postEntry/i.test(page));
ok('diary has completeEntry function', /complete|markDone|setStatus|seen|acknowledge/i.test(page));
ok('diary has filter function', /filter|search/i.test(page));

// Help/onboarding
ok('diary has help text', /help|guide|tip|how to/i.test(page));
ok('diary has help-onboarding for new users', /first time|getting started|how to use/i.test(page));

console.log(`\nV5 diary-ux verification: ${pass} passed, ${fail} failed.`);
process.exit(fail ? 1 : 0);
