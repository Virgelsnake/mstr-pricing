# PRD: Phase 2 - Manual Spreadsheet Upload and Automatic Retraining

## 1. Overview

This document outlines the requirements for Phase 2 of the MSTR Forecast Calculator project. The goal is to implement a feature that allows an administrator to manually upload a CSV file containing new market data. This action will trigger an automated process to retrain the forecasting model and update the coefficients served by the API, ensuring the calculator reflects the latest information.

## 2. Goals

- To create a secure, internal-facing web page for manual data uploads.
- To automate the model retraining process upon the submission of new data.
- To seamlessly update the production model coefficients used by the public-facing calculator.
- To create a permanent archive of all uploaded raw data for auditing and future analysis.

## 3. User Stories & Personas

- **Primary User Story (Administrator):** "As an Administrator, I want to manually upload the latest daily data spreadsheet through a secure web page, so that the forecasting model is automatically retrained with the most current market information."

## 4. Functional Requirements

### 4.1. Admin Upload Interface

- **4.1.1.** The system must provide a dedicated, secure web page at the `/upload` endpoint.
- **4.1.2.** The page must contain a standard HTML file input field that accepts files with a `.csv` extension.
- **4.1.3.** The page must include a "Upload" button to submit the selected file.
- **4.1.4.** The system must display a clear success message on the UI upon a successful upload and processing (e.g., "File uploaded. Model retraining initiated.").
- **4.1.5.** The system must display a specific error message if the uploaded file is not in `.csv` format.
- **4.1.6.** The system must display a specific error message if the uploaded `.csv` is missing any of the required columns (`close`, `btc_price`, `m_nav`).

### 4.2. Backend Data Processing

- **4.2.1.** Upon file submission, the backend must validate the file format and column headers.
- **4.2.2.** The backend must upload the original, validated `.csv` file to a designated bucket in Supabase Storage for archival.
- **4.2.3.** The backend must parse the data from the CSV and insert the new records into the `mstr_historical_data` table in the Supabase database.
- **4.2.4.** After successfully inserting the data, the backend must trigger the `train_model.py` script as a non-blocking subprocess to begin model retraining.

## 5. Non-Goals (Out of Scope)

- **Public Access:** The `/upload` page is for internal administrators only. A complex user authentication system is not required for this phase.
- **Data Manipulation:** The feature will not include functionality to edit or delete existing historical records.
- **Automatic Data Fetching:** Data acquisition is strictly limited to manual uploads.
- **Model Versioning:** The system will only maintain the single, most recently trained model. Previous model coefficients will be overwritten.

## 6. Design Considerations

- The `/upload` page must adhere to the existing Bitcoin-themed design (black background, orange/grey/white accents) of the main calculator UI to ensure a consistent administrative experience.
- The UI will be simple and functional, containing only a heading, a file input, a submit button, and a designated area for status/error messages.

## 7. Technical Considerations

- **Flask Backend:** A new route `/upload` will be added.
- **Supabase Database:** The feature will write to `mstr_historical_data` and update `model_coefficients`.
- **Supabase Storage:** A new storage bucket will be required to archive the raw CSV files.
- **Model Training Service:** The `train_model.py` script will be invoked as a subprocess by the Flask application.

## 8. Success Metrics (Acceptance Criteria)

### 8.1. Successful Upload Scenario

1.  An admin uploads a valid `.csv` file via the `/upload` page and receives a success message on the UI.
2.  The raw `.csv` file is present and unmodified in the Supabase Storage bucket.
3.  The new data rows from the file are present in the `mstr_historical_data` table.
4.  The `model_coefficients` table shows a new set of coefficients and an updated `last_updated` timestamp.
5.  The public calculator UI, after a refresh, displays the new `last_updated` timestamp in the footer.

### 8.2. Failed Upload Scenario

1.  An admin attempts to upload an invalid file (e.g., `.txt`, or a CSV with missing columns) and receives a specific, descriptive error message on the UI.
2.  No new file is created in the Supabase Storage bucket.
3.  No new rows are added to the `mstr_historical_data` table.
4.  The `model_coefficients` table remains unchanged.

## 9. Open Questions

- There are no open questions at this time.
