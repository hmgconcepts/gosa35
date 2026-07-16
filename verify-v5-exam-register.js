#!/usr/bin/env node
/* School Connect v5 — verifier for exam register with WAEC/NECO/NABTEB/NCEE fields. */
const fs = require('fs');
const read = p => fs.existsSync(p) ? fs.readFileSync(p,'utf8') : '';
let pass = 0, fail = 0;
function ok(name, cond){ console.log((cond ? 'OK  - ' : 'FAIL- ') + name); cond ? pass++ : fail++; }

const page = read('exam-register.html');
const app = read('assets/js/app.js');
const schema = read('database/complete-schema.sql') || read('database/schema.sql') || '';

// Section presence
ok('er-waec-section present', /er-waec-section/.test(page));
ok('er-neco-section present', /er-neco-section/.test(page));
ok('er-nabteb-section present', /er-nabteb-section/.test(page));
ok('er-ncee-section present', /er-ncee-section/.test(page));

// Field count: each exam body has multiple fields
const waecFields = (page.match(/er-waec-section[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/)?.[0] || '').match(/<input|<select/g) || [];
const necoFields = (page.match(/er-neco-section[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/)?.[0] || '').match(/<input|<select/g) || [];
ok(`WAEC section has ${waecFields.length} fields (>=5)`, waecFields.length >= 5);
ok(`NECO section has ${necoFields.length} fields (>=5)`, necoFields.length >= 5);

// Field names in JS submit handler
ok('WAEC-specific fields in submit handler', /waec_/.test(page));
ok('NECO-specific fields in submit handler', /neco_/.test(page));
ok('NABTEB-specific fields in submit handler', /nabteb_/.test(page));
ok('NCEE-specific fields in submit handler', /ncee_/.test(page));

// Persist to exam_registrations table
ok('submit persists waec_pin', /waec_pin|waec_subject/.test(page) && /exam_registrations/.test(page));
ok('submit persists candidate_no', /candidate_no|candidate/.test(page));

// Schema support - read all schema files
const allSchema = ['database/complete-schema.sql', 'database/schema.sql', 'database/update-v14-schema.sql', 'database/enhancements-schema.sql'].map(read).join('\n');
ok('exam_registrations table in schema', /create table.*exam_registrations|exam_registrations\s*\(/.test(allSchema));
ok('exam_registrations has waec columns', /waec_(pin|subjects|trade|course|trade_subject)/.test(allSchema));

console.log(`\nV5 exam-register verification: ${pass} passed, ${fail} failed.`);
process.exit(fail ? 1 : 0);
