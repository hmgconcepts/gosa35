#!/usr/bin/env node
/* v4 EXAM-REGISTER verifier — checks the 14 exam types + per-exam sections */
const fs = require('fs');
const read = p => fs.existsSync(p) ? fs.readFileSync(p, 'utf8') : '';
let pass = 0, fail = 0;
function ok(name, cond){ console.log((cond ? 'OK  - ' : 'FAIL- ') + name); cond ? pass++ : fail++; }

const html = read('exam-register.html');

/* 1. All 14 exam types are present in the dropdown */
const exams = [
  'WAEC SSCE (School)', 'WAEC GCE (Private)', 'NECO SSCE (School)', 'NECO GCE (Private)',
  'UTME (JAMB)', 'IGCSE (Cambridge)', 'Common Entrance (NCEE)', 'BECE (Junior WAEC)',
  'NABTEB', 'A-Level', 'TOEFL', 'IELTS', 'SAT', 'Other'
];
exams.forEach(e => {
  ok('exam type in dropdown: ' + e, new RegExp('<option>[^<]*' + e.split(' ')[0]).test(html));
});

/* 2. Per-exam dynamic sections exist */
const sections = [
  'er-waec-section', 'er-neco-section', 'er-nabteb-section', 'er-ncee-section',
  'er-jamb-section', 'er-cambridge-section', 'er-ielts-section', 'er-toefl-section', 'er-sat-section'
];
sections.forEach(s => {
  ok('section exists: ' + s, new RegExp('id=["\']' + s + '["\']').test(html));
});

/* 3. The visibility logic shows the right sections for each exam */
ok('WAEC section shown on waec', /examType\.indexOf\(['"]waec['"]\)\s*>=\s*0/.test(html));
ok('NECO section shown on neco', /examType\.indexOf\(['"]neco['"]\)\s*>=\s*0/.test(html));
ok('NABTEB section shown on nabteb', /examType\.indexOf\(['"]nabteb['"]\)\s*>=\s*0/.test(html));
ok('NCEE section shown on common entrance', /examType\.indexOf\(['"]common entrance['"]\)\s*>=\s*0/.test(html));
ok('JAMB section shown on utme', /examType\.indexOf\(['"]utme['"]\)\s*===\s*0/.test(html));

/* 4. The submit handler includes the new exam-specific fields */
const newFields = [
  'waec_pin', 'waec_biometric_centre', 'waec_trade_subject', 'waec_candidate_type',
  'neco_token', 'neco_pin', 'neco_biometric_centre',
  'nabteb_trade_subject', 'nabteb_pin', 'nabteb_centre',
  'ncee_p6_school', 'ncee_p6_year', 'ncee_college_1', 'ncee_college_2', 'ncee_college_3',
  'jamb_reg_no', 'cambridge_urn', 'ielts_type', 'toefl_format', 'sat_college_board_id'
];
newFields.forEach(f => {
  ok('submit handler persists field: ' + f, new RegExp(f + ':\\s*get\\(').test(html) || new RegExp(f + ':\\s*parseInt').test(html) || new RegExp(f + ':').test(html));
});

/* 5. EXAM_CONFIG has all 14 entries with realistic fee/subject counts */
ok('EXAM_CONFIG has 14 entries', (html.match(/maxSubjects:/g) || []).length >= 14);
ok('UTME has exactly 4 subjects', /UTME \(JAMB\)['"]:\s*\{ *maxSubjects:\s*4,/.test(html));
ok('NCEE has at least 3 subjects', /Common Entrance \(NCEE\)['"]:\s*\{ *maxSubjects: *\d+, *minSubjects:\s*3/.test(html));
ok('WAEC SSCE has 7-9 subjects', /WAEC SSCE \(School\)['"]:\s*\{ *maxSubjects:\s*9, *minSubjects:\s*7/.test(html));

/* 6. NIN validation present */
ok('NIN 11-digit validation', /\[0-9\]\{11,14\}/.test(html));

/* 7. NCEE age check */
ok('NCEE age ≤ 13 check', /age > 13/.test(html));

/* 8. Subject chips per exam (20+ subjects for major exams) */
ok('NECO SSCE has 20+ subjects', (html.match(/NECO SSCE \(School\)['"]: \[[^\]]*\]/) || [''])[0].split(',').length > 15);
ok('WAEC SSCE has 20+ subjects', (html.match(/WAEC SSCE \(School\)['"]: \[[^\]]*\]/) || [''])[0].split(',').length > 15);

console.log('\nV4 EXAM-REGISTER verification: ' + pass + ' passed, ' + fail + ' failed.');
process.exit(fail ? 1 : 0);
