/**
 * Test script for frontend error handling scenarios
 * 
 * This script can be included in the calculator_ui.html for testing purposes
 * It simulates various error conditions to verify the UI's error handling
 */

// Test functions to simulate different error scenarios
const ErrorTests = {
    // Simulate a failed API request
    simulateApiFailure: function() {
        console.log('Simulating API failure...');
        
        // Store the original fetch function
        const originalFetch = window.fetch;
        
        // Override fetch to simulate a failure
        window.fetch = function(url) {
            if (url === '/api/coefficients') {
                console.log('Intercepted coefficients API call, simulating failure');
                return Promise.reject(new Error('Simulated API failure'));
            }
            return originalFetch.apply(this, arguments);
        };
        
        // Trigger a refresh to test error handling
        document.getElementById('refresh-model').click();
        
        // Restore the original fetch after a delay
        setTimeout(() => {
            window.fetch = originalFetch;
            console.log('Restored original fetch function');
        }, 3000);
    },
    
    // Simulate local storage being unavailable
    simulateLocalStorageFailure: function() {
        console.log('Simulating localStorage failure...');
        
        // Store the original localStorage methods
        const originalSetItem = Storage.prototype.setItem;
        const originalGetItem = Storage.prototype.getItem;
        
        // Override localStorage methods to throw errors
        Storage.prototype.setItem = function() {
            throw new Error('Simulated localStorage failure');
        };
        
        Storage.prototype.getItem = function() {
            throw new Error('Simulated localStorage failure');
        };
        
        // Reload the page to test error handling with localStorage unavailable
        location.reload();
        
        // Restore the original localStorage methods after a delay
        setTimeout(() => {
            Storage.prototype.setItem = originalSetItem;
            Storage.prototype.getItem = originalGetItem;
            console.log('Restored original localStorage methods');
        }, 5000);
    },
    
    // Run all tests in sequence
    runAllTests: function() {
        console.log('Running all error handling tests...');
        
        // Run tests with a delay between each
        setTimeout(() => this.simulateApiFailure(), 1000);
        setTimeout(() => this.simulateLocalStorageFailure(), 6000);
    }
};

// Add a test button to the UI for running tests
function addTestButton() {
    const refreshContainer = document.querySelector('.refresh-container');
    
    if (refreshContainer) {
        const testButton = document.createElement('button');
        testButton.textContent = 'Run Error Tests';
        testButton.className = 'refresh-button';
        testButton.style.marginLeft = '10px';
        testButton.style.backgroundColor = '#d9534f';
        
        testButton.addEventListener('click', () => {
            ErrorTests.runAllTests();
        });
        
        // Add the button after the refresh button
        const refreshButton = document.getElementById('refresh-model');
        refreshContainer.insertBefore(testButton, refreshButton.nextSibling);
    }
}

// Initialize tests when the page is fully loaded
window.addEventListener('load', () => {
    console.log('Error handling test script loaded');
    addTestButton();
});
