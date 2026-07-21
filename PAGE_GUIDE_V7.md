# School Connect v7 — Complete Page & Feature Guide

This is the generated-site operating catalogue. Every page has a role gate in the UI and a database Row-Level Security (RLS) policy. A page being visible does not grant permission: Supabase RLS is the final authority.

## Roles

- **Super Admin / Admin / Proprietor / Principal / Head Teacher / Bursar:** setup, approvals, finance, reports, audit and configuration according to role.
- **Teacher / Staff:** assigned teaching and operational workflows; score/attendance edits are ownership-controlled where applicable.
- **Parent:** read-only, linked-child access to attendance, report cards, fees, assignments and communications.
- **Student:** read-only access to their own records plus learning, CBT, timetable and assignments.

## Page catalogue

### Core

#### Academic Setup (`academic_setup`)
Enter/manage departments, terms, sessions, arms and academic periods used across the platform.
Use this page to complete the relevant workflow; use **Refresh** after a change and **Export CSV/PDF** where available.

#### Students & Profiles (`students`)
Central student information system with guardian info and Drive-linked photos.
Use this page to complete the relevant workflow; use **Refresh** after a change and **Export CSV/PDF** where available.

#### Staff / Teachers (`staff`)
Full staff records: teaching/non-teaching, subject taught, qualification, religion, marital status, photo (Drive link) and auto staff number. Approved teacher sign-ups are auto-added here.
Use this page to complete the relevant workflow; use **Refresh** after a change and **Export CSV/PDF** where available.

#### Classes (`classes`)
Create each class/arm and assign a class teacher by choosing from a staff dropdown — no typing. Set level and capacity.
Use this page to complete the relevant workflow; use **Refresh** after a change and **Export CSV/PDF** where available.

#### Subjects (`subjects`)
Register every subject once, give it a code/department/level, and map it to a teacher (chosen from staff). Used everywhere subjects are picked.
Use this page to complete the relevant workflow; use **Refresh** after a change and **Export CSV/PDF** where available.

#### Attendance (`attendance`)
Daily/class attendance. Pull a whole class PRESENT automatically from QR check-ins — no one-by-one typing. Parent alerts.
Use this page to complete the relevant workflow; use **Refresh** after a change and **Export CSV/PDF** where available.

#### Results / Scores (`results`)
Enter CA + exam scores per student/subject/term/session (all chosen from dropdowns). Grades auto-suggested. Feeds report cards & promotion.
Use this page to complete the relevant workflow; use **Refresh** after a change and **Export CSV/PDF** where available.

#### Timetable (`timetable`)
Class & exam timetables with auto-conflict detection.
Use this page to complete the relevant workflow; use **Refresh** after a change and **Export CSV/PDF** where available.

#### Scheme of Work (`sow`)
Termly planning + weekly progress tracking with proprietor dashboard.
Use this page to complete the relevant workflow; use **Refresh** after a change and **Export CSV/PDF** where available.

#### CBT / Online Exams (`cbt`)
Full embedded CBT engine: 17 question types, CSV upload, timer, randomisation, negative marking, anti-cheat, certificates, link/code access — results auto-flow into report cards.
Use this page to complete the relevant workflow; use **Refresh** after a change and **Export CSV/PDF** where available.

#### AI Question Prompts (`cbt-prompts`)
Ready-made Simple/Intermediate/Advanced prompts you paste into any free AI chat to draft CBT questions in the exact CSV format — copy, edit, upload. The platform itself uses no paid AI.
Use this page to complete the relevant workflow; use **Refresh** after a change and **Export CSV/PDF** where available.

#### Report Cards (flexible) (`report-cards`)
Define custom assessment columns per subject (CA1, CA2, Assignment, Project, Exam) with apportioned max marks. CBT/online results auto-map into the right column. Totals, grades & positions computed.
Use this page to complete the relevant workflow; use **Refresh** after a change and **Export CSV/PDF** where available.

