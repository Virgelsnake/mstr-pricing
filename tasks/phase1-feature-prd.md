# Product Requirements Document (PRD): MSTR Forecast Calculator - Phase 1

## 1. Overview
This PRD outlines the requirements for Phase 1 of the MSTR Forecast Calculator project: "Foundational Calculator with a Static Model." This phase focuses on establishing the basic application structure with a frontend that fetches model data from a backend API, setting up the Supabase database, and implementing the initial Flask application.

## 2. Goals
- Set up the foundational project structure and environment
- Establish a Supabase project with required database tables
- Build a basic Flask backend API with a static model endpoint
- Connect the frontend calculator UI to the backend API

## 3. User Stories & Personas

### Primary User: Financial Analyst
- **User Story:** As a financial analyst, I want to use the MSTR Stock Price Forecaster to predict stock prices based on Bitcoin price and M-NAV values, so I can make informed investment decisions.

### Secondary User: Administrator
- **User Story:** As an administrator, I want to ensure the calculator is properly connected to the backend API, so users can access accurate forecasting data.

## 4. Functional Requirements

### 4.1 Project Structure & Environment
4.1.1. Create a Python virtual environment within the cloned repository
4.1.2. Install required libraries: flask, pandas, scikit-learn, supabase, python-dotenv
4.1.3. Create a .env file for environment variables

### 4.2 Supabase Setup
4.2.1. Create a new project in Supabase
4.2.2. Add Supabase URL and Service Key to the .env file
4.2.3. Create the `mstr_historical_data` table with the following columns:
   - `id` (int8, Primary Key, auto-incrementing)
   - `timestamp` (timestamptz)
   - `close` (float8)
   - `btc_price` (float8)
   - `m_nav` (float8)
4.2.4. Create the `model_coefficients` table with the following columns:
   - `id` (int8, Primary Key)
   - `intercept` (float8)
   - `btc_coeff` (float8)
   - `mnav_coeff` (float8)
   - `last_updated` (timestamptz)

### 4.3 Backend API (Flask)
4.3.1. Create a Flask application with appropriate configuration
4.3.2. Implement an API endpoint at `/api/coefficients` that returns a hard-coded JSON object with pre-calculated model coefficients
4.3.3. Create a route to serve the calculator UI HTML file

### 4.4 Frontend Integration
4.4.1. Use the provided `calculator_ui.html` file
4.4.2. Modify the JavaScript in the HTML to fetch coefficients from the `/api/coefficients` endpoint
4.4.3. Ensure the calculator UI correctly displays and uses the fetched coefficients

## 5. Non-Goals (Out of Scope)
- Implementing data upload functionality (reserved for Phase 2)
- Automated model retraining (reserved for Phase 2)
- Synthetic data generation (reserved for Phase 3)
- Stagehand MCP Server automation (reserved for Phase 4)
- Changing the visual design of the frontend UI

## 6. Design Considerations
- The frontend UI design is already provided and must not be changed
- The calculator should maintain its single-page application structure
- The UI should gracefully handle API errors

## 7. Technical Considerations
- The Flask application should be configured to run on port 5001
- The Supabase client should be properly initialized using environment variables
- The API should return properly formatted JSON responses with appropriate HTTP status codes
- Error handling should be implemented for database connection issues

## 8. Success Metrics
- The Flask application successfully starts and serves the calculator UI
- The `/api/coefficients` endpoint returns the expected JSON data
- The frontend calculator successfully fetches and displays the coefficient data
- Users can input values and receive calculated forecasts based on the model coefficients

## 9. Open Questions
- What are the initial hard-coded coefficient values to use for the static model?
- Are there any specific error messages that should be displayed to users?
- What is the expected format for the JSON response from the `/api/coefficients` endpoint?
