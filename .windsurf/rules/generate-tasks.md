---
trigger: manual
---

# Cascade Workflow Template: Generating a Task List from a PRD

## Goal

To guide Cascade, the AI assistant in the Windsurf IDE, in creating a detailed, step-by-step task list in Markdown format based on an existing Product Requirements Document (PRD). The task list should be structured to guide a junior developer through the implementation phase logically and methodically.

---

## The Process: Your Step-by-Step Instructions

This document provides Cascade with a clear, sequential process to follow.

**1. Receive the PRD File:**
   - The user will provide a reference to a specific PRD file (e.g., `@prd-feature-name.md`).

**2. Analyse the PRD:**
   - Thoroughly read and analyse the functional requirements, user stories, and technical considerations outlined in the provided PRD.

**3. Phase 1: Generate High-Level Parent Tasks:**
   - Based on your analysis, generate the main, high-level tasks required to implement the feature or application. A typical project will have between 3 to 7 parent tasks.
   - Present these high-level tasks to the user first.
   - **You must use the following prompt to ask for user confirmation before proceeding:**

   > "I have generated the high-level tasks based on the PRD. Ready to generate the detailed sub-tasks? Please respond with 'Go' to proceed."

**4. Wait for User Confirmation:**
   - **Crucial Step:** Pause all further actions and wait for the user to respond with "Go". Do not generate sub-tasks until you receive this confirmation.

**5. Phase 2: Generate Detailed Sub-Tasks:**
   - Once the user confirms, proceed to break down each parent task into smaller, actionable sub-tasks.
   - These sub-tasks should be granular enough for a junior developer to implement one at a time. For example, a sub-task could be "Create a new API endpoint at `/api/data`" or "Add a button component to the main dashboard."

**6. Identify Relevant Files and Provide Notes:**
   - Based on the complete task list, identify all potential files that will need to be created or modified.
   - List these files under a `Relevant Files` section. For each file, include a brief description of its purpose. It is a best practice to include corresponding test files.
   - Add a `Notes` section for any important development context, such as commands for running tests.

**7. Assemble and Save the Final Task List:**
   - Combine the parent tasks, sub-tasks, relevant files, and notes into a single Markdown document using the **Required Output Format** specified below.
   - Save the generated document in the `/tasks/` directory with the filename `tasks-[prd-file-name].md`, where `[prd-file-name]` matches the base name of the input PRD file.

---

## Required Output Format

The generated task list **must** follow this structure precisely. This format is critical for the next step in our workflow, where Cascade will be asked to process this list one item at a time.

```markdown
## Relevant Files

- `src/api/routes.py` - Will contain the main Flask API endpoints.
- `src/services/model_trainer.py` - The standalone script for retraining the model.
- `src/static/index.html` - The main frontend file that will be updated.
- `tests/test_api.py` - Unit tests for the API endpoints.

### Notes

- This task list is designed to be processed sequentially.
- Use `pytest` to run all tests from the root directory.

## Tasks

- [ ] 1.0 **Parent Task:** Set Up the Initial Flask Application
  - [ ] 1.1 Create the basic Flask app structure with a `/api` blueprint.
  - [ ] 1.2 Implement the `/api/coefficients` endpoint to return static, hard-coded JSON.
- [ ] 2.0 **Parent Task:** Integrate with the Frontend
  - [ ] 2.1 Modify the JavaScript in `index.html` to fetch data from the `/api/coefficients` endpoint.
  - [ ] 2.2 Ensure the calculator populates correctly with the fetched data on page load.
- [ ] 3.0 **Parent Task:** Develop the Data Upload and Processing Logic
  - [ ] 3.1 Create the `/upload` endpoint with a file input form.
  - [ ] 3.2 Implement file validation to check for correct format and required columns.