#### Timetable Generator (`timetable-generator`)
Auto-builds a conflict-free timetable (no class/teacher double-booking) from each subject weekly period demand — deterministic, no AI.
Use this page to complete the relevant workflow; use **Refresh** after a change and **Export CSV/PDF** where available.

#### QR Check-in (`checkin`)
Students self-check-in by scanning their ID-card QR (or typing admission no). No biometric hardware needed.
Use this page to complete the relevant workflow; use **Refresh** after a change and **Export CSV/PDF** where available.

#### Assignments / Homework (`assignments`)
Post & track assignments with submission and grading.
Use this page to complete the relevant workflow; use **Refresh** after a change and **Export CSV/PDF** where available.

#### Library (`library`)
Book catalogue, lending records, barcode scanning, due-date alerts.
Use this page to complete the relevant workflow; use **Refresh** after a change and **Export CSV/PDF** where available.

#### Digital Library (`digital_library`)
Teachers assign online books/links + optional comprehension questions; auto-scored marks count toward grades.
Use this page to complete the relevant workflow; use **Refresh** after a change and **Export CSV/PDF** where available.

#### Conduct / Behaviour (`conduct`)
Merit/demerit, incidents, pattern tracking.
Use this page to complete the relevant workflow; use **Refresh** after a change and **Export CSV/PDF** where available.

#### Health / Clinic (`health`)
Sick-bay visits, medical history, allergy alerts.
Use this page to complete the relevant workflow; use **Refresh** after a change and **Export CSV/PDF** where available.

#### Promotion / Graduation (`promotion`)
Automated promotion: from each student\
Use this page to complete the relevant workflow; use **Refresh** after a change and **Export CSV/PDF** where available.

#### Integrated LMS (`lms`)
Unified learning platform for course tracking, video lessons, and online assignment submissions.
Use this page to complete the relevant workflow; use **Refresh** after a change and **Export CSV/PDF** where available.

#### Rewards & Badges (PBIS) (`gamification`)
Give students points for good behaviour/effort and award badges. A simple, transparent positive-reinforcement tracker — every point is logged and visible.
Use this page to complete the relevant workflow; use **Refresh** after a change and **Export CSV/PDF** where available.

#### Career & Placement (`career_counseling`)
Track college applications, university offers, and career guidance.
Use this page to complete the relevant workflow; use **Refresh** after a change and **Export CSV/PDF** where available.

#### Lesson Plans & Curriculum (`lesson_plans`)
Teachers author weekly lesson plans with objectives & resources; HODs approve (Chalk parity).
Use this page to complete the relevant workflow; use **Refresh** after a change and **Export CSV/PDF** where available.

#### Behaviour & PBIS Points (`behaviour`)
Award merit points and badges for positive behaviour; live leaderboards (ClassDojo parity).
Use this page to complete the relevant workflow; use **Refresh** after a change and **Export CSV/PDF** where available.

#### Special Education / Support (`support_plans`)
Track learning needs, interventions, goals and review dates per student (Provision Map parity).
Use this page to complete the relevant workflow; use **Refresh** after a change and **Export CSV/PDF** where available.

#### Substitute / Cover (`substitutions`)
Assign cover teachers when staff are absent; daily cover sheet & history.
Use this page to complete the relevant workflow; use **Refresh** after a change and **Export CSV/PDF** where available.

### Enterprise

#### Entrance & Assessments (`entrance`)
Run entrance/common-entrance/placement exams that anonymous candidates can sit. Instant result slips, certificates and admission letters — single or bulk.
Use this page to complete the relevant workflow; use **Refresh** after a change and **Export CSV/PDF** where available.

#### Storage Manager (`storage`)
See how much Supabase space each table uses and safely purge old, low-value rows (after exporting) to make room — keeps you on the free tier.
Use this page to complete the relevant workflow; use **Refresh** after a change and **Export CSV/PDF** where available.

#### Analytics Dashboard (`analytics`)
Live, platform-wide KPIs & charts across every module to support informed decisions.
Use this page to complete the relevant workflow; use **Refresh** after a change and **Export CSV/PDF** where available.

