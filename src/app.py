from flask import Flask, jsonify, render_template

app = Flask(__name__, template_folder='../templates')

@app.route('/')
def home():
    """Serve the main calculator UI."""
    return render_template('calculator_ui.html')

@app.route('/api/coefficients')
def get_coefficients():
    """Provide hard-coded model coefficients for the initial phase."""
    # These are placeholder values as per Phase 1 requirements.
    coefficients = {
        'intercept': -422.64,
        'btc_coeff': 0.00458,
        'mnav_coeff': 165.09,
        'last_updated': '2025-08-01T22:00:00Z' # Static timestamp for now
    }
    return jsonify(coefficients)

if __name__ == '__main__':
    app.run(debug=True)
