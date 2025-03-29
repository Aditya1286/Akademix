<?php
// Database connection configuration
$host = 'localhost';
$dbname = 'school_management';
$username = 'root';
$password = '';

try {
    $conn = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $conn->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
    echo json_encode(["status" => "DataBase Connected Succesfully"]);
} catch (PDOException $e) {
    die("Database Connection Error: " . $e->getMessage());
}
?>