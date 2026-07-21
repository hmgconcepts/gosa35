# HMG SchoolConnect — System Diagnosis & Architecture Analysis

> **Authoritative Technical Evaluation**  
> *Prepared by Agent Mode on Arena.ai*

---

## 1. Executive Summary & Core Mission
**HMG SchoolConnect** is a state-of-the-art, browser-based School Management System (SMS) or Educational Management Information System (EMIS) created by **Adewale Samson Adeagbo** (Founder of HMG Concepts). The platform is engineered to dismantle the high cost of institutional digitization by providing a free, client-side, zero-monthly-cost school management portal.

The ecosystem utilizes a **two-tier architecture**:
1. **The Generator / Builder (`school`)**: A no-code dynamic builder (`builder.html` + `generator.js`) allowing operators to customize school details, branding themes, layouts, class levels, and select from up to 89 enterprise modules. The builder compiles all client files and generates a standalone, offline-ready deployment package in a ZIP archive entirely in-browser.
2. **The Client Portal (`gosa` / generic build)**: A static, client-side Progressive Web App (PWA) that executes directly in the user's browser, pulling and pushing data to a serverless backend instance hosted on **Supabase** via client-side libraries.

---

## 2. Platform Architecture & Data Flow

```
+─────────────────────────────────────────────────────────────+
|                     CLIENT BROWSER LAYER                    |
|                                                             |
|  [ PWA Static Shell ] ---------> [ App Engine (app.js) ]    |
|   - index.html                    - Session Management      |
|   - login.html                    - Role-Based Routing      |
|   - dashboard.html                - Theme & Font Hooks      |
|   - cbt-exam.html                 - PWA Service Worker      |
|                                                             |
|          |                                |                 |
|          v                                v                 |
|  [ CBT / Report Engines ]         [ CRUD Engine (crud.js) ] |
|   - cbt-engine.js                  - Dynamic Form Modals    |
|   - report-engine.js               - Relational Dropdowns   |
|   - analytics.js                   - Bulk CSV Import        |
+─────────────────────────────────────────────────────────────+
           |                                |
           | Direct Client Queries          | PostgreSQL (SSL)
           | (Authenticated as Role)        | 
           v                                v
+─────────────────────────────────────────────────────────────+
|                    SUPABASE BACKEND LAYER                   |
|                                                             |
|      [ API / RPC / Realtime Gateway ]                       |
|                                                             |
|      [ Row-Level Security (RLS) Policies ]                  |
|       - restricts parents to linked student_ids             |
|       - restricts students to personal profiles             |
|       - restricts teachers to owned subject records         |
|                                                             |
|      [ Relational PostgreSQL Database Engine ]              |
|       - Profiles, Students, Staff, Attendance               |
|       - Results, CBT Exams, Fees, Timetable, Polls          |
+─────────────────────────────────────────────────────────────+
```

### Direct-to-Database Client Pattern
Rather than route traffic through a custom middle-tier API server, SchoolConnect implements the **Serverless-Client Pattern**. Authenticated or guest sessions directly communicate with the Supabase PostgreSQL database using the public `anon` key. 

To ensure complete data privacy and prevent unauthorized write/read access, the platform relies on **Row-Level Security (RLS)** configured within PostgreSQL. All security policies are defined inside `database/complete-schema.sql` and enforced database-side:
- **Admin/Super Admin**: Unrestricted read/write policies across all tables.
- **Staff**: Authorized to write academic scoresheets, attendance logs, and scheme-of-work topics; restricted to viewing profiles and student records of assigned classes.
- **Parents**: Locked down via PostgreSQL joins on `parent_child` links; they can only query records where `student_id` belongs to their linked children.
- **Students**: Read-only queries targeting their own personal records, attendance, CBT results, timetables, and assignments.

---

## 3. The Generator Engine (`generator.js`)
The dynamic builder operates completely inside the browser using **JSZip** to assemble the deployment package:
1. **Wizard Configuration (`wizard.js`)**: Tracks configuration variables (school metadata, Supabase credentials, branding themes, layouts, levels, and selected modules) and saves state to `localStorage` for session persistence.
2. **Page Compilation (`templates.js`)**: Functions like `T.shell()`, `T.loginPage()`, and `T.modulePage()` act as client-side templating functions. They interpolate configuration details into high-fidelity HTML scripts with inline stylesheets and native components.
3. **Dedicated Pages**: Essential modules like `student-profile.html`, `cbt-exam.html`, `report-cards.html`, and `voting.html` are compiled using specialized templating routines or static files sanitized on the fly (rebranding logos, mottos, and colors).
4. **Consistency Enforcement (NAV-4)**: The generator automatically writes **all** available module files into the ZIP. Selected modules control which links appear in the navigation bar (preserving the customized "feel"), while other files remain as latent links, eliminating broken cross-references or "Page Not Found (404)" errors.

---

## 4. Key Platform Subsystems

### A. Computer-Based Testing (CBT) Engine
- **Versatility**: Supports 17 distinct question formats (including numerical tolerances, assertions, matrices, grid matching, and case studies).
- **Anti-Cheat Shield**: Focus monitors, blockages of clipboard copy/paste, tab-switch penalties, and exam auto-submission.
- **Public Assessment Mode**: Enables anonymous guest candidates to sit assessments via `entrance.html` and receive instant credentials verifiable on `verify-certificate.html`.

### B. Consolidated Academic & Report Card Engine
- Maps subject-level continuous assessment (CA) scores and examination marks into uniform reports:
  1. **Subject Scoresheet**: Locked down to the authoring subject teacher.
  2. **Class Broadsheet**: Collated view of student marks across an entire grade.
  3. **Termly Report Cards**: Includes student photos, grade calculations, principal signatures, teacher comments, and GPA metrics.

### C. Multi-Channel Notification Fan-Out
- Dispatches notification triggers without third-party API subscription costs:
  - **In-App Alerts**: Written to `module_records` under the `notifications` scope.
  - **Browser Web Push**: Powered by PWA service workers (`sw.js`).
  - **Deep-Links**: Formulates custom-deep-links using standard protocols (`mailto:`, `wa.me:`, `sms:`) to open device-native communication channels.

### D. Progressive Web App (PWA) Integration
- Built with standard `manifest.json` and service worker cache files (`sw.js`).
- Detects network latency and provides a network-first with 4-second timeout wrapper for navigation pages, falling back to cached local pages and a dedicated `offline.html` screen, guaranteeing resilience in low-bandwidth regions.

---
*Verified and diagnosed as a resilient, enterprise-grade, serverless architecture.*
