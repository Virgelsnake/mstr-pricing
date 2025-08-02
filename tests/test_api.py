import pytest
import json
from unittest.mock import patch, MagicMock
import sys
import os

# Add the src directory to the Python path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from src.app import app

@pytest.fixture
def client():
    """Create a test client for the Flask app."""
    app.config['TESTING'] = True
    with app.test_client() as client:
        yield client

@patch('src.app.supabase')
def test_get_coefficients_success(mock_supabase, client):
    """Test the /api/coefficients endpoint when data is successfully retrieved."""
    # Mock the Supabase response
    mock_execute = MagicMock()
    mock_execute.data = [{
        'intercept': 100.0,
        'btc_coeff': 0.01,
        'mnav_coeff': 50.0,
        'last_updated': '2025-08-01T12:00:00'
    }]
    
    # Set up the mock chain
    mock_supabase.table.return_value.select.return_value.order.return_value.limit.return_value.execute.return_value = mock_execute
    
    # Make the request
    response = client.get('/api/coefficients')
    
    # Check the response
    assert response.status_code == 200
    data = json.loads(response.data)
    assert data['intercept'] == 100.0
    assert data['btc_coeff'] == 0.01
    assert data['mnav_coeff'] == 50.0
    assert data['last_updated'] == '2025-08-01T12:00:00'
    
    # Verify the mock was called correctly
    mock_supabase.table.assert_called_once_with('model_coefficients')

@patch('src.app.supabase')
def test_get_coefficients_no_data(mock_supabase, client):
    """Test the /api/coefficients endpoint when no data is found."""
    # Mock the Supabase response with empty data
    mock_execute = MagicMock()
    mock_execute.data = []
    
    # Set up the mock chain
    mock_supabase.table.return_value.select.return_value.order.return_value.limit.return_value.execute.return_value = mock_execute
    
    # Make the request
    response = client.get('/api/coefficients')
    
    # Check the response
    assert response.status_code == 404
    data = json.loads(response.data)
    assert 'error' in data
    assert data['error'] == 'No coefficients found in the database.'

@patch('src.app.supabase')
def test_get_coefficients_error(mock_supabase, client):
    """Test the /api/coefficients endpoint when an error occurs."""
    # Mock the Supabase response to raise an exception
    mock_supabase.table.return_value.select.return_value.order.return_value.limit.return_value.execute.side_effect = Exception("Database error")
    
    # Make the request
    response = client.get('/api/coefficients')
    
    # Check the response
    assert response.status_code == 500
    data = json.loads(response.data)
    assert 'error' in data
    assert data['error'] == 'Failed to fetch model coefficients.'
