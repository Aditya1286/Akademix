<?php 

include 'connect.php';
session_start(); 

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// Get input data
$inputData = json_decode(file_get_contents("php://input"), true);

if (!$inputData) {
    echo json_encode(["status" => "error", "message" => "Invalid input"]);
    exit();
}

// Ensure 'users' table exists
$tableQuery = "CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    firstName VARCHAR(50) NOT NULL,
    lastName VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
)";

if (!$conn->query($tableQuery)) {
    echo json_encode(["status" => "error", "message" => "Error creating table: " . $conn->error]);
    exit();
}



$email = $conn->real_escape_string($inputData['email']);
$password = $inputData['password'];

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(["status" => "error", "message" => "Invalid email format"]);
    exit();
}

if ($inputData['option'] === false) {
    // **Login**
    $sql = "SELECT * FROM users WHERE email=?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();
    
    if ($result && $result->num_rows > 0) {
        $row = $result->fetch_assoc();
        
        if (password_verify($password, $row['password'])) {
            $_SESSION['user_email'] = $row['email'];
            echo json_encode(["status" => "success", "message" => "Login Successful"]);
        } else {    
            echo json_encode(["status" => "error", "message" => "Incorrect Email or Password"]);
        }
    } else {
        echo json_encode(["status" => "error", "message" => "User not found"]);
    }
    
    $stmt->close();
} else {
    // **Register**
    $firstName = $conn->real_escape_string($inputData['firstName']);
    $lastName = $conn->real_escape_string($inputData['lastName']);
    $hashedPassword = password_hash($password, PASSWORD_BCRYPT); // More secure

    // Check if email exists
    $checkEmail = "SELECT * FROM users WHERE email=?";
    $stmt = $conn->prepare($checkEmail);
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result && $result->num_rows > 0) {
        echo json_encode(["status" => "error", "message" => "Email Address Already Exists"]);
    } else {
        // Insert new user
        $insertQuery = "INSERT INTO users (firstName, lastName, email, password) VALUES (?, ?, ?, ?)";
        $stmt = $conn->prepare($insertQuery);
        $stmt->bind_param("ssss", $firstName, $lastName, $email, $hashedPassword);

        if ($stmt->execute()) {
            echo json_encode(["status" => "success", "message" => "Registration Successful"]);
        } else {
            echo json_encode(["status" => "error", "message" => "Error: " . $conn->error]);
        }
    }

    $stmt->close();
}

$conn->close();
?>
