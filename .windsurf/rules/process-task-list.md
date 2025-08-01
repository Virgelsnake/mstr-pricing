---
trigger: manual
---

# Cascade Workflow Template: Processing an Implementation Task List

## Goal

To provide you, Cascade, with a clear, iterative, and verifiable process for implementing a feature based on a pre-defined task list. Your primary role is to act as a pair programmer, executing one task at a time and waiting for my approval before proceeding.

---

## Core Operating Principles

You must adhere to these three principles at all times:

1.  **One Sub-Task at a Time:** You will only work on the *next single uncompleted sub-task* in the list. Do not work ahead.
2.  **Wait for Approval:** After completing a sub-task, you **must stop** and wait for my explicit confirmation (e.g., "yes," "proceed," "continue") before starting the next one.
3.  **Update the Task List File:** You are to treat the referenced task list `.md` file as the single source of truth for our progress. You will update it directly after each step.

---

## Your Step-by-Step Implementation Workflow

When I ask you to begin working on a task list, you will enter the following loop:

**Step 1. Identify and Announce the Next Sub-Task**
   - Find the first sub-task in the list that is not marked with `[x]`.
   - Announce which task you are about to start. For example:
     > "Now starting task 1.1: Create the basic Flask app structure with a `/api` blueprint."

**Step 2. Implement the Code Changes**
   - Write or modify the code necessary to complete *only* that sub-task.

**Step 3. Mark the Sub-Task as Complete**
   - After the implementation is done, immediately update the task list file by changing the sub-task's `[ ]` to `[x]`.

**Step 4. Check for Parent Task Completion**
   - Look at all the sub-tasks under the current parent task.
   - **If any sub-tasks are still incomplete (`[ ]`):**
     - Announce your completion and ask for permission to continue. For example:
       > "Task 1.1 is complete. The task list has been updated. Ready to proceed?"
     - **Then, you must stop and wait for my response.**
   - **If ALL sub-tasks for the parent are complete (`[x]`):**
     - Proceed to the **Parent Task Completion Protocol** below.

---

## Parent Task Completion Protocol

You will execute this protocol only when all sub-tasks under a parent task are marked as complete.

**1. Announce Completion:**
   - State that the entire parent task is now finished.
     > "All sub-tasks for Parent Task 1.0 are complete."

**2. Run All Tests:**
   - Execute the project's entire test suite to ensure no regressions were introduced.
   - Announce the result. For example:
     > "Running the test suite (`pytest`)... All tests passed."

**3. Create a Git Commit (Only if Tests Pass):**
   - Stage all changes using `git add .`.
   - Create a single, well-formatted commit using the conventional commit standard. Use the following template for your commit message:

     ```
     feat: [Summary of Parent Task Goal]
     
     - Implemented [Sub-task 1.1 Description].
     - Added [Sub-task 1.2 Description].
     - Updated the API to handle the new logic.
     
     Completes Task: 1.0
     ```
   - Announce that the changes have been committed.

**4. Mark the Parent Task as Complete:**
   - Update the task list file by changing the parent task's `[ ]` to `[x]`.

**5. Request to Proceed:**
   - Announce that the parent task is now fully complete and committed.
   - Ask for permission to start the **first sub-task of the next parent task**. For example:
     > "Parent task 1.0 is now complete and committed. Ready to proceed with task 2.1?"
   - **Then, you must stop and wait for my response.**

---

## Summary of Your Instructions for Cascade

-   You will be given a `.md` file containing a list of tasks.
-   Your job is to execute the sub-tasks one by one.
-   After each sub-task, you will mark it as complete (`[x]`) in the file and ask me for permission to continue.
-   When an entire parent task section is complete, you will run tests, commit the changes with a descriptive message, mark the parent task as complete, and then ask for permission to move to the next section.
-   This loop continues until all tasks are marked as `[x]`.