#### Approvals (`approvals`)
Approve/reject prospective students, parents and staff (and admissions applications) right from the admin dashboard. Set roles, approve, suspend or delete.
Use this page to complete the relevant workflow; use **Refresh** after a change and **Export CSV/PDF** where available.

#### Admin Data Console (`admin-data`)
Admin-only: read, delete, full backup (JSON) and restore of every table on the client site. All actions logged.
Use this page to complete the relevant workflow; use **Refresh** after a change and **Export CSV/PDF** where available.

#### Settings (2FA · Language · A11y) (`settings`)
Free email-OTP 2FA, multi-language UI (incl. Hausa/Yoruba/Igbo), and accessibility (font scaling, high contrast).
Use this page to complete the relevant workflow; use **Refresh** after a change and **Export CSV/PDF** where available.

#### Admissions & Enrollment (`admissions`)
Public application form → review funnel → enrollment.
Use this page to complete the relevant workflow; use **Refresh** after a change and **Export CSV/PDF** where available.

#### Salary & Payslips (`hr`)
Run staff salaries: basic, allowances, bonus, overtime, tax, pension & loan deductions with AUTO net-pay and printable professional payslips.
Use this page to complete the relevant workflow; use **Refresh** after a change and **Export CSV/PDF** where available.

#### Payroll Register (`payroll`)
The full salary register — pick staff from a list, auto-compute net pay, approve/pay status, and print a payslip for every month.
Use this page to complete the relevant workflow; use **Refresh** after a change and **Export CSV/PDF** where available.

#### Staff Loans & Advances (`staff_loans`)
Track staff loans/salary advances with monthly EMI repayment schedules, amount repaid and status (active/completed/defaulted).
Use this page to complete the relevant workflow; use **Refresh** after a change and **Export CSV/PDF** where available.

#### Staff Bonuses (`staff_bonus`)
Record performance, 13th-month, holiday and long-service bonuses per staff with citations and pay status.
Use this page to complete the relevant workflow; use **Refresh** after a change and **Export CSV/PDF** where available.

#### Staff Appraisals (`appraisals`)
Structured performance appraisals with weighted 1–10 criteria (punctuality, teaching quality, results, teamwork, conduct), AUTO score & band, and a recommendation.
Use this page to complete the relevant workflow; use **Refresh** after a change and **Export CSV/PDF** where available.

#### Hostel / Boarding (`hostel`)
Block/room/bed tracking with active/vacated status.
Use this page to complete the relevant workflow; use **Refresh** after a change and **Export CSV/PDF** where available.

#### Alumni Network (`alumni`)
Graduation-year directory, mentorship, fundraising.
Use this page to complete the relevant workflow; use **Refresh** after a change and **Export CSV/PDF** where available.

#### Inventory & Assets (`inventory`)
Equipment/supplies register with location and condition.
Use this page to complete the relevant workflow; use **Refresh** after a change and **Export CSV/PDF** where available.

#### Certificates & Documents (`certificates`)
Issue branded, printable certificates (achievement, graduation, testimonial) with a unique verification code.
Use this page to complete the relevant workflow; use **Refresh** after a change and **Export CSV/PDF** where available.

#### Role & Status Manager (`status_manager`)
Authorized administrators search people and change role/status with an audit trail. Use for approved, suspended, active and cross-role changes.
Use this page to complete the relevant workflow; use **Refresh** after a change and **Export CSV/PDF** where available.

#### Custom Document Builder (`document_builder`)
Drag-and-drop builder for hall tickets, bonafide letters, and custom IDs.
Use this page to complete the relevant workflow; use **Refresh** after a change and **Export CSV/PDF** where available.

#### Advanced Fleet GPS (`fleet_tracking`)
Bus route optimization, live tracking placeholder, driver logs.
Use this page to complete the relevant workflow; use **Refresh** after a change and **Export CSV/PDF** where available.

#### Facility Booking (`facility_booking`)
Schedule science labs, sports fields, and auditorium usage.
Use this page to complete the relevant workflow; use **Refresh** after a change and **Export CSV/PDF** where available.

