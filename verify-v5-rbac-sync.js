#!/usr/bin/env node
/* School Connect v5 — verifier for RBAC sync between 2gosaportal/ and schoolconnect/. */
const fs = require('fs');
const path = require('path');
const read = p => fs.existsSync(p) ? fs.readFileSync(p,'utf8') : '';
let pass = 0, fail = 0;
function ok(name, cond){ console.log((cond ? 'OK  - ' : 'FAIL- ') + name); cond ? pass++ : fail++; }

const genApp = read('../schoolconnect/assets/js/app.js');
const genCrud = read('../schoolconnect/assets/js/crud.js');
const siteApp = read('assets/js/app.js');
const siteCrud = read('assets/js/crud.js');

// Generator has family blacklist
ok('generator app.js has FAMILY_BLACKLIST', /FAMILY_BLACKLIST/.test(genApp));
ok('generator app.js has STUDENT_WHITELIST', /STUDENT_WHITELIST/.test(genApp));
ok('generator app.js has PARENT_WHITELIST', /PARENT_WHITELIST/.test(genApp));
ok('generator app.js has nav-show-map / applyRoleNav', /applyRoleNav|navShowMap|nav-show-map/.test(genApp));

// Generator has bell fix
ok('generator notifications.js has _dropdownJustOpened', (() => {
  const p = '../schoolconnect/assets/js/notifications.js';
  return fs.existsSync(p) && /_dropdownJustOpened/.test(read(p));
})());

// Generator has teacher ownership
ok('generator crud.js has teacher ownership filter', /created_by|owner_id|teacherId/.test(genCrud));

// Generator has access manager columns
ok('generator app.js has access manager Nav/Read/Write', /Access Manager|access[-_ ]?manager/i.test(genApp));

// Generator has AI-copy update
ok('generator template uses one-time setup copy', (() => {
  const t = '../schoolconnect/assets/templates/pages/messages.html';
  return fs.existsSync(t) && /one[-_ ]time|setup fee|affordable/i.test(read(t));
})());

// Generator has school stamp
ok('generator has school stamp generator', (() => {
  const t = '../schoolconnect/assets/js/report-engine.js';
  return fs.existsSync(t) && /school[-_ ]?stamp|generateStamp/i.test(read(t));
})());

// Site matches generator
ok('site app.js has FAMILY_BLACKLIST', /FAMILY_BLACKLIST/.test(siteApp));
ok('site crud.js has teacher ownership', /created_by|owner_id|teacherId/.test(siteCrud));

console.log(`\nV5 rbac-sync verification: ${pass} passed, ${fail} failed.`);
process.exit(fail ? 1 : 0);
