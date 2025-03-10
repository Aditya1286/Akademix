<?php 

include 'connect.php';

// Ensure the 'users' table exists
$tableQuery = "CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    firstName VARCHAR(50) NOT NULL,
    lastName VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
)";

if (!$conn->query($tableQuery)) {
    die("Error creating table: " . $conn->error);
}

if(isset($_POST['signUp'])){
    $firstName = $conn->real_escape_string($_POST['fName']);
    $lastName = $conn->real_escape_string($_POST['lName']);
    $email = $conn->real_escape_string($_POST['email']);
    $password = md5($_POST['password']); // Not recommended, use password_hash()

    // Check if email already exists
    $checkEmail = "SELECT * FROM users WHERE email='$email'";
    $result = $conn->query($checkEmail);

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

if(isset($_POST['signIn'])){
    $email = $conn->real_escape_string($_POST['email']);
    $password = md5($_POST['password']); // Again, use password_hash() in real applications

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
}

?>
