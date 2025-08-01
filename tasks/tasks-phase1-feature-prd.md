## Relevant Files

- `src/app.py` - Main Flask application file with API endpoints
- `templates/calculator_ui.html` - Frontend calculator UI template
- `.env` - Environment variables for Supabase connection
- `requirements.txt` - Project dependencies
- `README.md` - Project documentation and setup instructions
- `tests/test_api.py` - Unit tests for the API endpoints

### Notes

- This task list is designed to be processed sequentially
- Run the Flask application with `python src/app.py` from the project root
- Ensure Supabase credentials are properly set in the .env file before connecting

## Tasks

- [x] 1.0 **Parent Task:** Set Up Project Structure & Environment
  - [x] 1.1 Create or update the Python virtual environment
  - [x] 1.2 Update requirements.txt with necessary dependencies: flask, pandas, scikit-learn, supabase, python-dotenv
  - [x] 1.3 Create .env file with placeholders for Supabase URL and Service Key
  - [x] 1.4 Update README.md with setup instructions and project overview

- [x] 2.0 **Parent Task:** Set Up Supabase Project & Database
  - [x] 2.1 Create a new Supabase project (if not already done)
  - [x] 2.2 Add Supabase URL and Service Key to the .env file
  - [x] 2.3 Create the `mstr_historical_data` table with required columns
  - [x] 2.4 Create the `model_coefficients` table with required columns
  - [x] 2.5 Add initial test data to the `model_coefficients` table

- [x] 3.0 **Parent Task:** Develop Flask Backend API
  - [x] 3.1 Create the basic Flask application structure in src/app.py
  - [x] 3.2 Initialize Supabase client using environment variables
  - [x] 3.3 Implement the `/api/coefficients` endpoint (fetching from database instead of hard-coded)
  - [x] 3.4 Create a route to serve the calculator UI HTML file
  - [x] 3.5 Add error handling for API endpoints and database connections
  - [x] 3.6 Configure the Flask app to run on port 5001

- [x] 4.0 **Parent Task:** Integrate Frontend Calculator UI
  - [x] 4.1 Create or update the calculator_ui.html template
  - [x] 4.2 Add JavaScript to fetch coefficients from the `/api/coefficients` endpoint
  - [x] 4.3 Implement error handling for API requests
  - [x] 4.4 Update the calculator logic to use the fetched coefficients
  - [x] 4.5 Add a loading state while fetching data

- [ ] 5.0 **Parent Task:** Testing & Validation
  - [ ] 5.1 Create unit tests for the `/api/coefficients` endpoint
  - [ ] 5.2 Test the frontend-backend integration
  - [ ] 5.3 Verify that the calculator correctly uses the model coefficients
  - [ ] 5.4 Test error handling scenarios
  - [ ] 5.5 Document any issues or edge cases discovered during testing
