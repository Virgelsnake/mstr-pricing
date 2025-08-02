"""
Test script to verify the MSTR price calculation logic.
"""

def calculate_mstr_price(btc_price, m_nav, intercept, btc_coeff, mnav_coeff):
    """Calculate the forecasted MSTR price using the model coefficients."""
    forecasted_price = intercept + (btc_price * btc_coeff) + (m_nav * mnav_coeff)
    return max(0, forecasted_price)

def main():
    """Run the calculation test."""
    # Values from the database
    intercept = 120.5
    btc_coeff = 0.0025
    mnav_coeff = 1.85
    
    # Values from the UI
    btc_price = 155600
    m_nav = 2.99
    
    # Calculate the expected price
    expected_price = calculate_mstr_price(btc_price, m_nav, intercept, btc_coeff, mnav_coeff)
    print(f"BTC Price: ${btc_price}")
    print(f"M-NAV: {m_nav}")
    print(f"Intercept: {intercept}")
    print(f"BTC Coefficient: {btc_coeff}")
    print(f"M-NAV Coefficient: {mnav_coeff}")
    print(f"Expected MSTR Price: ${expected_price:.2f}")
    
    # Calculate with different values to match the UI
    # Try different BTC price values
    for test_btc_price in [115000, 125000, 135000, 145000, 155000, 165000]:
        test_price = calculate_mstr_price(test_btc_price, m_nav, intercept, btc_coeff, mnav_coeff)
        print(f"BTC Price: ${test_btc_price}, MSTR Price: ${test_price:.2f}")
    
    # Try different M-NAV values
    for test_m_nav in [1.0, 2.0, 3.0, 4.0, 5.0]:
        test_price = calculate_mstr_price(btc_price, test_m_nav, intercept, btc_coeff, mnav_coeff)
        print(f"M-NAV: {test_m_nav}, MSTR Price: ${test_price:.2f}")

if __name__ == "__main__":
    main()
