# MSTR Forecast Calculator: Phased Development Plan

## 1. Project Overview

**Goal:** To upgrade our MSTR Stock Price Forecaster from a static prototype into a dynamic, database-driven web application that learns from fresh data daily.

**Your Role:** You will build the backend architecture to support this evolution. This involves creating a system for data ingestion, automated model retraining, and serving the updated model predictions to the existing user interface. The project is structured in five distinct phases, moving from environment setup to a fully automated pipeline ready for orchestration by the Stagehand MCP Server.

**Core Technologies:**
*   **IDE:** Windsurf IDE with Cascade AI Assistant
*   **Version Control:** GitHub MCP
*   **Backend:** Python (Flask)
*   **Database & Storage:** Supabase
*   **Data Science:** Pandas, Scikit-learn
*   **Frontend:** HTML, CSS, JavaScript (provided)

---

## 2. Core Architecture Guidelines

The application must be architected in a modular way to separate concerns and ensure future scalability.

*   **Frontend (UI):** A single-page HTML application. **The visual design must not be changed.**
*   **Backend API (Flask):** A lightweight Python API serving as the central hub.
*   **Model Training Service:** A standalone Python script (`train_model.py`).
*   **Database & Storage (Supabase):** Will host our core data and raw file archives.

---

## 3. Phased Development Plan

Please complete the following phases in order, paying close attention to any pause instructions.

### Phase 0: Development Environment & Repository Setup

**Goal:** Establish the complete development environment, version control repository, and necessary IDE integrations before any application code is written.

**Key Tasks:**
1.  **Launch Windsurf IDE:** Open your development environment.
2.  **Install GitHub MCP using Cascade:** Use the IDE's AI assistant, Cascade, to install and configure the GitHub MCP extension. You can use a prompt like the following in the IDE's command palette:
    > `Cascade, please install the GitHub MCP integration and authenticate my GitHub account.`
3.  **Create a New Project Repository:** Once the integration is complete, instruct Cascade to create and clone your project repository.
    > `Cascade, create a new private GitHub repository named 'mstr-calculator-app'. Initialise it with a README.md, a Python .gitignore file, and clone it locally.`
4.  **[CRITICAL] Await Further Instructions:**
    > After the repository is successfully created and cloned, **do not proceed to the next phase.** Please notify your project lead. A pull request from another platform needs to be merged into the `main` branch before you begin development. You will be notified when it is safe to proceed to Phase 1.

### Phase 1: Foundational Calculator with a Static Model

**Goal:** Build the basic application structure with the frontend fetching model data from a backend API.

**Prerequisites:** You have received confirmation to proceed after the initial repository setup in Phase 0.

**Key Tasks:**
1.  **Set Up Project Structure & Environment:**
    *   Inside your cloned repository, create a Python virtual environment.
    *   Install the necessary libraries:
      ```bash
      pip install flask pandas scikit-learn supabase python-dotenv
      ```
    *   Create a `.env` file for your environment variables.
2.  **Set Up Supabase Project:**
    *   Create a new project in Supabase.
    *   Add your Supabase URL and Service Key to the `.env` file.
    *   In the Supabase Table Editor, create the following two tables:

      **Table 1: `mstr_historical_data`**
      | Column Name  | Data Type   | Notes                      |
      | :----------- | :---------- | :------------------------- |
      | `id`         | `int8`      | Primary Key, auto-incrementing. |
      | `timestamp`  | `timestamptz` | The date of the data record. |
      | `close`      | `float8`    | MSTR closing price.        |
      | `btc_price`  | `float8`    | Bitcoin price.             |
      | `m_nav`      | `float8`    | M-NAV value.               |

      **Table 2: `model_coefficients`**
      | Column Name   | Data Type   | Notes                      |
      | :------------ | :---------- | :------------------------- |
      | `id`          | `int8`      | Primary Key (only one row). |
      | `intercept`   | `float8`    | Model's intercept value.  |
      | `btc_coeff`   | `float8`    | BTC price coefficient.   |
      | `mnav_coeff`  | `float8`    | M-NAV coefficient.       |
      | `last_updated`| `timestamptz` | Timestamp of last retraining.|

3.  **Build the Backend API (Flask):**
    *   Create your Flask application.
    *   Create an API endpoint at `/api/coefficients`.
    *   For this phase, this endpoint will return a **hard-coded JSON object** with pre-calculated model coefficients.
4.  **Connect the Frontend:**
    *   Use the provided `calculator_ui.html` file.
    *   Modify its `<script>` section to fetch coefficients from your new `/api/coefficients` endpoint.

### Phase 2: Manual Spreadsheet Upload and Automatic Retraining

**Goal:** Implement the manual data upload feature which automatically triggers the model retraining process.

**Key Tasks:**
1.  **Create a File Upload Endpoint:**
    *   In your Flask app, create a new administrator-only endpoint (e.g., `/upload`).
    *   This page will contain a simple form that accepts `.csv` files.
2.  **Develop the Data Ingestion Logic:**
    *   When a file is submitted, the backend must:
        a. **Validate:** Confirm it's a valid CSV with `close`, `btc_price`, and `m_nav` columns.
        b. **Archive:** Upload the raw spreadsheet to a bucket in **Supabase Storage**.
        c. **Process:** Use `pandas` to extract and clean the data.
        d. **Store Data:** Insert the new, cleaned rows into the `mstr_historical_data` table in Supabase.
        e. **Trigger Retraining:** Call `train_model.py` as a non-blocking `subprocess`.
3.  **Update the Model Training Service (`train_model.py`):**
    *   Refactor `model_prototype.py` to connect to Supabase.
    *   It must fetch the **entire** dataset from `mstr_historical_data`, retrain the model, and update the **single row** in the `model_coefficients` table.
4.  **Update the API:**
    *   Modify `/api/coefficients` to query the `model_coefficients` table and return the latest values.

### Phase 3: Synthetic Data Generation and User Verification

**Goal:** Create a testing tool and add a UI feature for non-technical users to verify model updates.

**Key Tasks:**
1.  **Create a Synthetic Data Generator (`generate_synthetic_data.py`):**
    *   Build a standalone Python script to generate a CSV file with the correct headers.
    *   Use a simple, predictable pattern (e.g., `close = (btc_price / 100) + (m_nav * 10)`).
2.  **Implement User Verification:**
    *   Ensure `/api/coefficients` returns the `last_updated` timestamp.
    *   In `index.html`, add a small footer element to display this timestamp in a readable format.
3.  **Perform End-to-End Test:**
    *   Generate a synthetic spreadsheet.
    *   Upload it via the `/upload` endpoint.
    *   Reload the calculator and confirm the timestamp has updated and the forecasts have changed as expected.

### Phase 4: Prepare for Stagehand MCP Server Automation

**Goal:** Finalise the architecture for automated execution by the Stagehand MCP Server.

**Key Tasks:**
1.  **Create an Automation Script (`fetch_and_upload.py`):**
    *   Develop a Python script that programmatically:
        1.  Downloads the spreadsheet from `https://www.strategy.com/data`.
        2.  Sends this file via an HTTP POST request to your `/upload` endpoint.
    *   This script simulates the manual upload process and is what Stagehand will eventually run.
2.  **Document Final Scripts:**
    *   Ensure all Python scripts are well-commented and can be executed from the command line without manual input.
    *   Update the `README.md` file to include commands for running the application and all related scripts in a local development environment.