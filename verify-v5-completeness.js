#!/usr/bin/env node
/* School Connect v5 — verifier for feature completeness (v4+v5 features). */
const fs = require('fs');
const read = p => fs.existsSync(p) ? fs.readFileSync(p,'utf8') : '';
let pass = 0, fail = 0;
function ok(name, cond){ console.log((cond ? 'OK  - ' : 'FAIL- ') + name); cond ? pass++ : fail++; }

const html = fs.readdirSync('.').filter(f => f.endsWith('.html'));
const app = read('assets/js/app.js');
const crud = read('assets/js/crud.js');
const allContent = html.map(read).join('\n') + app + crud;

// Feature checks
const features = {
  'CBT (computer-based testing)': /cbt-exam|cbt\.html|cbt-multi|cbt-prompts/i.test(allContent),
  'Results & report cards': /results|results\.html|report-cards/i.test(allContent),
  'Messaging (WhatsApp/Email/SMS)': /whatsapp|email|sms|messages\.html/i.test(allContent),
  'Online payments': /payments_online|payment|fees\.html/i.test(allContent),
  'Surveys & forms': /surveys|survey_responses/i.test(allContent),
  'Voting & elections': /voting\.html|\bVT\b/i.test(allContent),
  'Diary (homework tracker)': /diary\.html/i.test(allContent),
  'Analytics & dashboards': /analytics\.html|Chart\.|<canvas/i.test(allContent),
  'ID cards': /idcards\.html|id_card/i.test(allContent),
  'Notifications': /notifications\.js|notif/i.test(allContent),
  'In-app inbox': /inbox\.html/i.test(allContent),
  'E-resources / library': /e-resources|digital_library|library\.html/i.test(allContent),
  'Helpdesk / IT support': /helpdesk|it_helpdesk/i.test(allContent),
  'Counselling & wellbeing': /counselling|counseling|wellbeing/i.test(allContent),
  'Health / clinic': /health\.html|health\.clinic|health_records|clinic/i.test(allContent),
  'Exams registration': /exam.register|exam_registrations/i.test(allContent),
  'Birthdays': /birthday/i.test(allContent),
  'Calendar': /calendar|events/i.test(allContent),
  'Approvals workflow': /approvals|approval/i.test(allContent),
  'Activity log / audit': /activity_log|audit/i.test(allContent),
  'Admissions': /admissions/i.test(allContent),
  'Alumni': /alumni/i.test(allContent),
  'Timetable': /timetable/i.test(allContent),
  'Attendance': /attendance/i.test(allContent),
  'Behaviour tracking': /behaviour|behavior/i.test(allContent),
  'Payroll': /payroll/i.test(allContent),
  'HR / staff management': /hr\.|staff_management|staff\.html/i.test(allContent),
  'Inventory': /inventory/i.test(allContent),
  'Asset management': /asset/i.test(allContent),
  'Front desk / visitors': /front_desk|front-desk|visitors/i.test(allContent),
  'Leave management': /leave_management|leave\.html/i.test(allContent),
  'Lesson plans': /lesson_plans|lesson-plans/i.test(allContent),
  'CBT prompts (AI-style)': /cbt_prompts|cbt-prompts/i.test(allContent),
  'Substitutions': /substitutions/i.test(allContent),
  'Career counselling': /career/i.test(allContent),
  'Facility booking': /facility|booking/i.test(allContent),
  'Fleet tracking': /fleet/i.test(allContent),
  'Compliance': /compliance/i.test(allContent),
  'Donations': /donations/i.test(allContent),
  'Promotion': /promotion/i.test(allContent),
  'Cafeteria / menu': /cafeteria|menu/i.test(allContent),
  'Hostel': /hostel/i.test(allContent),
  'Broadcast': /broadcast/i.test(allContent),
  'Document builder': /document_builder|document-builder/i.test(allContent),
  'LMS / gamification': /lms|gamification/i.test(allContent),
  'Reports (analytics)': /reports\.html/i.test(allContent),
  'Settings': /settings/i.test(allContent),
  'Profile / change password': /profile|change-password/i.test(allContent),
  'Help / onboarding': /help|getting started|onboarding/i.test(allContent),
};

let present = 0;
for (const [name, has] of Object.entries(features)) {
  ok(`Feature: ${name}`, has);
  if (has) present++;
}
ok(`Total features present: ${present}/${Object.keys(features).length} (>=30)`, present >= 30);

console.log(`\nV5 completeness verification: ${pass} passed, ${fail} failed.`);
process.exit(fail ? 1 : 0);
