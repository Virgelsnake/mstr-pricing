# 🚀 Mastering AI-Assisted Development in Windsurf 🤖

### A Best-Practise Guide for Collaborating with Cascade

Welcome! This document outlines a structured workflow for building features within the **Windsurf IDE** by effectively collaborating with its AI assistant, **Cascade**.

By following this guide, you can systematically approach development tasks, from initial requirements to final implementation, with built-in checkpoints for verification. This method helps you move beyond monolithic AI requests and start guiding your AI partner step-by-step for superior results.

## ✨ The Core Idea

Building complex features with AI can sometimes feel like a black box. This workflow brings structure, clarity, and control to the process by breaking it down into logical phases:

1.  **Define Scope:** Clearly outline what needs to be built with a Product Requirement Document (PRD).
2.  **Plan the Work:** Break down the PRD into a granular, actionable task list that will serve as our project backlog.
3.  **Implement Iteratively:** Guide Cascade to tackle one task at a time, allowing you to review and approve each incremental change.

This structured approach ensures Cascade stays on track, makes it easier to debug issues, and gives you full confidence in the final code.

## The Structured Workflow: From Concept to Code 💡➡️💻

Here's the step-by-step process. We recommend using Markdown files as "workflow templates" to store and reuse your key prompts for Cascade.

### 1️⃣ Phase 1: Create a Product Requirement Document (PRD)

First, lay out the blueprint for your feature. A PRD clarifies what you're building, for whom, and why. You can use Cascade to help generate a solid first draft.

1.  **Create a prompt file** for generating PRDs. Let's call it `create-prd-template.md`. This file tells Cascade how to structure a PRD.
2.  In Cascade's chat panel, initiate the PRD creation:

    > **Your Prompt to Cascade:**
    > "Use `@create-prd-template.md`. The feature I want to build is [Describe your feature in detail]. Use these files for context: [Optional: @file1.py @file2.ts]"

    ***Tip:*** *If Cascade offers a high-quality or advanced generation mode, it's highly recommended for comprehensive tasks like creating a PRD.*

### 2️⃣ Phase 2: Generate Tasks from Your PRD

Once you are satisfied with your PRD, the next step is to break it down into actionable tasks.

1.  **Create a task generation prompt file**, for example `generate-tasks-template.md`.
2.  In Cascade's chat panel, reference your newly created PRD to generate a task list:

    > **Your Prompt to Cascade:**
    > "Now, take `@MyFeature-PRD.md` and create a detailed, step-by-step task list using the instructions in `@generate-tasks-template.md`."

    *(Note: Replace `@MyFeature-PRD.md` with the actual filename of the PRD you created in the previous step.)*

### 3️⃣ Phase 3: Implement Tasks Iteratively

With a well-structured task list, you now have a clear roadmap. To ensure methodical progress, we will instruct Cascade to focus on **one task at a time** and wait for your approval before proceeding.

1.  **Create a task processing prompt file**, for example `process-task-template.md`. This is the most important file in the workflow. It will instruct Cascade to:
    *   Address only the specified task number.
    *   Make the necessary code changes.
    *   Mark the task as complete in the list using an emoji (e.g., ✅).
    *   **Crucially, it must wait for your "yes" or "proceed" command before starting the next task.**

2.  In Cascade's chat panel, begin the implementation with the first task:

    > **Your Prompt to Cascade:**
    > "Please start on task 1.1 from `@MyFeature-TaskList.md` and follow the instructions in `@process-task-template.md`."

    *(Important: You only need to reference `@process-task-template.md` for the *first* task. The instructions within it will guide Cascade for all subsequent tasks in the list.)*

### 4️⃣ Phase 4: Review, Approve, and Progress ✅

As Cascade completes each task, you review the changes.

*   If the code is correct, simply reply with **"yes"** or **"proceed"**. Cascade will then automatically move to the next task in the list.
*   If changes are needed, provide corrective feedback (e.g., "That's good, but can you refactor the function to also handle X?"). Cascade will amend its work on the current task before asking for approval again.

You will see a satisfying list of completed items grow, providing a clear visual of your feature coming to life. While not always perfect, this method has proven to be a very reliable way to build out larger features with AI assistance.

## 🗂️ Key Workflow Templates to Create

You should create your own versions of these `.md` files to store your preferred prompts.

*   **`prd-generation-template.md`**: Your custom prompt for generating a Product Requirement Document.
*   **`task-breakdown-template.md`**: Your prompt for breaking a PRD down into a detailed, step-by-step implementation plan.
*   **`iterative-task-processor.md`**: Your most important prompt. It instructs Cascade on how to process the task list, tackling one task at a time, marking it as complete, and waiting for your approval before proceeding.

## 🌟 Benefits of This Workflow

*   **Structured Development:** Enforces a clear process from idea to code.
*   **Step-by-Step Verification:** Allows you to review and approve AI-generated code at each small step, ensuring quality and control.
*   **Manages Complexity:** Breaks down large features into smaller, digestible tasks for the AI, reducing the chance of it getting lost or generating incorrect code.
*   **Improved Reliability:** Offers a more dependable approach to leveraging AI for significant development work compared to single, large prompts.
*   **Clear Progress Tracking:** Provides a visual representation of completed tasks, making it easy to see how much has been done and what's next.

## 💡 Tips for Success

*   **Be Specific:** The more context and clear instructions you provide, the better Cascade's output will be.
*   **Use High-Quality Generation Modes:** If Cascade offers a more advanced or thorough generation mode, consider using it for complex initial documents like a PRD.
*   **Reference Relevant Files:** Always use the `@` symbol to give Cascade context by referencing existing files in your project.
*   **Patience and Iteration:** AI is a powerful tool, but it's not magic. Be prepared to guide, correct, and iterate. This workflow is designed to make that process smoother.

## 🤝 Contributing

This is a living document. If you have ideas to improve this workflow, please feel free to open an issue or submit a pull request with your enhancements.

---

Happy AI-assisted developing!