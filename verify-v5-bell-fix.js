#!/usr/bin/env node
/* School Connect v5 — verifier for v4 bell-flash bug fix. */
const fs = require('fs');
const path = require('path');
const read = p => fs.existsSync(p) ? fs.readFileSync(p,'utf8') : '';
let pass = 0, fail = 0;
function ok(name, cond){ console.log((cond ? 'OK  - ' : 'FAIL- ') + name); cond ? pass++ : fail++; }

const app = read('assets/js/app.js');
const notif = read('assets/js/notifications.js');
const css = read('assets/css/site.css') || read('assets/css/style.css') || '';

// Bell position is fixed (not inside the layout that gets re-rendered)
ok('notifications.js uses _dropdownJustOpened flag', /_dropdownJustOpened/.test(notif));
ok('notifications.js mousedown handler present', /addEventListener\(['"]mousedown['"]/.test(notif) && /closest|target/.test(notif));
ok('CSS .notif-bell is position:fixed', /notif-bell/.test(css) && /position:\s*fixed/.test(css.match(/\.notif-bell[^{]*\{[^}]*\}/)?.[0] || ''));
ok('CSS .notif-bell has z-index', /\.notif-bell[^{]*\{[^}]*z-index/.test(css));
ok('bell dropdown uses _dropdownJustOpened check', /_dropdownJustOpened\s*[\)\|]/.test(notif) || /if\s*\(\s*this\._dropdownJustOpened\s*\)/.test(notif));
ok('notifications.js prevents immediate close', /preventDefault/.test(notif) || /stopPropagation/.test(notif));

console.log(`\nV5 bell-fix verification: ${pass} passed, ${fail} failed.`);
process.exit(fail ? 1 : 0);
