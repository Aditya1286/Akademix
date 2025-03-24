<?php
// Include database connection
include_once '../db/db.php';

class Users {
    private $conn;
    
    public function __construct($db) {
        $this->conn = $db;
    }
    
    // Create a new user
    public function createUser($name, $email, $password, $section) {
        try {
            $hashed_password = password_hash($password, PASSWORD_DEFAULT);
            
            $stmt = $this->conn->prepare("INSERT INTO users (name, email, password, section) 
                                        VALUES (:name, :email, :password, :section)");
            
            $stmt->bindParam(':name', $name);
            $stmt->bindParam(':email', $email);
            $stmt->bindParam(':password', $hashed_password);
            $stmt->bindParam(':section', $section);
            
            if ($stmt->execute()) {
                return $this->conn->lastInsertId();
            }
            return false;
        } catch (PDOException $e) {
            echo "Error adding user: " . $e->getMessage();
            return false;
        }
    }
    
    // Get all users
    public function getAllUsers() {
        try {
            $stmt = $this->conn->query("SELECT id, name, email, section FROM users");
            return $stmt->fetchAll();
        } catch (PDOException $e) {
            echo "Error fetching users: " . $e->getMessage();
            return false;
        }
    }
    
    // Get user by ID
    public function getUserById($id) {
        try {
            $stmt = $this->conn->prepare("SELECT id, name, email, section FROM users WHERE id = :id");
            $stmt->bindParam(':id', $id);
            $stmt->execute();
            return $stmt->fetch();
        } catch (PDOException $e) {
            echo "Error fetching user: " . $e->getMessage();
            return false;
        }
    }
    
    // Get users by section
    public function getUsersBySection($section) {
        try {
            $stmt = $this->conn->prepare("SELECT id, name, email FROM users WHERE section = :section");
            $stmt->bindParam(':section', $section);
            $stmt->execute();
            return $stmt->fetchAll();
        } catch (PDOException $e) {
            echo "Error fetching users by section: " . $e->getMessage();
            return false;
        }
    }
    
    // User login
    public function login($email, $password) {
        try {
            $stmt = $this->conn->prepare("SELECT id, name, email, password, section FROM users WHERE email = :email");
            $stmt->bindParam(':email', $email);
            $stmt->execute();
            
            $user = $stmt->fetch();
            
            if ($user && password_verify($password, $user['password'])) {
                unset($user['password']); // Don't return the password
                return $user;
            }
            return false;
        } catch (PDOException $e) {
            echo "Login error: " . $e->getMessage();
            return false;
        }
    }
    
    // Update user
    public function updateUser($id, $name, $email, $section) {
        try {
            $stmt = $this->conn->prepare("UPDATE users SET name = :name, email = :email, section = :section 
                                        WHERE id = :id");
            
            $stmt->bindParam(':id', $id);
            $stmt->bindParam(':name', $name);
            $stmt->bindParam(':email', $email);
            $stmt->bindParam(':section', $section);
            
            return $stmt->execute();
        } catch (PDOException $e) {
            echo "Error updating user: " . $e->getMessage();
            return false;
        }
    }
}

// Example usage with sample data
function populateSampleUsers($conn) {
    $users = new Users($conn);
    
    // Sample users for testing
    $user1_id = $users->createUser("John Smith", "john@example.com", "password123", "A");
    $user2_id = $users->createUser("Sarah Johnson", "sarah@example.com", "password456", "B");
    
    return [$user1_id, $user2_id];
}

// Uncomment to test
// $userIds = populateSampleUsers($conn);
// echo "Added users with IDs: " . implode(", ", $userIds);
?>