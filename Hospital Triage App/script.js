// Function to show a specific section of the page and hide others
function showSection(sectionId) {
    var sections = document.querySelectorAll('.container');
    sections.forEach(function (section) {
        section.style.display = 'none';
    });

    // Show the requested section
    var showSection = document.getElementById(sectionId);
    showSection.style.display = 'block';

    var patientFormButton = document.querySelector('.topnav a[href="#patientForm"]');
    var waitlistButton = document.querySelector('.topnav a[href="#waitlist"]');
    // Hide or show navigation buttons based on current section
    if (sectionId === 'loginPage') {
        patientFormButton.style.display = 'none';
        waitlistButton.style.display = 'none';
    } else {
        patientFormButton.style.display = 'block';
        waitlistButton.style.display = 'block';
    }
}

// Function to reset input fields in the patient form
function resetPatientFormInputs() {
    document.getElementById('patientName').value = '';
    document.getElementById('patientAge').value = '';
    document.getElementById('dob').value = '';
    document.getElementById('gender').value = 'select';
    document.getElementById('condition').value = '';
    document.getElementById('severity').value = '3';
}

// Event listener for patient form navigation button
document.querySelector('.topnav a[href="#patientForm"]').addEventListener('click', function () {
    resetPatientFormInputs();
    showSection('patientForm');
});

// Function to show the waitlist section and fetch records
function showSectionWaitlist(sectionName) {
    showSection(sectionName);
    fetchAndDisplayPatientRecords();
}

// Set the initial view to login page on window load
window.onload = function () {
    showSection('loginPage');
}

// Event listener for sign up button on login page
document.getElementById('signupButton').addEventListener('click', function () {
    showSection('signupPage');
});


// Event listener for submitting the sign up form
document.getElementById('signupSubmit').addEventListener('click', function () {
    const username = document.getElementById('signupUsername').value;
    const password = document.getElementById('signupPassword').value;

    fetch('/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    })
        .then(response => {
            if (response.ok) {
                return response.text();
            } else {
                throw new Error('Failed to create account');
            }
        })
        .then(text => {
            showSection('loginPage');
        })
        .catch(error => {
            alert(error.message);
        });
});

// Event listener for login button
document.getElementById('login').addEventListener('click', function (e) {
    e.preventDefault();
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    if (username && password) {
        fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        })
            .then(response => {
                if (response.ok) {
                    return response.text();
                } else {
                    return response.text().then(text => { throw new Error(text) });
                }
            })
            .then(text => {
                showSection('patientForm');
            })
            .catch(error => {
                alert(error.message);
            });
    } else {
        alert('Please enter both username and password');
    }
});

// Event listener for submitting the patient form
document.getElementById('formSubmit').addEventListener('click', function (e) {
    e.preventDefault();
    const patientData = {
        patientName: document.getElementById('patientName').value,
        patientAge: document.getElementById('patientAge').value,
        dob: document.getElementById('dob').value,
        gender: document.getElementById('gender').value,
        condition: document.getElementById('condition').value,
        severity: document.getElementById('severity').value
    };

    fetch('/submit-patient-form', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(patientData),
    })
        .then(response => {
            if (response.ok) {
                return response.text();
            } else {
                throw new Error('Error submitting patient form');
            }
        })
        .then(text => {
            alert('Patient data inserted successfully');
            showSection('waitlist');
            fetchAndDisplayPatientRecords();
        })
        .catch(error => {
            alert(error.message);
        });
});

// Function to fetch and display patient records in the waitlist
function fetchAndDisplayPatientRecords() {
    fetch('/get-patient-records')
        .then(response => response.json())
        .then(records => {
            const tableBody = document.querySelector('#waitlist tbody');
            tableBody.innerHTML = '';
            let serialNumber = 1;

            records.forEach(record => {
                if (record.WaitTime > 0) {
                    const row = `<tr>
                        <td>${serialNumber++}</td>
                        <td>${record.Name}</td>
                        <td>${record.Gender}</td>
                        <td>${record.PatientCondition}</td>
                        <td>${record.Severity}</td>
                        <td>${record.WaitTime} mins</td>
                    </tr>`;
                    tableBody.innerHTML += row;
                }
            });
        })
        .catch(error => {
            console.error('Error fetching patient records:', error);
        });
}


// Event listener for back button in waitlist section
document.getElementById('backButton').addEventListener('click', function () {
    document.getElementById('patientName').value = '';
    document.getElementById('patientAge').value = '';
    document.getElementById('dob').value = '';
    document.getElementById('gender').value = 'select';
    document.getElementById('condition').value = '';
    document.getElementById('severity').value = '3';

    showSection('patientForm');
});

// Function to start polling for updates in waitlist
function startPollingForUpdates() {
    setInterval(fetchAndDisplayPatientRecords, 30000);
}

// Function to start polling for updates in waitlist
document.getElementById('waitlistButton').addEventListener('click', function () {
    fetchAndDisplayPatientRecords();
    startPollingForUpdates();
});