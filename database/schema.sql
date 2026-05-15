CREATE DATABASE IF NOT EXISTS school_management;
USE school_management;
CREATE TABLE IF NOT EXISTS schools (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    address VARCHAR(500) NOT NULL,
    latitude FLOAT NOT NULL,
    longitude FLOAT NOT NULL
);

INSERT INTO schools (name, address, latitude, longitude) VALUES
('Delhi Public School', 'Mathura Road, New Delhi', 28.5, 77.0),
('Ryan International School', 'Sector 40, Gurugram', 28.4, 77.1),
('Kendriya Vidyalaya', 'INA Colony, New Delhi', 28.6, 77.2),
('St. Columbus School', 'Ashok Place, New Delhi', 28.7, 77.3),
('Modern School', 'Barakhamba Road, New Delhi', 28.8, 77.4);
