Create schema hospital;

USE hospital;

CREATE TABLE Users (
    UserID INT AUTO_INCREMENT PRIMARY KEY,
    Username VARCHAR(50) NOT NULL,
    Password VARCHAR(50) NOT NULL    
);

CREATE TABLE PatientInfo (
    PatientID INT AUTO_INCREMENT PRIMARY KEY,
    UserID INT,
    Name VARCHAR(100),
    DateOfBirth DATE,
    Age INT,
    Gender VARCHAR(10),
    PatientCondition VARCHAR(100),
    Severity INT,
    EntryTime TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    WaitTime INT,
    FOREIGN KEY (UserID) REFERENCES Users(UserID)
);

INSERT INTO Users (Username, Password) VALUES 
('johndoe', 'johndoe123');








