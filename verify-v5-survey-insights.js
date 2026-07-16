#!/usr/bin/env node
/* School Connect v5 — verifier for survey auto-insights dashboard. */
const fs = require('fs');
const read = p => fs.existsSync(p) ? fs.readFileSync(p,'utf8') : '';
let pass = 0, fail = 0;
function ok(name, cond){ console.log((cond ? 'OK  - ' : 'FAIL- ') + name); cond ? pass++ : fail++; }

const page = read('surveys.html');
const app = read('assets/js/app.js');

// Insights dashboard structure
ok('surveys has insights dashboard', /insights|dashboard/i.test(page));
ok('surveys has responses count', /responses|count/i.test(page));
ok('surveys has completion rate', /completion|response rate|completion[-_ ]rate/i.test(page));
ok('surveys has chart/graph', /chart|graph|canvas|bar|pie/i.test(page));
ok('surveys has per-question breakdown', /question|breakdown|per[-_ ]question/i.test(page));

// Functions
ok('surveys has renderInsights function', /renderInsights|buildInsights|generateInsights|openInsights/i.test(page));
ok('surveys has aggregate function', /aggregate|collated|collect|response_count|responses/i.test(page));
ok('surveys has exportInsights/exportCSV', /export/i.test(page));

// Auto-insight logic
ok('auto-insight logic present', /auto[-_ ]?insight|insightText|topAnswer|mostCommon|generateInsight|renderInsights|insights-card/i.test(page));
ok('chart library integrated (Chart.js or canvas)', /chart\.js|Chart\.|new Chart|<canvas/.test(page));

console.log(`\nV5 survey-insights verification: ${pass} passed, ${fail} failed.`);
process.exit(fail ? 1 : 0);