#### Compliance & Audit (`compliance`)
Track accreditation metrics, fire drills, and statutory inspections.
Use this page to complete the relevant workflow; use **Refresh** after a change and **Export CSV/PDF** where available.

#### Audit / Activity Log (`activity_log`)
Tamper-evident log of every create/update/delete/login — who did what, when (PowerSchool/Infinite Campus parity).
Use this page to complete the relevant workflow; use **Refresh** after a change and **Export CSV/PDF** where available.

#### Academic Records & Broadsheets (`academic_records`)
Generate student record cards, class broadsheets and subject broadsheets for print/PDF.
Use this page to complete the relevant workflow; use **Refresh** after a change and **Export CSV/PDF** where available.

#### About the Developer (`developer`)
The developer & HMG Concepts brand bio — the last page of the site.
Use this page to complete the relevant workflow; use **Refresh** after a change and **Export CSV/PDF** where available.

### Comm

#### Student Diary (`diary`)
Daily homework/classwork/behaviour log; parents view & acknowledge.
Use this page to complete the relevant workflow; use **Refresh** after a change and **Export CSV/PDF** where available.

#### Surveys & Forms (`surveys`)
Anonymous-optional feedback forms & surveys with response collection.
Use this page to complete the relevant workflow; use **Refresh** after a change and **Export CSV/PDF** where available.

#### Announcements (`announcements`)
School-wide notices with priority levels and pinning.
Use this page to complete the relevant workflow; use **Refresh** after a change and **Export CSV/PDF** where available.

#### Events & Calendar (`events`)
Term calendar with RSVP, venue booking.
Use this page to complete the relevant workflow; use **Refresh** after a change and **Export CSV/PDF** where available.

#### Messaging (WA/Email) (`messages`)
Free bulk WhatsApp + email + SMS to parents/staff.
Use this page to complete the relevant workflow; use **Refresh** after a change and **Export CSV/PDF** where available.

#### In-App Inbox (`inbox`)
Private staff↔admin↔parent threaded messaging.
Use this page to complete the relevant workflow; use **Refresh** after a change and **Export CSV/PDF** where available.

#### Complaints & Grievance (`complaints`)
Submit→route→track→resolve with evidence and status.
Use this page to complete the relevant workflow; use **Refresh** after a change and **Export CSV/PDF** where available.

#### Results Broadcast (`broadcast`)
One-click send results to parents via free channels.
Use this page to complete the relevant workflow; use **Refresh** after a change and **Export CSV/PDF** where available.

#### Voting & Polls (`voting`)
Class prefects, head boy/girl, staff polls, anonymous ballots.
Use this page to complete the relevant workflow; use **Refresh** after a change and **Export CSV/PDF** where available.

#### PTA Meeting Scheduler (`parent_meeting`)
Schedule parent-teacher meetings, send reminders, log minutes.
Use this page to complete the relevant workflow; use **Refresh** after a change and **Export CSV/PDF** where available.

#### Front Desk / Dispatch (`front_desk`)
Track postal dispatch, calls, and walk-in admission inquiries.
Use this page to complete the relevant workflow; use **Refresh** after a change and **Export CSV/PDF** where available.

#### IT / Help Desk (`helpdesk`)
Internal ticketing for IT, maintenance and admin requests with priority & status.
Use this page to complete the relevant workflow; use **Refresh** after a change and **Export CSV/PDF** where available.

### Media

#### Menu / Meal Planner (`menu`)
Weekly meal planner with allergen notes for parents.
Use this page to complete the relevant workflow; use **Refresh** after a change and **Export CSV/PDF** where available.

#### Photo & Video Gallery (`gallery`)
Albums, Google Drive image linking, YouTube embeds.
Use this page to complete the relevant workflow; use **Refresh** after a change and **Export CSV/PDF** where available.

#### E-Resources / Notes (`eresources`)
Lesson notes, past questions, Drive-linked documents.
Use this page to complete the relevant workflow; use **Refresh** after a change and **Export CSV/PDF** where available.

