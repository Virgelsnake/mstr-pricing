# MSTR Forecast Calculator

A dynamic, database-driven web application that forecasts MSTR stock prices based on Bitcoin price and M-NAV values.

## Project Overview

The MSTR Forecast Calculator is designed to predict MSTR stock prices using a linear regression model based on Bitcoin price and M-NAV values. This application features a Flask backend API connected to a Supabase database, with a clean and intuitive frontend interface.

## Features

- Interactive calculator UI for forecasting MSTR stock prices
- Backend API serving model coefficients
- Supabase database integration for data storage

## Prerequisites

- Python 3.8+
- Supabase account and project

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/mstr-calculator-app.git
   cd mstr-calculator-app
   ```

2. Create and activate a virtual environment:

   ```bash
   python -m venv .venv
   source .venv/bin/activate  # On Windows: .venv\Scripts\activate
   ```

3. Install dependencies:

   ```bash
   pip install -r requirements.txt
   ```

4. Set up environment variables:

   ```bash
   cp .env.template .env
   ```

   Edit the `.env` file and add your Supabase URL and Service Key.

## Configuration

Update the `.env` file with your Supabase credentials:

```env
SUPABASE_URL=your_supabase_url_here
SUPABASE_KEY=your_supabase_service_key_here
```

## Running the Application

1. Start the Flask server:

   ```bash
   python src/app.py
   ```

2. Open your browser and navigate to:

   ```text
   http://localhost:5001
   ```

## Project Structure

```text
├── .env                  # Environment variables (gitignored)
├── .env.template         # Template for environment variables
├── requirements.txt      # Python dependencies
├── src/
│   ├── app.py           # Flask application and API endpoints
│   └── train_model.py    # Model training script
└── templates/
    └── calculator_ui.html # Frontend calculator UI
```

## Database Structure

The application uses two main tables in Supabase:

1. `mstr_historical_data` - Stores historical price data
2. `model_coefficients` - Stores the trained model coefficients

## Development

This project is being developed in phases:

1. Phase 1: Foundational Calculator with a Static Model
2. Phase 2: Manual Spreadsheet Upload and Automatic Retraining
3. Phase 3: Synthetic Data Generation and User Verification
4. Phase 4: Stagehand MCP Server Automation
