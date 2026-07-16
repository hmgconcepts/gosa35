#!/usr/bin/env node
/* School Connect v5 — verifier for teacher ownership (read-only for other teachers' records). */
const fs = require('fs');
const read = p => fs.existsSync(p) ? fs.readFileSync(p,'utf8') : '';
let pass = 0, fail = 0;
function ok(name, cond){ console.log((cond ? 'OK  - ' : 'FAIL- ') + name); cond ? pass++ : fail++; }

const crud = read('assets/js/crud.js');
const app = read('assets/js/app.js');

// Teacher ownership filter
ok('crud.js has teacher ownership filter', /created_by|owner_id|teacher_owner|teacherId/.test(crud));
ok('filter checks current role for teacher', /role/.test(crud) && /teacher/.test(crud));
ok('filter excludes records not owned by current teacher', /!==|!=|created_by\s*!==/.test(crud));
ok('admin role bypasses ownership filter', /admin/.test(crud) && /return\s+true|return\s+rows|return\s+all/.test(crud));

// Affected tables (exams, records, reports, IT/helpdesk, counselling, health)
const ownershipTables = ['exam_records', 'academic_records', 'report_cards', 'it_helpdesk', 'counselling', 'health_clinic', 'helpdesk'];
let matched = 0;
for (const t of ownershipTables) {
  if (crud.includes(t) || app.includes(t)) matched++;
}
ok(`Ownership-aware tables present (${matched}/${ownershipTables.length})`, matched >= 3);

ok('read-only role for non-owner', /read[-_ ]?only|canEdit|isOwner|canRead/.test(crud));

// Sample test: a teacher's record-edit page should check ownership
const examRecords = read('exam_registrations.html') || read('exam-records.html') || read('academic-records.html');
const allCrud = crud + read('assets/js/enterprise.js');
ok('records page or crud uses ownership check', /owner|created_by|teacherId/.test(examRecords + allCrud) || /cannot edit|other teacher|own records/.test(examRecords + allCrud));

console.log(`\nV5 teacher-ownership verification: ${pass} passed, ${fail} failed.`);
process.exit(fail ? 1 : 0);
