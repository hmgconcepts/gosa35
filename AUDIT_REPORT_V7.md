# HMG School Connect v7 — Deep Engineering Audit & Repair Report

**Audit date:** 20 July 2026 (Africa/Lagos)  
**Inputs inspected:** `https://hmgschoolconnect.vercel.app`, `https://github.com/hmgconcepts/school`, `https://gosasite.vercel.app`, `https://github.com/hmgconcepts/gosa`.

## 1. What the product is

School Connect is a browser-based, no-code/static PWA generator. The builder collects school identity, logo, acronym, contact details, theme, layout, enabled modules and Supabase credentials. It produces a branded static school portal ZIP. The generated portal loads HTML pages and shared JavaScript in the browser and talks directly to Supabase Auth/PostgREST. PostgreSQL tables, functions, views and RLS policies are the back end. There is no custom paid API or AI API in the runtime.

The system has three layers:

1. **Generator layer:** `builder.html`, `assets/js/wizard.js`, `catalog.js`, `templates.js` and `generator.js`. The wizard assembles all selected pages plus a complete operational shell, branding, PWA assets, SEO assets, sample documents and optional `modern/` delivery scaffold.
2. **Portal layer:** 96 catalog modules plus public pages, shared `app.js`, `crud.js`, `report-engine.js`, `cbt-engine.js`, `notifications.js`, `voting.js`, `enterprise.js`, `super.js` and the page templates.
3. **Data/security layer:** Supabase Auth/Postgres, one self-contained `database/complete-schema.sql`, views/RPCs, identifiers, audit fields and RLS.

## 2. Live/demo and repository findings

The public generator landing page correctly describes a broad school operating system: students/staff/classes/subjects, academic records, attendance, fees, finance, communications, CBT, voting, PWA, analytics, admissions, HR/payroll, boarding, alumni, inventory, certificates, geofence and HMG lead generation. The demo landing page presents God of Seed Academy as a branded client portal with portal login, results, fees, voting, notifications, PWA and HMG ecosystem links.

The most important difference between the marketing description and a reliable production deployment was the database installation path. The repositories had accumulated multiple overlapping SQL files and a v4 script that mixed a repair preamble with a second full schema. A single failure early in that script prevented all later table creation, which then appeared in the browser as multiple independent “schema cache” errors.

## 3. Root-cause defect matrix

| Reported symptom | Root cause | v7 repair |
|---|---|---|
| `no unique or exclusion constraint ... ON CONFLICT`; `Saved 0, 6 failed` | Browser upsert key did not match one real unique key; legacy nullable/duplicate rows also made a reliable key impossible. | One seven-column context key, null backfill, duplicate cleanup, `NOT NULL`, unique constraint and matching browser `onConflict` string. |
| `public.class_fee_structure` not in schema cache | A prior schema aborted before the table (and some versions referenced missing `public.schools`). | `schools` and `class_fee_structure` are created first, with columns, indexes, unique key, policies and PostgREST reload. |
| v4 `student_id` column error | Historical scripts inserted/altered columns that were absent in old table shapes and were not self-contained. | Early identity/report/CBT tables plus explicit `student_id` backfills and a single canonical schema. |
| `school_name` missing on `school_settings` | `school_settings` was created later than an `ALTER/INSERT`, and older versions did not include the column. | Settings table is created before every use and explicitly backfilled with `school_name`, `short_name`, acronym and all runtime fields. |
| psychomotor/report comments missing | Same early-abort/schema-cache cascade; no dependable single install order. | Tables are declared early, RLS/policies are installed at the end and cache reload is sent. |
| school products missing | Same cascade plus missing tenant dependency in older schema. | Early table declaration, additive columns, admin write policy and authenticated read policy. |
| role/status log missing or `current_role` syntax error | Reserved-word/shape drift and dependency ordering. | No unquoted `current_role` column; role log has explicit `previous_role/new_role`, `person_id`, audit fields and admin-only policies. |
| Check-in deadline saved locally warning | Runtime had a local fallback because the DB column was genuinely missing. | `checkin_deadline` and grace columns are always present; DB-first save is used, with local storage only when Supabase is not configured. |
| Parents could not safely see attendance | Static attendance page loaded the whole student table and relied too heavily on UI/RLS assumptions. | Parent query starts at `parent_child`; student query uses `students.user_id`; family controls are hidden and no write path is rendered. RLS is read-only for family users. |
| Stamps/signatures were inconsistent | Report engine had a stamp implementation but settings were not fully exposed/used as authoritative values. | Settings UI stores stamp text/colour/enabled state and signature; report engine reads `SC_SETTINGS`, embeds a printable circular stamp and authorised signature. |
| Fresh generated ZIP asked users to run many SQL files | Generator bundled overlapping base, v4, feature and migration scripts as if all were fresh-install requirements. | ZIP fresh-install path contains only `database/complete-schema.sql` plus an explanatory `database/README.md`; old migrations remain source history only. |

## 4. Academic marks flow (now unambiguous)

1. **Teacher Subject Broadsheet / Report Cards page:** select class, subject, term and session. Create the shared assessment columns (CA1, CA2, Project, CBT, Exam) once. Enter each student's mark in the subject grid.
2. **Persistence:** each cell writes to `report_scores` using `(column_id, student, class, subject, term, session)` context. The score is also mirrored into the standard `results` fields for CA/exam-compatible columns.
3. **Class Broadsheet:** the report engine groups the same subject totals by student and class, calculating totals, percentage, grade and position-ready rows.
4. **Student Report Card:** the selected student sees all subjects plus comments, affective/psychomotor traits, attendance summary, prior balance, next-term bill, school stamp, class-teacher signature and authorised principal/proprietor signature.
5. **CBT:** a CBT result may be mapped to a selected report-card column; it must be reviewed before publication.

## 5. Security review

The fixed design assumes the browser contains only the Supabase **anon public key**. Never place a service-role key in `config.js`, HTML, `modern/public/` or a GitHub repository. RLS is enabled on platform tables. Parent/student access is based on `parent_child` and `students.user_id`; staff write access is role/status controlled; report-score writes are ownership/admin controlled; finance/admin tables are restricted. The PWA cache is not a security boundary, so private pages must still enforce Auth/RLS on every request.

Free-tier security recommendations: enable Supabase email confirmation where appropriate, use strong passwords, review Auth users monthly, enforce HTTPS hosting, avoid public bucket policies for private documents, export before destructive purge, rotate anon keys only through Supabase settings, and do not rely on the UI as authorization.

## 6. Verification performed

- Original generator repository verification: **168 passed, 0 failed** (`verify.sh`).
- New v7 cumulative static audit: **35 passed, 0 failed** (`verify-v7-complete.js`).
- JavaScript syntax checks: all shared `assets/js/*.js` parse with Node 20.
- Generated client schema branding: pass (GOSA demo uses GSA; fresh generator output is patched from the wizard acronym).
- Generated portal report-card key, attendance family path, settings persistence and configurable stamp: pass.

A live Supabase smoke test still requires a real project because this workspace has no client credentials. Deployment acceptance must run the SQL in a new free Supabase project and execute the manual smoke checklist in `TEST_PLAN_V7.md`.

## 7. Residual boundaries / honest production notes

No static client-side system can be “hacking proof.” The architecture is materially hardened by RLS, least privilege, safe escaping, no service-role key, HTTPS, CSP/security headers and role checks, but production operators must still review policies and Auth settings. Payment providers, WhatsApp, SMS, email and browser push remain free-link/browser pathways unless the client later adds paid provider infrastructure. The modern scaffold is a delivery option and health/API wrapper; the canonical portal remains the working static PWA.