#### Birthdays (`birthdays`)
Celebrate with auto-reminders and wish lists.
Use this page to complete the relevant workflow; use **Refresh** after a change and **Export CSV/PDF** where available.

#### Digital ID Cards (`idcards`)
Generate & print branded student/staff cards with a scannable QR code (encodes the ID for attendance). Pick a student or enter manually.
Use this page to complete the relevant workflow; use **Refresh** after a change and **Export CSV/PDF** where available.

#### Marketing Flyer (`flyer`)
Generate a printable, branded promotional flyer/poster for admissions and parent outreach — free lead-gen.
Use this page to complete the relevant workflow; use **Refresh** after a change and **Export CSV/PDF** where available.

#### Reports & Export (`reports`)
CSV / PDF / Excel exports + analytics dashboard.
Use this page to complete the relevant workflow; use **Refresh** after a change and **Export CSV/PDF** where available.

#### Directory (`directory`)
Searchable people directory with role filters.
Use this page to complete the relevant workflow; use **Refresh** after a change and **Export CSV/PDF** where available.

#### Departments & Offices (`departments`)
Per-department coordination, resource management.
Use this page to complete the relevant workflow; use **Refresh** after a change and **Export CSV/PDF** where available.

#### Parent–Child Mapping (`parents`)
Link parents to children for results, fees, complaints.
Use this page to complete the relevant workflow; use **Refresh** after a change and **Export CSV/PDF** where available.

#### School Calendar (`school_calendar`)
Academic calendar with holidays, mid-terms and term dates.
Use this page to complete the relevant workflow; use **Refresh** after a change and **Export CSV/PDF** where available.

#### Lost & Found (`lost_found`)
Log lost & found items, claim with photo evidence.
Use this page to complete the relevant workflow; use **Refresh** after a change and **Export CSV/PDF** where available.

#### Book Reservation (`book_request`)
Students reserve library books; auto-queue when returned.
Use this page to complete the relevant workflow; use **Refresh** after a change and **Export CSV/PDF** where available.

### Finance

#### Fees & Payments (`fees`)
Fee structures, balances, print-ready receipts, payment tracking.
Use this page to complete the relevant workflow; use **Refresh** after a change and **Export CSV/PDF** where available.

#### School Finance (`finance`)
Income/expense ledger with charts and KPI analytics.
Use this page to complete the relevant workflow; use **Refresh** after a change and **Export CSV/PDF** where available.

#### Leave Management (`leave`)
Staff leave requests with approval workflows and calendar.
Use this page to complete the relevant workflow; use **Refresh** after a change and **Export CSV/PDF** where available.

#### Visitor Management (`visitors`)
Gate-pass, check-in/out, host notifications, badges.
Use this page to complete the relevant workflow; use **Refresh** after a change and **Export CSV/PDF** where available.

#### Transport / Bus (`transport`)
Routes, GPS tracking, pick-up records.
Use this page to complete the relevant workflow; use **Refresh** after a change and **Export CSV/PDF** where available.

#### School Fee Structure (`school_fees`)
Set current and next-term fee structures by class and arm. Each student dashboard and report card receives the matching bill and prior balance.
Use this page to complete the relevant workflow; use **Refresh** after a change and **Export CSV/PDF** where available.

#### School Products (`school_products`)
Manage school uniform, books, stationery and required products with price, category and stock notes for family dashboards.
Use this page to complete the relevant workflow; use **Refresh** after a change and **Export CSV/PDF** where available.

#### Cafeteria & Meals (`cafeteria`)
Student meal plans, dietary restrictions tracking, and pre-paid wallets.
Use this page to complete the relevant workflow; use **Refresh** after a change and **Export CSV/PDF** where available.

#### Scholarships & Aid (`financial_aid`)
Manage fee waivers, sponsor tracking, and scholarship renewals.
Use this page to complete the relevant workflow; use **Refresh** after a change and **Export CSV/PDF** where available.

#### Fundraising & Donations (`donations`)
Run campaigns, log donor pledges & gifts, generate thank-you receipts (Blackbaud/FreshSchools parity).
Use this page to complete the relevant workflow; use **Refresh** after a change and **Export CSV/PDF** where available.

