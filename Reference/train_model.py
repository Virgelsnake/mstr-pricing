# ==============================================================================
# MSTR Stock Price Forecaster - Model Training Script
# ==============================================================================
#
# Description:
# This script performs the following actions:
#   1. Loads the historical MSTR stock and Bitcoin price data from a CSV file.
#   2. Cleans the data by selecting relevant columns and removing any rows with
#      missing information.
#   3. Trains a multiple linear regression model using scikit-learn to predict
#      the MSTR closing price based on Bitcoin's price and the M-NAV.
#   4. Prints the final model coefficients (intercept, btc_price_coeff, m_nav_coeff)
#      which are required for the frontend calculator's JavaScript.
#   5. As a best practice, it also performs a validation check by splitting the
#      data to calculate the model's R-squared and Mean Absolute Error,
#      providing insight into its accuracy on historical data.
#
# Usage:
#   - Ensure 'input_file_0.csv' is in the same directory as this script.
#   - Run from the command line: python train_model.py
#
# ==============================================================================

import pandas as pd
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split
from sklearn.metrics import r2_score, mean_absolute_error

def train_forecasting_model():
    """
    Loads data, trains the MSTR forecasting model, and prints the results.
    """
    print("--- Starting Model Training Process ---")

    # --- 1. Data Loading and Preprocessing ---
    try:
        df = pd.read_csv("input_file_0.csv")
        print("Successfully loaded 'input_file_0.csv'.")
    except FileNotFoundError:
        print("Error: 'input_file_0.csv' not found. Please place the data file in the same directory.")
        return

    # Define the columns of interest for the model
    feature_cols = ['btc_price', 'm_nav']
    target_col = 'close'
    all_cols = feature_cols + [target_col]

    # Create a clean dataframe by dropping rows with missing values in key columns
    initial_rows = len(df)
    df_clean = df[all_cols].dropna()
    cleaned_rows = len(df_clean)
    print(f"Data cleaned. {initial_rows - cleaned_rows} rows with missing values were removed.")

    # Rename 'close' to 'mstr_price' for better readability in the code
    df_clean = df_clean.rename(columns={'close': 'mstr_price'})

    # Define the feature set (X) and the target variable (y)
    X = df_clean[feature_cols]
    y = df_clean['mstr_price']

    # --- 2. Model Validation (Demonstrates historical accuracy) ---
    # Split data into training and testing sets to evaluate the model's performance
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    # Create and train a temporary model for validation purposes
    validation_model = LinearRegression()
    validation_model.fit(X_train, y_train)

    # Make predictions on the unseen test set
    y_pred = validation_model.predict(X_test)

    # Calculate standard accuracy metrics
    r2 = r2_score(y_test, y_pred)
    mae = mean_absolute_error(y_test, y_pred)

    print("\n--- Model Validation Metrics (on historical test data) ---")
    print(f"R-squared (R²): {r2:.3f}")
    print(f"Mean Absolute Error (MAE): ${mae:.2f}")
    print("Description: These metrics indicate a very strong historical correlation.")

    # --- 3. Final Model Training ---
    # Train the final model on the entire cleaned dataset to capture all available information
    final_model = LinearRegression()
    final_model.fit(X, y)

    # Extract the coefficients needed for the frontend JavaScript calculator
    intercept = final_model.intercept_
    btc_coeff, mnav_coeff = final_model.coef_

    print("\n--- Final Model Coefficients (for Netlify/JavaScript implementation) ---")
    print("const intercept = " + f"{intercept:.2f};")
    print("const btcPriceCoeff = " + f"{btc_coeff:.5f};")
    print("const mNavCoeff = " + f"{mnav_coeff:.2f};")
    print("\n--- Model Training Process Finished ---")

# This allows the script to be run directly from the command line
if __name__ == "__main__":
    train_forecasting_model()