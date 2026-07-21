# School Connect v7 — Clear Deployment Guide (free tools)

## A. Build a client site

1. Upload the contents of the generator folder to a GitHub repository or open `builder.html` locally.
2. Open the authorized builder and complete every wizard step. Enter the school name, short name/acronym, logo, contact details, theme, modules and Supabase placeholders.
3. Use **Full Interactive Preview**. Check the navigation, report cards, attendance, fees, stamp settings and parent/student read-only paths.
4. Download the ZIP. For a fresh client, the important database file is only `database/complete-schema.sql`.

## B. Create the free Supabase back end

1. Create a Supabase project at `supabase.com` and save the database password.
2. In **SQL Editor**, paste the entire `database/complete-schema.sql` and Run it once. Do not run `schema.sql`, `complete-schema-v4.sql`, `v4-repair.sql`, CBT, voting or enterprise SQL after it on a new project.
3. Wait for the final success status. If a table is not visible immediately, refresh Table Editor; the script sends a PostgREST schema reload notification.
4. In Authentication, create the first admin user. In Table Editor set that profile's `role` to `admin` or `super_admin` and `status` to `approved`/`active`.
5. Never expose a Supabase service-role key. The static site uses only the URL and anon public key.

## C. Configure the portal

1. Open `generated-site/assets/js/config.js`.
2. Set `SUPABASE_URL` to the project URL and `SUPABASE_ANON_KEY` to the anon public key.
3. Commit the site to GitHub. Do not commit passwords, service-role keys or private signature files.

## D. Deploy static hosting

- **GitHub Pages:** Settings → Pages → Deploy from `main` → root. Enable HTTPS.
- **Cloudflare Pages / Netlify:** choose static/no framework, no build command, output directory `/`.
- **Vercel:** import the repository, framework `Other`, build command empty, output directory `.`.

Use the generated `vercel.json`, `_headers`, `robots.txt`, `sitemap.xml` and `manifest.json`. For a custom domain, set the configured `siteUrl` to the canonical HTTPS URL, regenerate/redeploy so canonical/OG/sitemap links are correct, and submit the sitemap to Google Search Console.

## E. First school setup order

1. Settings: school details, logo, acronym, stamp, authorised signature, SEO and geofence.
2. Academic Setup: session, term, arms, departments, academic period.
3. Classes and Subjects: consistent class/subject names; map teachers.
4. Staff/Students/Parents: register records, approve accounts and create parent-child links.
5. Fees: class/arm/department bills; then payments.
6. Results: shared columns → teacher subject broadsheet → class broadsheet → report card.
7. Attendance: staff/QR check-in; verify family read-only view.
8. Communications, CBT, voting, library, HR and enterprise pages as needed.

## F. Search/lead generation

Keep the public `index.html`, `about.html`, `contact.html`, `robots.txt` and `sitemap.xml`. Ensure the public school name/motto/contact details are complete. Keep the HMG Concepts Ecosystem links in the footer and about/ecosystem pages; these are the lead-generation path. Do not make private dashboard pages indexable if client policy requires privacy.

## G. Updating a live older site

Back up the database first. Replace the static files with the fixed generated site, then run the idempotent `complete-schema.sql`. It repairs missing columns/tables and removes duplicate report-score rows before installing the canonical key. Validate with `TEST_PLAN_V7.md`; do not manually mix old migration orderings.
