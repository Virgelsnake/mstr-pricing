document.addEventListener('DOMContentLoaded', function () {
    const uploadForm = document.getElementById('upload-form');
    const csvFileInput = document.getElementById('csv-file');
    const statusMessages = document.getElementById('status-messages');
    const uploadButton = document.getElementById('upload-button');

    if (uploadForm) {
        uploadForm.addEventListener('submit', function (event) {
            event.preventDefault(); // Prevent default form submission

            const file = csvFileInput.files[0];
            if (!file) {
                displayMessage('Please select a file to upload.', 'error');
                return;
            }

            // Disable button and show loading state
            uploadButton.disabled = true;
            uploadButton.textContent = 'Uploading...';

            const formData = new FormData();
            formData.append('csv-file', file);

            fetch('/upload', {
                method: 'POST',
                body: formData
            })
            .then(response => {
                // Check if response is ok, otherwise parse error from JSON
                if (!response.ok) {
                    return response.json().then(err => {
                        // Use the server-provided error message, or a default one
                        throw new Error(err.error || 'An unknown server error occurred.');
                    });
                }
                return response.json();
            })
            .then(data => {
                displayMessage(data.message, 'success');
                uploadForm.reset(); // Clear the form input after successful upload
            })
            .catch(error => {
                // Display any error that occurred during fetch or processing
                displayMessage(`Error: ${error.message}`, 'error');
            })
            .finally(() => {
                // Always re-enable the button and restore its text
                uploadButton.disabled = false;
                uploadButton.textContent = 'Upload CSV';
            });
        });
    }

    function displayMessage(message, type) {
        if (statusMessages) {
            statusMessages.textContent = message;
            // Reset classes and apply the new type for styling (e.g., success, error)
            statusMessages.className = 'status-messages'; 
            statusMessages.classList.add(type);
            statusMessages.style.display = 'block';
        }
    }
});
