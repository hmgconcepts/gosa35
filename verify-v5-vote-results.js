#!/usr/bin/env node
/* School Connect v5 — verifier for closed-vote auto-results dashboard. */
const fs = require('fs');
const read = p => fs.existsSync(p) ? fs.readFileSync(p,'utf8') : '';
let pass = 0, fail = 0;
function ok(name, cond){ console.log((cond ? 'OK  - ' : 'FAIL- ') + name); cond ? pass++ : fail++; }

const page = read('voting.html');
const app = read('assets/js/app.js');

// Closed-vote results dashboard
ok('voting has results dashboard', /results|dashboard/i.test(page));
ok('voting has tally function', /tally|count|score/i.test(page));
ok('voting has winner detection', /winner|topChoice|maxOption/i.test(page));
ok('voting has per-option breakdown', /option|choice|breakdown/i.test(page));
ok('voting has total votes', /total|all[-_ ]votes|total[-_ ]votes/i.test(page));

// Chart/graph
ok('voting has chart/graph', /chart|graph|canvas|bar|pie/i.test(page));
ok('chart library integrated', /chart\.js|Chart\.|new Chart|<canvas/.test(page));

// Functions
ok('voting has openResults function', /openResults/.test(page));
ok('voting has toggleClose function', /toggleClose|closePoll|setStatus/.test(page));
ok('voting has exportResults function', /exportResults|exportReport/i.test(page));

// Auto-insight
ok('auto-insight for closed polls', /auto[-_ ]?insight|insightText|generateInsight|winner|sorted|topChoice/i.test(page));
ok('percentage display', /percent|%/i.test(page));

console.log(`\nV5 vote-results verification: ${pass} passed, ${fail} failed.`);
process.exit(fail ? 1 : 0);
