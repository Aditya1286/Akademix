<?php

$host = "localhost";
$user = "root";
$pass = '';
$db = "login";

// Create connection
$conn = new mysqli($host, $user, $pass);

// Check connection
if ($conn->connect_error) {
    die("Failed to connect to MySQL: " . $conn->connect_error);
}

// Check if the database exists, if not, create it
$sql = "CREATE DATABASE IF NOT EXISTS $db";
if ($conn->query($sql) === TRUE) {
    echo "Database exists or created successfully.<br>";
} else {
    die("Error creating database: " . $conn->error);
}

// Select the database
$conn->select_db($db);

// Final check
if ($conn->connect_error) {
    die("Failed to connect to database: " . $conn->connect_error);
}

echo "Connected successfully to the database.";

?>
