#!/usr/bin/env node
/* v4 BELL FIX verifier — checks that the notifications bell will not flash
   open-then-closed anymore. */
const fs = require('fs');
const read = p => fs.existsSync(p) ? fs.readFileSync(p, 'utf8') : '';
let pass = 0, fail = 0;
function ok(name, cond){ console.log((cond ? 'OK  - ' : 'FAIL- ') + name); cond ? pass++ : fail++; }

const notif = read('assets/js/notifications.js');

/* 1. The bindBell() method must use mousedown (not just click) to avoid the
      same-tick race where the bell opens then the document click closes it. */
ok('bindBell uses mousedown on the bell', /bell\.addEventListener\(['"]mousedown['"]/.test(notif));

/* 2. A flag _dropdownJustOpened must be set to prevent the document mousedown
      from closing it immediately. */
ok('bindBell sets _dropdownJustOpened flag', /_dropdownJustOpened\s*=\s*true/.test(notif));
ok('bindBell clears _dropdownJustOpened after 200ms', /_dropdownJustOpened\s*=\s*false/.test(notif) && /setTimeout\([\s\S]{0,50}200/.test(notif));

/* 3. The document mousedown handler must return early if the flag is set. */
ok('document mousedown handler returns early if flag set',
  /document\.addEventListener\(['"]mousedown['"][\s\S]{0,400}if \(this\._dropdownJustOpened\) return;/.test(notif));

/* 4. The document mousedown handler must ignore clicks inside the bell or dropdown. */
ok('document mousedown handler ignores #notif-bell', /target\.closest\(['"]#notif-bell['"]\)/.test(notif));
ok('document mousedown handler ignores #notif-dropdown', /target\.closest\(['"]#notif-dropdown['"]\)/.test(notif));

/* 5. The dropdown mousedown/click events must stop propagation. */
ok('dropdown mousedown stops propagation', /dd\.addEventListener\(['"]mousedown['"][\s\S]{0,80}stopPropagation/.test(notif));
ok('dropdown click stops propagation', /dd\.addEventListener\(['"]click['"][\s\S]{0,80}stopPropagation/.test(notif));

/* 6. The CSS must position the bell as fixed so it doesn't get covered by the topbar. */
const css = read('assets/css/style.css');
ok('notif-bell is position:fixed', /\.notif-bell\s*\{[^}]*position:\s*fixed/.test(css));
ok('notif-bell is at top: 14px', /\.notif-bell\s*\{[^}]*top:\s*14px/.test(css));
ok('notif-bell is at right: 18px', /\.notif-bell\s*\{[^}]*right:\s*18px/.test(css));
ok('notif-dropdown is at top: 60px', /\.notif-dropdown\s*\{[^}]*top:\s*60px/.test(css));

console.log('\nV4 BELL FIX verification: ' + pass + ' passed, ' + fail + ' failed.');
process.exit(fail ? 1 : 0);
