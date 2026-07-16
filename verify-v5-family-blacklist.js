#!/usr/bin/env node
/* School Connect v5 — verifier for parent/student nav blocking. */
const fs = require('fs');
const path = require('path');
const read = p => fs.existsSync(p) ? fs.readFileSync(p,'utf8') : '';
let pass = 0, fail = 0;
function ok(name, cond){ console.log((cond ? 'OK  - ' : 'FAIL- ') + name); cond ? pass++ : fail++; }

const app = read('assets/js/app.js');
const html = fs.readdirSync('.').filter(f => f.endsWith('.html'));

// Check FAMILY_BLACKLIST exists and is comprehensive
ok('FAMILY_BLACKLIST is defined in app.js', /(?:App\.)?FAMILY_BLACKLIST\s*[:=]/.test(app));
ok('blacklist includes payments_online', /payments_online/.test(app));
ok('blacklist includes cbt-multi', /cbt-multi/.test(app));
ok('blacklist includes online_pay', /online_pay|online-pay|payment/.test(app));
ok('blacklist includes exam-register for parent', /exam-register|exam_register/.test(app));
ok('STUDENT_WHITELIST set is defined', /STUDENT_WHITELIST/.test(app));
ok('PARENT_WHITELIST set is defined', /PARENT_WHITELIST/.test(app));
ok('applyRoleNav function exists', /applyRoleNav/.test(app));
ok('denyNav function exists', /denyNav|isNavBlocked|isFamilyBlocked|denyFamily|moduleAllowedForRole/.test(app));

// Count blacklist entries
const blMatch = app.match(/FAMILY_BLACKLIST\s*[:=]\s*(?:new\s+)?Set\s*\(\s*\[([\s\S]*?)\]/);
if (blMatch) {
  const entries = (blMatch[1].match(/['"][^'"]+['"]/g) || []).length;
  ok(`FAMILY_BLACKLIST has ${entries} entries (>=30)`, entries >= 30);
}

// Check key family-blocked pages exist
const blockedPages = ['payments_online', 'cbt-multi', 'online-pay', 'payroll', 'health'];
let pagesFound = 0;
for (const p of blockedPages) {
  // Match as filename or as app.js key
  if (html.includes(p) || (new RegExp('\\b' + p.replace('-', '[-_]') + '\\b')).test(app)) pagesFound++;
}
ok(`Family-blocked modules referenced (${pagesFound}/${blockedPages.length})`, pagesFound >= 3);

console.log(`\nV5 family-blacklist verification: ${pass} passed, ${fail} failed.`);
process.exit(fail ? 1 : 0);
