<?php
// Include database connection
include_once '../db/db.php';

class Assignments {
    private $conn;
    
    public function __construct($db) {
        $this->conn = $db;
    }
    
    // Record assignment scores for a student
    public function recordAssignment($user_id, $section, $a1, $a2, $a3) {
        try {
            $stmt = $this->conn->prepare("INSERT INTO assignments (user_id, section, a1, a2, a3) 
                                        VALUES (:user_id, :section, :a1, :a2, :a3)");
            
            $stmt->bindParam(':user_id', $user_id);
            $stmt->bindParam(':section', $section);
            $stmt->bindParam(':a1', $a1);
            $stmt->bindParam(':a2', $a2);
            $stmt->bindParam(':a3', $a3);
            
            return $stmt->execute();
        } catch (PDOException $e) {
            echo "Error recording assignment: " . $e->getMessage();
            return false;
        }
    }
    
    // Get assignment records for a student
    public function getAssignmentByUserId($user_id) {
        try {
            $stmt = $this->conn->prepare("SELECT * FROM assignments WHERE user_id = :user_id");
            $stmt->bindParam(':user_id', $user_id);
            $stmt->execute();
            
            return $stmt->fetch();
        } catch (PDOException $e) {
            echo "Error fetching assignment: " . $e->getMessage();
            return false;
        }
    }
    
    // Get all assignment records with student names
    public function getAllAssignmentsWithNames() {
        try {
            $stmt = $this->conn->query("SELECT a.id, u.name, a.section, a.a1, a.a2, a.a3, a.total_score 
                                      FROM assignments a
                                      JOIN users u ON a.user_id = u.id
                                      ORDER BY a.section, u.name");
            
            return $stmt->fetchAll();
        } catch (PDOException $e) {
            echo "Error fetching assignments: " . $e->getMessage();
            return false;
        }
    }
    
    // Get assignments by section
    public function getAssignmentsBySection($section) {
        try {
            $stmt = $this->conn->prepare("SELECT a.id, u.name, a.a1, a.a2, a.a3, a.total_score 
                                        FROM assignments a
                                        JOIN users u ON a.user_id = u.id
                                        WHERE a.section = :section
                                        ORDER BY u.name");
            
            $stmt->bindParam(':section', $section);
            $stmt->execute();
            
            return $stmt->fetchAll();
        } catch (PDOException $e) {
            echo "Error fetching assignments by section: " . $e->getMessage();
            return false;
        }
    }
    
    // Update assignment scores
    public function updateAssignment($id, $a1, $a2, $a3) {
        try {
            $stmt = $this->conn->prepare("UPDATE assignments 
                                        SET a1 = :a1, a2 = :a2, a3 = :a3 
                                        WHERE id = :id");
            
            $stmt->bindParam(':id', $id);
            $stmt->bindParam(':a1', $a1);
            $stmt->bindParam(':a2', $a2);
            $stmt->bindParam(':a3', $a3);
            
            return $stmt->execute();
        } catch (PDOException $e) {
            echo "Error updating assignment: " . $e->getMessage();
            return false;
        }
    }
    
    // Get assignment statistics
    public function getAssignmentStats() {
        try {
            $stmt = $this->conn->query("SELECT 
                                          section,
                                          COUNT(*) as student_count,
                                          AVG(a1) as avg_a1,
                                          AVG(a2) as avg_a2,
                                          AVG(a3) as avg_a3,
                                          AVG(total_score) as avg_total
                                       FROM assignments
                                       GROUP BY section");
            
            return $stmt->fetchAll();
        } catch (PDOException $e) {
            echo "Error getting assignment stats: " . $e->getMessage();
            return false;
        }
    }
}

// Example usage with sample data
function populateSampleAssignments($conn, $userIds) {
    $assignments = new Assignments($conn);
    
    // Get user details to use section
    $stmt = $conn->prepare("SELECT id, section FROM users WHERE id = ?");
    
    // For John Smith
    $stmt->execute([$userIds[0]]);
    $user1 = $stmt->fetch();
    $assignments->recordAssignment($userIds[0], $user1['section'], 85, 78, 92);
    
    // For Sarah Johnson
    $stmt->execute([$userIds[1]]);
    $user2 = $stmt->fetch();
    $assignments->recordAssignment($userIds[1], $user2['section'], 90, 85, 88);
    
    return true;
}

// Uncomment to test
// include_once 'users.php';
// $userIds = populateSampleUsers($conn);
// populateSampleAssignments($conn, $userIds);
// $assignmentsObj = new Assignments($conn);
// $assignmentRecords = $assignmentsObj->getAllAssignmentsWithNames();
// echo "<pre>"; print_r($assignmentRecords); echo "</pre>";
?>