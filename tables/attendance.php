<?php
// Include database connection
include_once '../db/db.php';

class Attendance {
    private $conn;
    
    public function __construct($db) {
        $this->conn = $db;
    }
    
    // Record attendance for a student
    public function recordAttendance($user_id, $sub1_attendance, $sub2_attendance, $sub3_attendance) {
        try {
            $stmt = $this->conn->prepare("INSERT INTO attendance (user_id, sub1_attendance, sub2_attendance, sub3_attendance) 
                                        VALUES (:user_id, :sub1, :sub2, :sub3)");
            
            $stmt->bindParam(':user_id', $user_id);
            $stmt->bindParam(':sub1', $sub1_attendance);
            $stmt->bindParam(':sub2', $sub2_attendance);
            $stmt->bindParam(':sub3', $sub3_attendance);
            
            return $stmt->execute();
        } catch (PDOException $e) {
            echo "Error recording attendance: " . $e->getMessage();
            return false;
        }
    }
    
    // Get attendance record for a student
    public function getAttendanceByUserId($user_id) {
        try {
            $stmt = $this->conn->prepare("SELECT * FROM attendance WHERE user_id = :user_id");
            $stmt->bindParam(':user_id', $user_id);
            $stmt->execute();
            
            return $stmt->fetch();
        } catch (PDOException $e) {
            echo "Error fetching attendance: " . $e->getMessage();
            return false;
        }
    }
    
    // Get all attendance records with student names
    public function getAllAttendanceWithNames() {
        try {
            $stmt = $this->conn->query("SELECT a.id, u.name, u.section, a.sub1_attendance, a.sub2_attendance, 
                                      a.sub3_attendance, a.aggregate_attendance 
                                      FROM attendance a
                                      JOIN users u ON a.user_id = u.id
                                      ORDER BY u.section, u.name");
            
            return $stmt->fetchAll();
        } catch (PDOException $e) {
            echo "Error fetching attendance records: " . $e->getMessage();
            return false;
        }
    }
    
    // Update attendance records
    public function updateAttendance($id, $sub1_attendance, $sub2_attendance, $sub3_attendance) {
        try {
            $stmt = $this->conn->prepare("UPDATE attendance 
                                        SET sub1_attendance = :sub1, 
                                            sub2_attendance = :sub2, 
                                            sub3_attendance = :sub3 
                                        WHERE id = :id");
            
            $stmt->bindParam(':id', $id);
            $stmt->bindParam(':sub1', $sub1_attendance);
            $stmt->bindParam(':sub2', $sub2_attendance);
            $stmt->bindParam(':sub3', $sub3_attendance);
            
            return $stmt->execute();
        } catch (PDOException $e) {
            echo "Error updating attendance: " . $e->getMessage();
            return false;
        }
    }
    
    // Get attendance statistics by section
    public function getAttendanceStatsBySection($section) {
        try {
            $stmt = $this->conn->prepare("SELECT 
                                          u.section,
                                          COUNT(a.id) as total_students,
                                          AVG(a.aggregate_attendance) as avg_attendance,
                                          MIN(a.aggregate_attendance) as min_attendance,
                                          MAX(a.aggregate_attendance) as max_attendance
                                       FROM attendance a
                                       JOIN users u ON a.user_id = u.id
                                       WHERE u.section = :section
                                       GROUP BY u.section");
            
            $stmt->bindParam(':section', $section);
            $stmt->execute();
            
            return $stmt->fetch();
        } catch (PDOException $e) {
            echo "Error getting attendance stats: " . $e->getMessage();
            return false;
        }
    }
}

// Example usage with sample data
function populateSampleAttendance($conn, $userIds) {
    $attendance = new Attendance($conn);
    
    // Sample attendance data
    $attendance->recordAttendance($userIds[0], 85.5, 90.2, 78.6); // John Smith
    $attendance->recordAttendance($userIds[1], 92.0, 88.5, 94.3); // Sarah Johnson
    
    return true;
}

// Uncomment to test
// include_once 'users.php';
// $userIds = populateSampleUsers($conn);
// populateSampleAttendance($conn, $userIds);
// $attendanceObj = new Attendance($conn);
// $attendanceRecords = $attendanceObj->getAllAttendanceWithNames();
// echo "<pre>"; print_r($attendanceRecords); echo "</pre>";
?>