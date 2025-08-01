---
trigger: manual
---

# Cascade Workflow Template: Generating a Product Requirements Document (PRD)

## Goal

To guide Cascade, the AI assistant in the Windsurf IDE, in creating a detailed and actionable Product Requirements Document (PRD) in Markdown format. This process ensures clarity for the development team, especially junior developers, by systematically gathering requirements before any code is written.

---

## The Process: Your Step-by-Step Instructions

This document provides Cascade with a clear, sequential process to follow.

**1. Receive the User's Initial Request:**
   - The user will provide a high-level description of a new application or feature they want to build.

**2. Determine the Scope (Application vs. Feature):**
   - **This is your first and most important action.** Before doing anything else, you must ask the user the following question to determine the scope of the project:

   > **"Are we building a completely new application from scratch, or are we adding a new feature to an existing project?"**

   - The user's answer will determine which set of clarifying questions you ask next.

**3. Ask Tailored Clarifying Questions:**
   - Based on the user's answer in the previous step, proceed to ask questions from the appropriate section in the "Clarifying Questions Framework" below.
   - **Rule:** Always present options in a numbered or lettered list so the user can respond easily and precisely.

**4. Review Provided Context Files:**
   - After receiving answers, review any context files the user has provided (e.g., `@draft_prd.md`, `@tech_specs.txt`).
   - Your goal is to extract relevant details to enrich the PRD and avoid asking redundant questions.

**5. Generate the PRD:**
   - Synthesise all the information from the initial prompt, the user's answers, and the context files.
   - Generate a comprehensive PRD using the **Standard PRD Structure** defined below.

**6. Save the PRD:**
   - Save the generated document as `prd-[project-or-feature-name].md` inside a `/tasks` directory.

---

## Clarifying Questions Framework

### If Building a **NEW APPLICATION**, ask questions about:

*   **Primary Goal:** "What is the main problem this application will solve for its users?"
*   **Target Audience:** "Who are the primary users of this application? (e.g., data analysts, project managers, general consumers)"
*   **Core Components:** "What are the 3-5 essential components or pages this application must have for its first version? (e.g., Dashboard, User Profile, Settings, Upload Page)"
*   **Key User Journey:** "Can you describe the most critical workflow a user will perform? (e.g., User logs in -> uploads a file -> sees a result on the dashboard)"
*   **Success Metrics:** "How will we measure the success of this application? (e.g., number of daily active users, files processed per day)"
*   **Technology & Data:** "Are there any known technical constraints or specific data sources we need to consider?"

### If Adding a **NEW FEATURE**, ask questions about:

*   **User Story:** "Can you provide a user story for this feature? (e.g., As a [user type], I want to [action] so that I can [benefit].)"
*   **Specific Functionality:** "What are the key actions the user must be able to perform with this feature? Please list them."
*   **Acceptance Criteria:** "How will we know this feature is working correctly? What are the success criteria? (e.g., User can upload a CSV, the data is saved, the model is retrained)."
*   **Integration Points:** "Which existing parts of the application will this feature interact with or modify?"
*   **Scope & Boundaries (Non-Goals):** "To manage scope, are there any specific things this feature *should not* do?"
*   **Design & UI:** "Are there any existing UI mockups or design components we should use for this feature?"

---

## Standard PRD Structure

The generated PRD must include the following sections. Tailor the content to be more high-level for a new application and more specific for a feature.

1.  **Overview:** A brief description of the project/feature and the problem it solves.
2.  **Goals:** A list of specific, measurable objectives.
3.  **User Stories & Personas:** Who this is for and how they will use it.
4.  **Functional Requirements:** A numbered list of the specific functionalities the system must have. (e.g., "1.1. The system must allow users to upload a CSV file.").
5.  **Non-Goals (Out of Scope):** Clearly state what will not be included to manage expectations.
6.  **Design Considerations (Optional):** Link to mockups, describe UI/UX requirements.
7.  **Technical Considerations (Optional):** Mention known constraints, dependencies, or integration points.
8.  **Success Metrics:** How the success of the project/feature will be measured.
9.  **Open Questions:** A list of any remaining questions for the project lead.

---

## Final Output

-   **Format:** Markdown (`.md`)
-   **Location:** A `/tasks` directory is recommended.
-   **Filename:** `prd-[project-or-feature-name].md`

---

## Summary of Your Instructions for Cascade

1.  Acknowledge the user's prompt.
2.  Ask the user to clarify if you are building a **new application** or adding a **new feature**.
3.  Based on their response, ask the relevant set of **clarifying questions**.
4.  Wait for the user's answers.
5.  Incorporate the user's answers and any information from provided context files.
6.  Generate the PRD in Markdown format using the structure defined above.
7.  Save the PRD file with the correct naming convention.
8.  **Stop and wait for the next command** (e.g., to generate tasks from the new PRD). Do not proceed with implementation.