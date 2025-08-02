import os
from flask import Flask, jsonify, render_template
from dotenv import load_dotenv
from supabase import create_client, Client

# Load environment variables from .env file
load_dotenv()

# Initialize Supabase client
url: str = os.environ.get("SUPABASE_URL")
key: str = os.environ.get("SUPABASE_KEY")
supabase: Client = create_client(url, key)

app = Flask(__name__, template_folder='../templates')

@app.route('/')
def home():
    """Serve the calculator UI."""
    return render_template('calculator_ui.html')

@app.route('/api/coefficients')
def get_coefficients():
    """Fetch the latest model coefficients from the Supabase database."""
    try:
        # Fetch the most recent record, ordered by last_updated descending
        response = supabase.table('model_coefficients').select("*").order('last_updated', desc=True).limit(1).execute()
        
        # The data is in the 'data' key of the response object
        if response.data:
            # The result is a list, we want the first item
            latest_coeffs = response.data[0]
            
            # Format the data to match the frontend's expectations
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
        # Log the error for debugging
        print(f"Error fetching from Supabase: {e}")
        return jsonify({"error": "Failed to fetch model coefficients."}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5003)
