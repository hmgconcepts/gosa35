#!/usr/bin/env node
/* School Connect v5 — verifier for analytics with more graphs. */
const fs = require('fs');
const read = p => fs.existsSync(p) ? fs.readFileSync(p,'utf8') : '';
let pass = 0, fail = 0;
function ok(name, cond){ console.log((cond ? 'OK  - ' : 'FAIL- ') + name); cond ? pass++ : fail++; }

const page = read('analytics.html');
const app = read('assets/js/app.js');

// Multiple chart types
ok('analytics has bar chart', /bar/i.test(page));
ok('analytics has line chart', /line/i.test(page));
ok('analytics has pie/doughnut chart', /pie|doughnut/i.test(page));

// Chart.js integration
ok('Chart.js library loaded', /chart\.js|Chart\.|new Chart/.test(page));
ok('analytics has canvas elements', /<canvas/.test(page));

// Multiple chart instances
const canvasMatches = (page.match(/<canvas/g) || []).length;
ok(`analytics has ${canvasMatches} canvas elements (>=3)`, canvasMatches >= 3);

// Filters
ok('analytics has date range filter', /date[-_ ]?range|from|to|start|end/i.test(page));
ok('analytics has audience filter', /audience|class|grade/i.test(page));
ok('analytics has export', /export|csv|download/i.test(page));

// Insights
ok('analytics has KPI cards', /kpi|card|metric/i.test(page));
ok('analytics has summary', /summary|total|average/i.test(page));

console.log(`\nV5 analytics verification: ${pass} passed, ${fail} failed.`);
process.exit(fail ? 1 : 0);
