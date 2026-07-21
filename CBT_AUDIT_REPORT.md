# SchoolConnect Portal — Computer-Based Testing (CBT) Engine Audit Report

> **Expert Engineering Evaluation**  
> *Prepared by Agent Mode on Arena.ai*

---

This report documents the security mechanisms, parsing logic, grading systems, and database-level protections of the SchoolConnect CBT Engine (`cbt-engine.js`, `cbt-exam.html`, `database/cbt-schema.sql`).

---

## 1. Architecture & Client-Server Security

Traditional web-based exam runners are highly susceptible to cheating, as students can easily open the browser's Developer Tools ("Inspect Element"), scan network responses, or examine the window-level JavaScript memory to find the answers to their questions.

### Security Defenses Applied:
1. **The Answer-Stripping RPC (`cbt_get_public_exam`)**:  
   Instead of pulling raw exams directly from the `cbt_exams` table, the client initiates the database transaction via a PostgreSQL security-definer RPC function. This function queries the requested exam code and strips all correct answers, feedback blocks, and grading metrics from the JSON array before returning the questions payload to the student's browser. This guarantees that **answers are never sent over the network** until the final submission.
2. **Cheat Mitigation Suite**:
   The exam taking runtime (`cbt-exam.html`) implements defensive focus-loss hooks:
   - **Tab-Switch Monitors**: Fires warning toast alerts if the student switches tabs or minimizes the window. The engine can be configured to auto-submit the exam after a specified number of focus-loss violations.
   - **Clipboard Copy/Paste Block**: Disables right-clicks and the key combinations `Ctrl+C` / `Ctrl+V` on exam texts, preventing students from pasting questions into external translation or AI systems.
3. **Weak-Network Resilience**:
   During peak concurrent testing (e.g. 400+ concurrent students), network drops are common. The engine caches the exam state locally and implements:
   - **6 Submit Retries**: Capped at 8-second intervals.
   - **Offline Submit Queue**: If the network is entirely offline, submissions are saved to a local queue. The app flushes this queue automatically upon the next internet reconnect.

---

## 2. Dynamic Question Formats & Parsing

The engine handles **17 distinct question formats** parsed from JSON or CSV structures. It supports complex cognitive evaluations:

| Code / ID | Question Type | Evaluation Logic & Grading |
| :--- | :--- | :--- |
| `mcq` | Multiple Choice | Standard 1-of-N match. Case-insensitive string trim comparison. |
| `msq` | Multi-Select | Evaluates whether all selected choices match the answers array exactly. |
| `num` | Numerical Input | Supports exact decimal matches or range-based boundaries. |
| `as_re` | Assertion-Reason | Evaluates statements and their causal link (e.g., Assertion true, Reason is correct explanation). |
| `matrix` | Matrix Grid | Evaluates rows mapping to multi-column cells. |
| `fill` | Fill-in-the-Blanks | Trimmed comparison. Supports multiple blanks using structured regex. |

---

## 3. The AI CSV Prompt Generator (`cbt-prompts.html`)

To eliminate the need for premium third-party AI APIs (which incur monthly fees), SchoolConnect utilizes a **Bring-Your-Own-AI** strategy.

### Structure of Prompt Templates:
The `cbt-prompts.html` interface provides copyable prompts:
- **Simple Prompt**: Formulates standard multiple-choice and fill-in-the-blank questions.
- **Intermediate Prompt**: Structures numerical and multi-select question sheets.
- **Advanced Prompt**: Builds assertion-reasoning, code matching, and case-study JSON files.

These prompts instruct external LLMs (such as ChatGPT, Claude, or Gemini) to output a formatted CSV bank that matches the exact column headers of SchoolConnect:
`question_text, option_a, option_b, option_c, option_d, correct_answer, question_type`

This allows teachers to generate custom question banks with zero cost.

---

## 4. Grading Mechanics & Report Card Flow

### Numerical Tolerance Logic:
Numerical questions often suffer from rounding errors (e.g., a student typing `3.33` instead of `3.3`). The engine incorporates a grading tolerance parser:
```javascript
// Example tolerance evaluation
const matches = Math.abs(studentAns - correctAns) <= (tolerance || 0.01);
```

### Academic Promotion Flow:
Upon completion, the engine logs candidate scores directly into `cbt_results`. If mapped, the database triggers an automated function (`cbt_push_to_reportcard`) that copies the final CBT score into the appropriate continuous assessment (CA) column for the student’s report card inside the `results` table.
- Admins can verify scores and override them if a student encountered technical issues.
- Integrated promotion triggers allow admins to set minimum passing benchmarks (e.g., average $> 50\%$) to promote passing students to the next class grade.
