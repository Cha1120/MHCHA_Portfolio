# AGENTS.md

## 1. Project Context & Goal
- **Goal:** Build a 1-page portfolio website for an entry-level SAP ABAP developer to showcase technical skills and business process understanding (FI/SD/MM).
- **Target Audience:** IT Recruiters, Senior SAP Developers.
- **Core Competencies:**
  1. Solid understanding of SAP FI module business processes.
  2. Practical coding skills: CBO development, Custom T-Code design, ALV reports.
  3. Business analysis and problem-solving skills.

## 2. Design System
- **Color Palette:**
  - **Primary:** Deep Navy (`#0F172A` or `#1E3A8A`) for a trustworthy, enterprise feel.
  - **Secondary:** Accent Blue (`#2563EB`) or Slate Gray (`#475569`).
  - **Background:** White (`#FFFFFF`) and Light Gray (`#F8FAFC`).
  - **Text:** Dark Charcoal (`#1E293B`).
- **Typography:** Modern, highly legible Sans-Serif (e.g., Pretendard, Noto Sans KR, Inter).
- **Layout:** Modern 1-page scroll with card-based UI.

## 3. Page Structure
### Section 1: Hero
- **Background:** Deep Navy.
- **Text:**
  - Title: "Connecting Business Logic with Code"
  - Subtitle: "Entry-level SAP ABAP Developer specializing in FI Module."
- **Buttons:** "View Projects", "Download Resume" (Add soft hover animations).

### Section 2: About & Skills
- **About:**
  - Major: Dept. of Enterprise Software, Konyang University.
  - Vision: "A developer who understands data flow and corporate value chains beyond simple coding."
- **Skills (Tags or Progress Bars):**
  - **Core:** SAP ABAP, ALV Report, CBO Development, BDC/BAPI.
  - **Domain:** FI/SD/MM Business Processes, System Analysis.
  - **Web:** HTML5, CSS3, JavaScript, Git/GitHub.

### Section 3: Projects
- **UI:** Horizontal cards (stack vertically on mobile). Soft shadows, hover effects (float up).
- **Project 1: Custom FI Payment Solution (Capstone Design)**
  - Role: FI Module Custom Development.
  - Details: Designed `ZNS_FI_INPAY` and `ZNS_FI_OTPAY`. Implemented ALV reports for data verification and managed data integrity for incoming/outgoing payments.
- **Project 2: Eco-Bio Business Model Analysis (Participation Prize)**
  - Role: Value Chain Analyst.
  - Details: Analyzed the marine bio-cluster business model of Eco-Bio Research Institute. Demonstrated ability to understand manufacturing processes and IT solution proposals.

### Section 4: Contact
- **UI:** Simple footer.
- **Content:** Email, GitHub link.

## 4. Technical Constraints
- **Tech Stack:** HTML5, CSS3, Vanilla JavaScript.
- **File Structure:** Use a main `index.html`. CSS and JS can be inline or separated (`style.css`, `app.js`) depending on the prompt workflow.
- **Responsiveness:** Must be mobile-friendly (Mobile-first approach, min-width 375px).
- **Encoding:** `UTF-8` to prevent Korean text encoding issues.
- **Animations:** Subtle interactions (e.g., smooth scroll, fade-in on scroll, gentle button hovers). Do not overcomplicate.

## 5. AI Agent Rules (Vibe Coding Instructions)
- Always maintain the Deep Navy/Trustworthy theme.
- Do not write the entire code at once. Divide tasks (e.g., "Build Hero section first, wait for review").
- Automatically fill in the actual Korean text content provided in this document when requested to "build the skeleton".
- Act as an expert frontend developer translating these requirements into clean, semantic code.