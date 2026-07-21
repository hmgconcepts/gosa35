# School Connect v7 — QA, Integration & Deployment Acceptance Plan

## Automated checks

From the generator root:

```bash
bash verify.sh
node verify-v7-complete.js
for f in assets/js/*.js; do node --check "$f"; done
```

Expected: 168 legacy checks passed, 35 v7 schema/integration checks passed, and no JavaScript syntax error.

## Supabase fresh-install smoke test

1. Create a free Supabase project and run only `database/complete-schema.sql`.
2. Confirm the SQL editor ends with `School Connect v7 complete schema installed successfully`.
3. In Table Editor confirm: `school_settings`, `schools`, `students`, `staff`, `parent_child`, `attendance`, `assessment_columns`, `report_scores`, `report_comments`, `psychomotor_traits`, `class_fee_structure`, `school_products`, `role_status_log`, `cbt_exams`, `cbt_results`.
4. Create two test profiles: one approved teacher/admin and one parent. Create two students, link only one to the parent.
5. Insert attendance for both as staff. Sign in as parent: only the linked child's rows appear; no Add/Save control is visible; attempts to insert/update with the anon client are denied by RLS.
6. Create a class/subject/term/session and assessment columns. Enter 6 scores and click Save All. Expected: 6 saved, 0 failed; re-saving updates the same rows rather than duplicating.
7. Insert a class fee bill and reload School Fees, Settings and Report Cards. Expected: no schema-cache error and Next-Term Fee Bills loads.
8. Save the staff check-in deadline. Expected: success toast and the value survives reload for another staff session.
9. Add a psychomotor trait, report comment and school product. Expected: tables render and records persist.
10. Set stamp text, colour, signature URL or draw a signature. Print a report card. Expected: official circular stamp and authorised signature appear in the print preview.
11. Insert students/staff without IDs. Expected: admission number begins with configured acronym (e.g. `GOSA-00001`) and staff number begins with acronym plus `-STF-`.
12. Submit a CBT result and map it to a report column. Expected: result stored and visible only to authorized users.

## Regression matrix

| Area | Staff/Admin | Parent | Student |
|---|---|---|---|
| Students/staff/classes/subjects | CRUD by role | no write | no write |
| Teacher scores | assigned/owned write | report read only | own report read only |
| Attendance | create/update | linked-child read only | own read only |
| Fees | bursar/admin write | linked-child read | own read |
| Report comments/traits | staff write | linked-child read | own read |
| Products/role log | admin write | permitted read only | no write |
| CBT manager | staff/admin | no edit | take/own result |
| Voting | create/control | vote if allowed | vote if allowed |
| Settings/stamp/geofence | admin | no write | no write |

## Link and ZIP audit

- Every generated module page resolves to a local file.
- All selected pages receive shared runtime assets and PWA files.
- The builder emits `database/complete-schema.sql` as the only fresh-install SQL.
- Original source archives are retained separately from the fixed deliverables.
- ZIP paths preserve the generator/generated-site folder structures.
