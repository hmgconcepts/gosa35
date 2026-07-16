#!/usr/bin/env node
/* School Connect v5 — verifier for SEO meta tags. */
const fs = require('fs');
const path = require('path');
const read = p => fs.existsSync(p) ? fs.readFileSync(p,'utf8') : '';
let pass = 0, fail = 0;
function ok(name, cond){ console.log((cond ? 'OK  - ' : 'FAIL- ') + name); cond ? pass++ : fail++; }

const html = fs.readdirSync('.').filter(f => f.endsWith('.html'));

// Count pages with key meta tags
let withDescription = 0, withOG = 0, withCanonical = 0, withTwitter = 0;
for (const f of html) {
  const content = read(f);
  if (/<meta\s+name=["']description["']/i.test(content)) withDescription++;
  if (/<meta\s+property=["']og:/i.test(content)) withOG++;
  if (/<link\s+rel=["']canonical["']/i.test(content)) withCanonical++;
  if (/<meta\s+name=["']twitter:/i.test(content)) withTwitter++;
}

ok(`Pages with meta description: ${withDescription}/${html.length} (>=80)`, withDescription >= 80);
ok(`Pages with OpenGraph tags: ${withOG}/${html.length} (>=30)`, withOG >= 30);
ok(`Pages with canonical link: ${withCanonical}/${html.length} (>=20)`, withCanonical >= 20);
ok(`Pages with Twitter card: ${withTwitter}/${html.length} (>=20)`, withTwitter >= 20);

// robots.txt and sitemap
ok('robots.txt present', fs.existsSync('robots.txt'));
ok('sitemap.xml present', fs.existsSync('sitemap.xml'));

// HMG Concepts backlink in footer
const indexPage = read('index.html') || read('home.html') || read(html[0]);
ok('HMG Concepts backlink in main page', /hmgconcepts\.pages\.dev/.test(indexPage));

// Per-page keywords
ok('at least one page has page-specific keywords', /<meta\s+name=["']keywords["']/i.test(read(html[0])));

console.log(`\nV5 SEO verification: ${pass} passed, ${fail} failed.`);
process.exit(fail ? 1 : 0);
