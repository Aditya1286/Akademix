<?php
// Include database connection
include_once '../db/db.php';

class Attendance {
    private $conn;
    
    public function __construct($db) {
        $this->conn = $db;
    }
    
    // Record attendance for a student
    public function recordAttendance($user_id, $attendance) {
        try {
            $columns = implode(", ", array_keys($attendance));
            $placeholders = ":" . implode(", :", array_keys($attendance));
            
            $stmt = $this->conn->prepare("INSERT INTO attendance (user_id, $columns) VALUES (:user_id, $placeholders)");
            
            $stmt->bindParam(':user_id', $user_id);
            foreach ($attendance as $subject => $value) {
                $stmt->bindParam(":$subject", $value);
            }
            
            return $stmt->execute();
        } catch (PDOException $e) {
            echo json_encode(["error" => "Error recording attendance: " . $e->getMessage()]);
            return false;
        }
    }
    
    // Get attendance record for a student
    public function getAttendanceByUserId($user_id) {
        try {
            $stmt = $this->conn->prepare("SELECT * FROM attendance WHERE user_id = :user_id");
            $stmt->bindParam(':user_id', $user_id);
            $stmt->execute();
            
            return $stmt->fetchAll();
        } catch (PDOException $e) {
            echo json_encode(["error" => "Error fetching attendance: " . $e->getMessage()]);
            return false;
        }
    }
    
    // Get all attendance records with student names
    public function getAllAttendanceWithNames() {
        try {
            $stmt = $this->conn->query("SELECT a.*, u.name, u.section FROM attendance a JOIN users u ON a.user_id = u.id ORDER BY u.section, u.name");
            return $stmt->fetchAll();
        } catch (PDOException $e) {
            echo json_encode(["error" => "Error fetching attendance records: " . $e->getMessage()]);
            return false;
        }
    }
    
    // Update attendance records
    public function updateAttendance($id, $attendance) {
        try {
            $setClause = implode(", ", array_map(fn($sub) => "$sub = :$sub", array_keys($attendance)));
            $stmt = $this->conn->prepare("UPDATE attendance SET $setClause WHERE id = :id");
            
            $stmt->bindParam(':id', $id);
            foreach ($attendance as $subject => $value) {
                $stmt->bindParam(":$subject", $value);
            }
            
            return $stmt->execute();
        } catch (PDOException $e) {
            echo json_encode(["error" => "Error updating attendance: " . $e->getMessage()]);
            return false;
        }
    }
}

// Fix for line 65
$input = json_decode(file_get_contents("php://input"), true);
if (!isset($input["action"]) || !is_string($input["action"])) {
    die(json_encode(["error" => "Invalid action"]));
}
?>
