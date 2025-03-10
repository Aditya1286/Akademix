<?php 

include 'connect.php';

$inputData;
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $inputData = json_decode(file_get_contents("php://input"), true);
}

// Ensure the 'users' table exists
$tableQuery = "CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    firstName VARCHAR(50) NOT NULL,
    lastName VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
)";

if (!$conn->query($tableQuery)) {
    die(json_encode(["status" => "error", "message" => "Error creating table: " . $conn->error]));
}

$flag = 1;
foreach ($inputData as $x) {
    echo "data".$x."" ;
    if (empty($x)) {
        $flag = 0;
        break;
    }
}

if (($inputData['option'] === true) && $flag == 1) {
    $email = $conn->real_escape_string($inputData['email']);
    $password = md5($inputData['password']); // Consider using password_hash()

    $sql = "SELECT * FROM users WHERE email=? AND password=?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ss", $email, $password);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result && $result->num_rows > 0) {
        session_start();
        $row = $result->fetch_assoc();
        $_SESSION['email'] = $row['email'];
        echo "<script>alert('Login Successful!'); window.location.href='homepage.php';</script>";
        exit();
    } else {
        echo "<script>alert('Incorrect Email or Password'); window.location.href='index.php';</script>";
    }

    $stmt->close();
} else {
    $firstName = $conn->real_escape_string($inputData['firstName']);
    $lastName = $conn->real_escape_string($inputData['lastName']);
    $email = $conn->real_escape_string($inputData['email']);
    $password = md5($inputData['Pass']); // Consider using password_hash()

    // Check if email already exists
    $checkEmail = "SELECT * FROM users WHERE email=?";
    $stmt = $conn->prepare($checkEmail);
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result && $result->num_rows > 0) {
        echo "<script>alert('Email Address Already Exists!'); window.location.href='index.php';</script>";
    } else {
        // Insert new user
        $insertQuery = "INSERT INTO users (firstName, lastName, email, password) VALUES (?, ?, ?, ?)";
        $stmt = $conn->prepare($insertQuery);
        $stmt->bind_param("ssss", $firstName, $lastName, $email, $password);

        if ($stmt->execute()) {
            echo "<script>alert('Registration Successful!'); window.location.href='index.php';</script>";
        } else {
            echo "<script>alert('Error: " . $conn->error . "');</script>";
        }

        $stmt->close();
    }
}

$conn->close();

?>
