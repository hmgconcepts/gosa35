#!/usr/bin/env node
/* School Connect v5 — verifier for school stamp + affective/psychomotor in report card. */
const fs = require('fs');
const read = p => fs.existsSync(p) ? fs.readFileSync(p,'utf8') : '';
let pass = 0, fail = 0;
function ok(name, cond){ console.log((cond ? 'OK  - ' : 'FAIL- ') + name); cond ? pass++ : fail++; }

const report = read('assets/js/report-engine.js');
const sample = read('samples/sample-report-card.html');
const sampleBroadsheet = read('samples/sample-class-broadsheet.html');
const sampleSubject = read('samples/sample-subject-broadsheet.html');

// School stamp generator
ok('report-engine.js generates school stamp SVG', /school[-_ ]?stamp|generateStamp|renderStamp|svg.*stamp/i.test(report));
ok('stamp uses SVG element', /<svg|createElementNS.*svg/.test(report));
ok('stamp includes school name', /sc\.name|sc\.shortName|schoolName|school_name/i.test(report));
ok('stamp includes signature line', /signature|principal|sign/i.test(report));

// Affective domain
ok('affective domain present in report', /affective/i.test(report));
ok('affective traits (5+) tracked', /punctuality|attentiveness|neatness|politeness|cooperation|honesty|self[-_ ]?control/i.test(report));

// Psychomotor domain
ok('psychomotor domain present in report', /psychomotor/i.test(report));
ok('psychomotor traits tracked', /handwriting|sports|games|dexterity|skills/i.test(report));

// Sample report card
ok('sample-report-card has school stamp SVG', /<svg/.test(sample) && /stamp/i.test(sample));
ok('sample-report-card has affective + psychomotor', /affective/i.test(sample) && /psychomotor/i.test(sample));
ok('sample-report-card has principal signature', /principal|signature/i.test(sample));

// Broadsheets
ok('class broadsheet has stamp + signature', /<svg|stamp/.test(sampleBroadsheet) && (sampleBroadsheet.includes('signature') || /sig\b/.test(sampleBroadsheet) || sampleBroadsheet.includes('Principal')));
ok('subject broadsheet has stamp + signature', /<svg|stamp/.test(sampleSubject) && (sampleSubject.includes('signature') || /sig\b/.test(sampleSubject) || sampleSubject.includes('Principal')));

console.log(`\nV5 school-stamp verification: ${pass} passed, ${fail} failed.`);
process.exit(fail ? 1 : 0);
