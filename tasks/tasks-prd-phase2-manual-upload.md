## Relevant Files

- `app.py` - Will be modified to add the `/upload` route and its associated logic.
- `train_model.py` - Will be invoked by the backend; may need review to ensure it correctly reads from the database.
- `templates/upload.html` - New file for the admin upload interface.
- `static/js/upload.js` - New JavaScript for handling the upload form submission.
- `templates/calculator_ui.html` - Will be modified to display the `last_updated` timestamp.
- `static/js/calculator.js` - Will be modified to fetch and display the `last_updated` timestamp.
- `tests/test_app.py` - New test file to add unit tests for the `/upload` endpoint functionality.

### Notes

- This task list is designed to be processed sequentially.
- Supabase credentials should be managed via environment variables and not hard-coded.
- Use `pytest` to run all tests from the root directory.

## Tasks

- [x] 1.0 **Parent Task:** Set Up Supabase Backend
  - [x] 1.1 Create a new Supabase Storage bucket named `market-data-uploads` for archiving raw CSV files.
  - [x] 1.2 Ensure the `mstr_historical_data` table exists with columns: `date`, `close`, `btc_price`, `m_nav`.
  - [x] 1.3 Ensure the `model_coefficients` table exists with columns: `coefficient_name`, `value`, and `last_updated`.

- [ ] 2.0 **Parent Task:** Build the Frontend Upload Page
  - [x] 2.1 Create a new HTML file `templates/upload.html`.
  - [x] 2.2 In `upload.html`, add a heading, a file input that accepts only `.csv` files, and a submit button.
  - [x] 2.3 In `upload.html`, add a designated area (e.g., a `<div>`) to display status and error messages.
  - [ ] 2.4 Style `upload.html` to match the existing Bitcoin-themed design.
  - [ ] 2.5 Create a new JavaScript file `static/js/upload.js`.
  - [ ] 2.6 In `upload.js`, implement a `fetch` request to handle the form submission to the `/upload` endpoint.
  - [ ] 2.7 In `upload.js`, implement logic to display the success or error messages returned from the backend.

- [ ] 3.0 **Parent Task:** Implement the Backend File Upload Logic
  - [ ] 3.1 Create a new Flask route `/upload` in `app.py` that handles both `GET` and `POST` requests.
  - [ ] 3.2 In the `POST` handler, validate that the uploaded file has a `.csv` extension. Return a specific JSON error if not.
  - [ ] 3.3 Parse the CSV and validate that it contains the required columns: `close`, `btc_price`, `m_nav`. Return a specific JSON error if not.
  - [ ] 3.4 If validation passes, upload the original CSV file to the `market-data-uploads` Supabase Storage bucket.
  - [ ] 3.5 Parse the validated data and insert the new records into the `mstr_historical_data` table.

- [ ] 4.0 **Parent Task:** Integrate Automated Model Retraining
  - [ ] 4.1 After successfully inserting the data, use Python's `subprocess` module in `app.py` to trigger `train_model.py` as a non-blocking process.
  - [ ] 4.2 Return a success JSON message to the frontend indicating the upload was successful and retraining has started.
  - [ ] 4.3 Modify the `/api/coefficients` endpoint to include the `last_updated` timestamp from the `model_coefficients` table.
  - [ ] 4.4 Update the main calculator's frontend JavaScript (`static/js/calculator.js`) to fetch and display the `last_updated` timestamp in the page footer.