#### Online Fee Payments (`payments_online`)
Generate Paystack/Flutterwave checkout links or bank-transfer instructions — free integrations, no monthly fee.
Use this page to complete the relevant workflow; use **Refresh** after a change and **Export CSV/PDF** where available.

### Academics

#### Grading Rubrics (`rubrics`)
Standards-based rubrics (PowerSchool/Edsby parity): define skills/criteria and a scale so assessment aligns to learning objectives.
Use this page to complete the relevant workflow; use **Refresh** after a change and **Export CSV/PDF** where available.

#### Academic Transcripts (`transcripts`)
Cumulative academic records / transcripts per student across sessions — international standard for transfers and applications.
Use this page to complete the relevant workflow; use **Refresh** after a change and **Export CSV/PDF** where available.

#### Transfer Certificates (`transfer_cert`)
Issue transfer/leaving certificates (National Records Exchange parity) with conduct and reason for leaving.
Use this page to complete the relevant workflow; use **Refresh** after a change and **Export CSV/PDF** where available.

#### Counselling & Wellbeing (`counselling`)
Confidential student counselling/wellbeing session log with status tracking and referrals.
Use this page to complete the relevant workflow; use **Refresh** after a change and **Export CSV/PDF** where available.

#### Affective Domain (`affective_traits`)
Record punctuality, neatness, politeness, honesty, leadership, cooperation and attentiveness ratings for each learner. These flow into report cards.
Use this page to complete the relevant workflow; use **Refresh** after a change and **Export CSV/PDF** where available.

#### Psychomotor Domain (`psychomotor_traits`)
Record handwriting, verbal fluency, sports, crafts, drawing and music ratings for each learner. These flow into report cards.
Use this page to complete the relevant workflow; use **Refresh** after a change and **Export CSV/PDF** where available.

#### Report Card Comments (`report_comments`)
Enter class-teacher comments, principal comments and next-term begins dates for each learner report card.
Use this page to complete the relevant workflow; use **Refresh** after a change and **Export CSV/PDF** where available.

### HMG Concepts

#### HMG Ecosystem (`ecosystem_products`)
Lead-generation page for the HMG Concepts ecosystem and client-school visibility. Distinct from the HMG Digital Products catalogue.
Use this page to complete the relevant workflow; use **Refresh** after a change and **Export CSV/PDF** where available.

#### HMG Digital Products (`hmg_digital_products`)
HMG Concepts Ecosystem product catalogue with official flyers and contact paths. Visible in every portal navigation.
Use this page to complete the relevant workflow; use **Refresh** after a change and **Export CSV/PDF** where available.

## Cross-page workflows

1. **Identity:** create/approve profiles, then register Students, Staff, Classes and Subjects.
2. **Academic setup:** establish the session/term/arm/assessment lookups before entering marks.
3. **Marks:** Subject/Teacher Broadsheet → Class Broadsheet → Student Report Card. The teacher subject sheet writes `report_scores`; the class view aggregates by student/subject; the report card reads the aggregate plus traits, comments, fees, attendance, stamp and signature.
4. **Attendance:** staff record or import QR check-ins. Parent/student pages query only linked/own student IDs and never show save controls.
5. **Fees:** configure class/arm/department bills in School Fee Structure; record payments in Fees; balances and next-term bills flow into family views and report cards.
6. **CBT:** create exam → publish code/link → candidate submits → results are stored → authorized staff map to a report-card column.
7. **Documents:** settings stores stamp/signature → report engine embeds them into print HTML → browser Print/Save as PDF creates the official document.
8. **Communication:** announcements/broadcasts/inbox/complaints create auditable, role-scoped communication records.

## Free-first operation

The platform uses static hosting, Supabase free tier, browser print/PDF, CSV/JSON export, PWA cache, mailto/wa.me/sms links and deterministic SQL/JavaScript. It does not call a paid AI API. The CBT prompt page is a manual copy-and-review helper, not an AI integration.

