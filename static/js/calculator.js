document.addEventListener('DOMContentLoaded', () => {
    // --- Get references to UI elements ---
    const btcSlider = document.getElementById('btc-price');
    const btcValueDisplay = document.getElementById('btc-price-value');
    const mNavSlider = document.getElementById('m-nav');
    const mNavValueDisplay = document.getElementById('m-nav-value');
    const forecastOutput = document.getElementById('forecast-output');
    const loadingIndicator = document.getElementById('loading-indicator');
    const refreshButton = document.getElementById('refresh-model');
    const lastUpdatedDisplay = document.getElementById('last-updated');

    // --- Model coefficients will be fetched from the API or loaded from cache ---
    let modelCoefficients = {};
    
    // Local storage keys
    const STORAGE_KEY_COEFFICIENTS = 'mstr_model_coefficients';
    const STORAGE_KEY_LAST_UPDATED = 'mstr_model_last_updated';

    /**
     * Updates the forecasted MSTR price based on the current slider values.
     */
    function updateForecast() {
        if (!btcSlider || !mNavSlider) return; // Guard against missing elements

        // Update the display for the current slider values
        const btcPrice = parseFloat(btcSlider.value);
        const mNav = parseFloat(mNavSlider.value);
        btcValueDisplay.textContent = `$${btcPrice.toLocaleString()}`;
        mNavValueDisplay.textContent = mNav.toFixed(2);

        // Calculate forecast only if coefficients are loaded
        if (modelCoefficients.intercept) {
            const forecastedPrice = modelCoefficients.intercept + (btcPrice * modelCoefficients.btc_coeff) + (mNav * modelCoefficients.mnav_coeff);
            const finalPrice = Math.max(0, forecastedPrice);
            forecastOutput.textContent = `$${finalPrice.toFixed(2)}`;
        }
    }

    // --- Event Listeners for slider interaction ---
    const sliders = [btcSlider, mNavSlider];
    sliders.forEach(slider => {
        if (!slider) return;

        // Basic input event for immediate value changes
        slider.addEventListener('input', updateForecast);
        
        // Track if we're currently dragging
        let isDragging = false;

        const handleDragStart = (e) => {
            isDragging = true;
            slider.classList.add('dragging');
        };

        const handleDragEnd = () => {
            isDragging = false;
            slider.classList.remove('dragging');
        };

        slider.addEventListener('mousedown', handleDragStart);
        slider.addEventListener('touchstart', handleDragStart, { passive: true });

        slider.addEventListener('mouseup', handleDragEnd);
        slider.addEventListener('touchend', handleDragEnd);
    });

    /**
     * Formats a date string in a user-friendly format.
     * @param {string} dateString - The ISO date string to format.
     * @returns {string} A formatted date string.
     */
    function formatDate(dateString) {
        if (!dateString) return 'Never';
        const date = new Date(dateString);
        return date.toLocaleString('en-GB', { 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        });
    }
    
    /**
     * Saves model coefficients and timestamp to local storage.
     * @param {object} coefficients - The model coefficients object from the API.
     */
    function saveToLocalStorage(coefficients) {
        try {
            localStorage.setItem(STORAGE_KEY_COEFFICIENTS, JSON.stringify(coefficients));
            localStorage.setItem(STORAGE_KEY_LAST_UPDATED, coefficients.last_updated);
        } catch (e) {
            console.error('Failed to save to local storage:', e);
        }
    }

    /**
     * Loads model coefficients from local storage.
     * @returns {boolean} True if data was loaded successfully, false otherwise.
     */
    function loadFromLocalStorage() {
        try {
            const storedCoefficients = localStorage.getItem(STORAGE_KEY_COEFFICIENTS);
            const lastUpdated = localStorage.getItem(STORAGE_KEY_LAST_UPDATED);

            if (storedCoefficients && lastUpdated) {
                modelCoefficients = JSON.parse(storedCoefficients);
                lastUpdatedDisplay.textContent = `Last updated: ${formatDate(lastUpdated)}`;
                return true;
            }
        } catch (e) {
            console.error('Failed to load from local storage:', e);
        }
        return false;
    }

    /**
     * Fetches the latest model coefficients from the API.
     */
    async function fetchCoefficients() {
        loadingIndicator.style.display = 'block';
        forecastOutput.style.opacity = '0.5';

        try {
            // Add cache-busting query parameter
            const response = await fetch(`/api/coefficients?_=${new Date().getTime()}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            modelCoefficients = data;
            saveToLocalStorage(data);
            lastUpdatedDisplay.textContent = `Last updated: ${formatDate(data.last_updated)}`;
            updateForecast(); // Update forecast with new data
        } catch (error) {
            console.error('Error fetching coefficients:', error);
            forecastOutput.textContent = 'Error';
            lastUpdatedDisplay.textContent = 'Last updated: Failed to load';
        } finally {
            loadingIndicator.style.display = 'none';
            forecastOutput.style.opacity = '1';
        }
    }

    // --- Initialisation ---
    // Try to load from local storage first
    if (!loadFromLocalStorage()) {
        // If not available, fetch from API
        fetchCoefficients();
    } else {
        // If loaded from storage, update the forecast immediately
        updateForecast();
    }

    // Refresh button event listener
    if (refreshButton) {
        refreshButton.addEventListener('click', fetchCoefficients);
    }
});
