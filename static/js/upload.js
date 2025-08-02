document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('form');
    const resultDiv = document.getElementById('result');
    const statusDiv = document.getElementById('status');
    const loadingDiv = document.getElementById('loading');

    if (form) {
        form.addEventListener('submit', function (event) {
            event.preventDefault();
            console.log('Form submission intercepted.');

            const formData = new FormData(form);
            const fileInput = document.querySelector('input[type="file"]');
            
            if (!fileInput.files || fileInput.files.length === 0) {
                statusDiv.textContent = 'Please select a file to upload.';
                statusDiv.style.color = 'red';
                return;
            }

            loadingDiv.style.display = 'block';
            statusDiv.textContent = 'Uploading and processing...';
            resultDiv.innerHTML = '';

            fetch('/upload', {
                method: 'POST',
                body: formData
            })
            .then(response => {
                if (!response.ok) {
                    // Try to parse error from JSON body, otherwise use statusText
                    return response.json().then(err => { 
                        throw new Error(err.error || response.statusText); 
                    }).catch(() => {
                        throw new Error(response.statusText);
                    });
                }
                return response.json();
            })
            .then(data => {
                loadingDiv.style.display = 'none';
                console.log('Success:', data);
                if (data.error) {
                    statusDiv.textContent = 'Error: ' + data.error;
                    statusDiv.style.color = 'red';
                } else {
                    statusDiv.textContent = 'Calculation successful!';
                    statusDiv.style.color = 'green';
                    
                    let table = '<table><thead><tr>';
                    data.headers.forEach(header => {
                        table += `<th>${header}</th>`;
                    });
                    table += '</tr></thead><tbody>';
                    data.results.forEach(row => {
                        table += '<tr>';
                        row.forEach(cell => {
                            table += `<td>${cell}</td>`;
                        });
                        table += '</tr>';
                    });
                    table += '</tbody></table>';
                    resultDiv.innerHTML = table;
                }
            })
            .catch(error => {
                loadingDiv.style.display = 'none';
                console.error('Error:', error);
                statusDiv.textContent = 'An error occurred: ' + error.message;
                statusDiv.style.color = 'red';
            });
        });
    }
});
