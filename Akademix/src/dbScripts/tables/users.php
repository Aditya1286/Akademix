<?php
// Include database connection
include_once '../db/db.php';

class Users {
    private $conn;
    
    public function __construct($db) {
        $this->conn = $db;
    }

    private function jsonResponse($success, $data = null, $error = null) {
        return json_encode(["success" => $success, "data" => $data, "error" => $error]);
    }
    
    public function createUser($name, $email, $password, $section) {
        try {
            $stmt = $this->conn->prepare("INSERT INTO users (name, email, password, section) VALUES (?, ?, ?, ?)");
            $stmt->execute([$name, $email, password_hash($password, PASSWORD_DEFAULT), $section]);
            return $this->jsonResponse(true, ["user_id" => $this->conn->lastInsertId()]);
        } catch (PDOException $e) {
            return $this->jsonResponse(false, null, $e->getMessage());
        }
    }
    
    public function getAllUsers() {
        try {
            return $this->jsonResponse(true, $this->conn->query("SELECT id, name, email, section FROM users")->fetchAll());
        } catch (PDOException $e) {
            return $this->jsonResponse(false, null, $e->getMessage());
        }
    }
    
    public function getUserById($id) {
        try {
            $stmt = $this->conn->prepare("SELECT id, name, email, section FROM users WHERE id = ?");
            $stmt->execute([$id]);
            return $this->jsonResponse(true, $stmt->fetch());
        } catch (PDOException $e) {
            return $this->jsonResponse(false, null, $e->getMessage());
        }
    }
    
    public function login($email, $password) {
        try {
            $stmt = $this->conn->prepare("SELECT id, name, email, password, section FROM users WHERE email = ?");
            $stmt->execute([$email]);
            $user = $stmt->fetch();
            return ($user && password_verify($password, $user['password'])) ? 
                $this->jsonResponse(true, ["id" => $user['id'], "name" => $user['name'], "email" => $user['email'], "section" => $user['section']]) : 
                $this->jsonResponse(false, null, "Invalid credentials");
        } catch (PDOException $e) {
            return $this->jsonResponse(false, null, $e->getMessage());
        }
    }
    
    public function updateUser($id, $name, $email, $section) {
        try {
            $stmt = $this->conn->prepare("UPDATE users SET name = ?, email = ?, section = ? WHERE id = ?");
            return $this->jsonResponse($stmt->execute([$name, $email, $section, $id]));
        } catch (PDOException $e) {
            return $this->jsonResponse(false, null, $e->getMessage());
        }
    }
}

?>
