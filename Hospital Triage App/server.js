const express = require('express');
const cors = require("cors");
const app = express();
const bodyParser = require('body-parser');
app.use(express.json());
const path = require('path');

// Enable Cross-Origin Resource Sharing (CORS)
app.use(cors());
app.use(bodyParser.json());

// Global variable to store the current user's ID
let currentUserId = null;

app.use(express.static(__dirname));

// Route for serving the main HTML file
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

// Set up MySQL connection
const mysql = require('mysql');
const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '!Caligo11!',
    database: 'hospital'
});

// Connect to the MySQL database
connection.connect(error => {
    if (error) throw error;
    console.log('Successfully connected to the database.');
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

// Login endpoint
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    const query = 'SELECT * FROM Users WHERE Username = ?';

    connection.query(query, [username], (error, results, fields) => {
        if (error) {
            return res.status(500).send('Error on the server.');
        }

        if (results.length > 0) {
            const user = results[0];

            if (password === user.Password) {
                currentUserId = user.UserID;
                return res.send('Login successful');
            } else {
                return res.status(401).send('Invalid username or password');
            }
        } else {
            return res.status(401).send('Invalid username or password');
        }
    });
});

// Sign up endpoint
app.post('/signup', (req, res) => {
    const { username, password } = req.body;

    const insertQuery = 'INSERT INTO Users (Username, Password) VALUES (?, ?)';

    // Insert new user into database
    connection.query(insertQuery, [username, password], (error, results, fields) => {
        if (error) {
            console.error('Error creating new user:', error);
            return res.status(500).send('Error creating new user');
        }
        res.send('Account created successfully');
    });
});

// Route to submit patient form
app.post('/submit-patient-form', (req, res) => {
    const { patientName, patientAge, dob, gender, condition, severity } = req.body;
    const initialWaitTime = getInitialWaitTime(severity);

    const query = `INSERT INTO PatientInfo (UserID, Name, PatientCondition, Severity, Age, Gender, DateOfBirth, WaitTime) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

    connection.query(query, [currentUserId, patientName, condition, severity, patientAge, gender, dob, initialWaitTime], (error, results, fields) => {
        if (error) {
            console.error('Error inserting patient data:', error);
            return res.status(500).send('Error inserting patient data');
        }
        res.send('Patient data inserted successfully');
    });
});

// Function to get initial wait time based on severity. I have assigned wait times to each severity level here.
function getInitialWaitTime(severity) {
    severity = parseInt(severity);

    switch (severity) {
        case 1:
            return 15;
        case 2:
            return 12;
        case 3:
            return 9;
        case 4:
            return 7;
        case 5:
            return 5;
        default:
            return 0;
    }
}

// Route to get patient records
app.get('/get-patient-records', (req, res) => {
    const query = `
    SELECT *
    FROM PatientInfo
    ORDER BY Severity DESC, EntryTime ASC`;

    connection.query(query, (error, results, fields) => {
        if (error) {
            return res.status(500).send('Error retrieving patient records');
        }
        res.json(results);
    });
});


// Function to update patient wait times periodically
function updateWaitTimes() {
    const updateQuery = `
        UPDATE PatientInfo
        SET WaitTime = GREATEST(WaitTime - 1, 0)  
        WHERE WaitTime > 0
    `;

    connection.query(updateQuery, (error, results, fields) => {
        if (error) {
            console.error('Error updating wait times:', error);
        }
    });
}

// Set interval to call updateWaitTimes function every minute
setInterval(updateWaitTimes, 60000);


