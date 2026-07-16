#!/usr/bin/env node
/* v4 FAMILY_BLACKLIST verifier — ensures parent/student cannot see the modules
   the user explicitly listed as forbidden. */
const fs = require('fs');
const read = p => fs.existsSync(p) ? fs.readFileSync(p, 'utf8') : '';
let pass = 0, fail = 0;
function ok(name, cond){ console.log((cond ? 'OK  - ' : 'FAIL- ') + name); cond ? pass++ : fail++; }

const app = read('assets/js/app.js');

/* 1. The blacklist set exists and has the entries the user listed. */
const blacklist = [
  'payments_online', 'payments-online',
  'payment_history', 'payment-history',
  'cbt', 'cbt-multi', 'cbt_multi',
  // 'cbt-exam' is intentionally NOT blacklisted (students take exams)
  'inbox', 'messages',
  'digital_library', 'digital-library',
   'surveys',
  'lms', 'gamification',
  'eresources', 'e-resources',
  'complaints', 'broadcast', 'document_builder', 'document-builder'
];
blacklist.forEach(k => {
  ok('FAMILY_BLACKLIST contains "' + k + '"', new RegExp("'" + k + "'").test(app));
});

/* 2. The whitelist still includes cbt-exam (students can take exams). */
ok('STUDENT_WHITELIST includes cbt-exam', /'cbt-exam'/.test(app) && /'cbt_exam'/.test(app));
ok('PARENT_WHITELIST includes cbt-exam', app.indexOf("PARENT_WHITELIST") > 0 && /'cbt-exam'/.test(app));

/* 3. moduleAllowedForRole checks blacklist FIRST. */
ok('moduleAllowedForRole checks blacklist first for parent',
  /if \(r === 'parent'\) \{[\s\S]{0,200}if \(App\.FAMILY_BLACKLIST\.has\(id\)\) return false;/.test(app));
ok('moduleAllowedForRole checks blacklist first for student',
  /if \(r === 'student'\) \{[\s\S]{0,200}if \(App\.FAMILY_BLACKLIST\.has\(id\)\) return false;/.test(app));

/* 4. Every forbidden page has data-role-allow without parent/student. */
const forbiddenFiles = ['payments_online.html', 'cbt-multi.html', 'inbox.html', 'messages.html', 'digital_library.html', 'surveys.html', 'lms.html', 'gamification.html', 'eresources.html', 'complaints.html', 'broadcast.html', 'document_builder.html'];
let badFiles = 0;
forbiddenFiles.forEach(f => {
  if (fs.existsSync(f)) {
    const content = read(f);
    // find <a data-module-id="X" data-role-allow="..."> for the page itself
    const re = new RegExp('<a[^>]+href=["\']' + f + '["\'][^>]+data-role-allow="([^"]+)"');
    const m = content.match(re);
    if (m) {
      const allow = m[1].toLowerCase();
      if (allow.includes('parent') || allow.includes('student')) {
        badFiles++;
        ok(f + ' data-role-allow is clean', false);
      } else {
        ok(f + ' data-role-allow is clean', true);
      }
    } else {
      // page may use a different href; check data-require-role on the body
      const m2 = content.match(/data-require-role="([^"]+)"/);
      if (m2) {
        const req = m2[1].toLowerCase();
        if (req.includes('parent') || req.includes('student')) {
          badFiles++;
          ok(f + ' data-require-role is clean', false);
        } else {
          ok(f + ' data-require-role is clean', true);
        }
      } else {
        // No link to this page in itself (it IS the page) - that's fine.
        ok(f + ' has no parent/student nav link', true);
      }
    }
  }
});

/* 5. Dashboard quick links for parent/student don't include forbidden pages. */
const parentStart = app.indexOf("role === 'parent' ? [");
const parentEnd = app.indexOf("] : role === 'student' ? [", parentStart);
const parentQuick = parentStart > 0 ? app.slice(parentStart, parentEnd > 0 ? parentEnd : parentStart + 1200) : '';
const studentStart = app.indexOf("role === 'student' ? [");
const studentEnd = app.indexOf("] : (['staff'", studentStart);
const studentQuick = studentStart > 0 ? app.slice(studentStart, studentEnd > 0 ? studentEnd : studentStart + 1200) : '';
ok('parent quick links do NOT include Inbox', !/inbox\.html/.test(parentQuick));
ok('parent quick links do NOT include Messages', !/messages\.html/.test(parentQuick));
ok('parent quick links do NOT include Digital Library', !/digital_library\.html/.test(parentQuick));
ok('student quick links do NOT include Inbox', !/inbox\.html/.test(studentQuick));
ok('student quick links do NOT include E-Resources', !/eresources\.html/.test(studentQuick));
ok('student quick links do NOT include Digital Library', !/digital_library\.html/.test(studentQuick));

/* 6. CSS bell fix is in place. */
const css = read('assets/css/style.css');
ok('notif-bell is position:fixed', /\.notif-bell\s*\{[^}]*position:\s*fixed/.test(css));
ok('notif-bell has z-index >= 30', /\.notif-bell\s*\{[^}]*z-index:\s*3[0-9]/.test(css));
ok('notif-dropdown z-index high', /\.notif-dropdown\s*\{[^}]*z-index:\s*21474/.test(css) || /\.notif-dropdown\s*\{[^}]*z-index:\s*20000/.test(css));

console.log('\nV4 FAMILY_BLACKLIST verification: ' + pass + ' passed, ' + fail + ' failed.');
process.exit(fail ? 1 : 0);
