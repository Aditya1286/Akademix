<?php
// Include database connection
include_once 'db.php';

try {
    // Drop database if exists and create new one
    $conn->exec("DROP DATABASE IF EXISTS school_management");
    $conn->exec("CREATE DATABASE school_management");
    $conn->exec("USE school_management");
    
    // Create users table
    $conn->exec("CREATE TABLE users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(50) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        section VARCHAR(10) NOT NULL
    )");
    
    // Create attendance table
    $conn->exec("CREATE TABLE attendance (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        sub1_attendance FLOAT NOT NULL,
        sub2_attendance FLOAT NOT NULL,
        sub3_attendance FLOAT NOT NULL,
        aggregate_attendance FLOAT GENERATED ALWAYS AS 
            ((sub1_attendance + sub2_attendance + sub3_attendance) / 3) STORED,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    )");
    
    // Create fee system table
    $conn->exec("CREATE TABLE fee_system (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        total_fee FLOAT NOT NULL,
        fee_paid FLOAT NOT NULL,
        fee_due FLOAT GENERATED ALWAYS AS (total_fee - fee_paid) STORED,
        payment_date DATE NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    )");
    
    // Create assignments table
    $conn->exec("CREATE TABLE assignments (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        section VARCHAR(10) NOT NULL,
        a1 INT NOT NULL,
        a2 INT NOT NULL, 
        a3 INT NOT NULL,
        total_score INT GENERATED ALWAYS AS (a1 + a2 + a3) STORED,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    )");
    
    // Create resources table
    $conn->exec("CREATE TABLE resources (
        id INT AUTO_INCREMENT PRIMARY KEY,
        section VARCHAR(10) NOT NULL,
        title VARCHAR(100) NOT NULL,
        r1 VARCHAR(255),
        r2 VARCHAR(255),
        r3 VARCHAR(255)
    )");
    
    // Create results table
    $conn->exec("CREATE TABLE results (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        sem1 FLOAT NOT NULL,
        sem2 FLOAT NOT NULL,
        total_marks FLOAT GENERATED ALWAYS AS (sem1 + sem2) STORED,
        percentage FLOAT GENERATED ALWAYS AS ((sem1 + sem2) / 2) STORED,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    )");
    
    // Create feedback table
    $conn->exec("CREATE TABLE feedback (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        title VARCHAR(255) NOT NULL,
        query TEXT NOT NULL,
        submission_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    )");

    echo "Database and tables created successfully!";
} catch (PDOException $e) {
    die("Error setting up database: " . $e->getMessage());
}
?>