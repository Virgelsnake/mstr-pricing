import os
import subprocess
from datetime import datetime
from flask import Flask, render_template, jsonify, request
from dotenv import load_dotenv
from supabase import create_client, Client
import pandas as pd
from werkzeug.utils import secure_filename

# Load environment variables from .env file
load_dotenv()

# Initialize Supabase client
url: str = os.environ.get("SUPABASE_URL")
key: str = os.environ.get("SUPABASE_SERVICE_KEY")



supabase: Client = create_client(url, key)

app = Flask(__name__, static_folder='../static', template_folder='../templates')

@app.route('/')
def home():
    """Serve the calculator UI."""
    return render_template('calculator_ui.html')

@app.route('/api/coefficients')
def get_coefficients():
    """Fetch the latest model coefficients from the Supabase database."""
    try:
        response = supabase.table('model_coefficients').select("*").order('last_updated', desc=True).limit(1).execute()
        if response.data:
            latest_coeffs = response.data[0]
            formatted_coeffs = {
                'intercept': latest_coeffs['intercept'],
                'btc_coeff': latest_coeffs['btc_coeff'],
                'mnav_coeff': latest_coeffs['mnav_coeff'],
                'last_updated': latest_coeffs['last_updated']
            }
            return jsonify(formatted_coeffs)
        else:
            return jsonify({"error": "No coefficients found in the database."}), 404
    except Exception as e:
        print(f"Error fetching from Supabase: {e}")
        return jsonify({"error": "Failed to fetch model coefficients."}), 500

@app.route('/upload', methods=['GET', 'POST'])
def upload_file():
    """Handles CSV upload for POST and serves the upload page for GET."""
    if request.method == 'POST':
        if 'csv-file' not in request.files:
            return jsonify({"error": "No file part in the request"}), 400
        
        file = request.files['csv-file']
        
        if file.filename == '':
            return jsonify({"error": "No selected file"}), 400

        if not file.filename.endswith('.csv'):
            return jsonify({"error": "Invalid file type. Please upload a CSV file."}), 400

        try:
            # Secure the filename and create a timestamped version for storage
            original_filename = secure_filename(file.filename)
            timestamp = datetime.now().strftime("%Y%m%d-%H%M%S")
            storage_filename = f"{timestamp}_{original_filename}"

            # Read file content for validation and upload
            file_content = file.read()
            file.seek(0)  # Reset file pointer for pandas

            # Validate CSV columns
            df = pd.read_csv(file)
            required_columns = {'timestamp', 'close', 'btc_price', 'm_nav'}
            if not required_columns.issubset(df.columns):
                return jsonify({"error": f"CSV must contain the columns: {', '.join(required_columns)}"}), 400

            # Upload the original file to Supabase Storage
            storage_bucket = 'market-data-uploads'
            supabase.storage.from_(storage_bucket).upload(storage_filename, file_content)

            # Select only the required columns for the database insert
            db_columns = ['timestamp', 'close', 'btc_price', 'm_nav']
            df_for_db = df[db_columns]

            # Prepare and insert data into the historical data table
            records = df_for_db.to_dict(orient='records')
            supabase.table('mstr_historical_data').insert(records).execute()

            # Trigger model retraining script as a non-blocking process
            subprocess.Popen(['python3', 'src/train_model.py'])

            return jsonify({"message": "File uploaded successfully. Model retraining has started."})

        except Exception as e:
            print(f"An error occurred during file upload and processing: {e}")
            return jsonify({"error": f"An error occurred: {str(e)}"}), 500
    
    # For GET requests, just render the upload page
    return render_template('upload.html')

# --- Main Application Entry Point ---
if __name__ == '__main__':
    app.run(debug=True, port=5003)
