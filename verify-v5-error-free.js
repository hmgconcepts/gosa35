#!/usr/bin/env node
/* School Connect v5 — verifier for error-free, sophisticated, secure site generation. */
const fs = require('fs');
const read = p => fs.existsSync(p) ? fs.readFileSync(p,'utf8') : '';
let pass = 0, fail = 0;
function ok(name, cond){ console.log((cond ? 'OK  - ' : 'FAIL- ') + name); cond ? pass++ : fail++; }

const html = fs.readdirSync('.').filter(f => f.endsWith('.html'));

// Check that all HTML files have well-formed structure
let wellFormed = 0;
for (const f of html) {
  const c = read(f);
  if (/^<!DOCTYPE/i.test(c) && /<html/i.test(c) && /<\/html>/i.test(c) && /<head>/i.test(c) && /<\/head>/i.test(c) && /<body/i.test(c) && /<\/body>/i.test(c)) {
    wellFormed++;
  }
}
ok(`Well-formed HTML files: ${wellFormed}/${html.length} (>=100)`, wellFormed >= 100);

// Check for security headers and best practices
let withCSP = 0, withViewport = 0, withCharset = 0;
for (const f of html) {
  const c = read(f);
  if (/Content-Security-Policy/i.test(c)) withCSP++;
  if (/viewport/i.test(c)) withViewport++;
  if (/charset/i.test(c)) withCharset++;
}
ok(`Pages with charset: ${withCharset}/${html.length} (>=100)`, withCharset >= 100);
ok(`Pages with viewport: ${withViewport}/${html.length} (>=100)`, withViewport >= 100);

// Check that no raw AI API keys are present
let aiKeyLeaks = 0;
const allContent = html.map(read).join('\n');
if (/sk-[a-zA-Z0-9]{20,}/.test(allContent)) aiKeyLeaks++;
if (/OPENAI_API_KEY\s*=\s*['"]sk-/.test(allContent)) aiKeyLeaks++;
ok('No leaked AI API keys', aiKeyLeaks === 0);

// Check for proper escaping in JS strings
let escapeErrors = 0;
for (const f of html) {
  const c = read(f);
  // Check for the known broken pattern
  if (/onclick="VT\.openResults\(''\+/i.test(c) || /onclick="VT\.openResults\(''\+/i.test(c)) escapeErrors++;
}
ok('No known broken escape-sequence patterns', escapeErrors === 0);

// Check that pages reference core JS modules
let withCoreJS = 0;
for (const f of html) {
  const c = read(f);
  if (/assets\/js\/app\.js/.test(c) && /assets\/js\/config\.js/.test(c)) withCoreJS++;
}
ok(`Pages with core JS: ${withCoreJS}/${html.length} (>=80)`, withCoreJS >= 80);

// Check for accessibility basics
let withTitle = 0, withLang = 0;
for (const f of html) {
  const c = read(f);
  if (/<title>/i.test(c)) withTitle++;
  if (/<html\s+lang=/i.test(c)) withLang++;
}
ok(`Pages with title: ${withTitle}/${html.length} (>=100)`, withTitle >= 100);
ok(`Pages with lang attribute: ${withLang}/${html.length} (>=80)`, withLang >= 80);

console.log(`\nV5 error-free verification: ${pass} passed, ${fail} failed.`);
process.exit(fail ? 1 : 0);
