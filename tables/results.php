<?php
// Include database connection
include_once '../db/db.php';

class Results {
    private $conn;
    
    public function __construct($db) {
        $this->conn = $db;
    }
    
    // Record results for a student
    public function recordResult($user_id, $sem1, $sem2) {
        try {
            $stmt = $this->conn->prepare("INSERT INTO results (user_id, sem1, sem2) 
                                        VALUES (:user_id, :sem1, :sem2)");
            
            $stmt->bindParam(':user_id', $user_id);
            $stmt->bindParam(':sem1', $sem1);
            $stmt->bindParam(':sem2', $sem2);
            
            return $stmt->execute();
        } catch (PDOException $e) {
            echo "Error recording result: " . $e->getMessage();
            return false;
        }
    }
    
    // Get results for a student
    public function getResultByUserId($user_id) {
        try {
            $stmt = $this->conn->prepare("SELECT * FROM results WHERE user_id = :user_id");
            $stmt->bindParam(':user_id', $user_id);
            $stmt->execute();
            
            return $stmt->fetch();
        } catch (PDOException $e) {
            echo "Error fetching result: " . $e->getMessage();
            return false;
        }
    }
    
    // Get all results with student names
    public function getAllResultsWithNames() {
        try {
            $stmt = $this->conn->query("SELECT r.id, u.name, u.section, r.sem1, r.sem2, r.total_marks, r.percentage 
                                      FROM results r
                                      JOIN users u ON r.user_id = u.id
                                      ORDER BY u.section, r.percentage DESC");
            
            return $stmt->fetchAll();
        } catch (PDOException $e) {
            echo "Error fetching results: " . $e->getMessage();
            return false;
        }
    }
    
    // Get results by section
    public function getResultsBySection($section) {
        try {
            $stmt = $this->conn->prepare("SELECT r.id, u.name, r.sem1, r.sem2, r.total_marks, r.percentage 
                                        FROM results r
                                        JOIN users u ON r.user_id = u.id
                                        WHERE u.section = :section
                                        ORDER BY r.percentage DESC");
            
            $stmt->bindParam(':section', $section);
            $stmt->execute();
            
            return $stmt->fetchAll();
        } catch (PDOException $e) {
            echo "Error fetching results by section: " . $e->getMessage();
            return false;
        }
    }
    
    // Update results
    public function updateResult($id, $sem1, $sem2) {
        try {
            $stmt = $this->conn->prepare("UPDATE results 
                                        SET sem1 = :sem1, sem2 = :sem2 
                                        WHERE id = :id");
            
            $stmt->bindParam(':id', $id);
            $stmt->bindParam(':sem1', $sem1);
            $stmt->bindParam(':sem2', $sem2);
            
            return $stmt->execute();
        } catch (PDOException $e) {
            echo "Error updating result: " . $e->getMessage();
            return false;
        }
    }
    
    // Get performance statistics by section
    public function getPerformanceStatsBySection() {
        try {
            $stmt = $this->conn->query("SELECT 
                                          u.section,
                                          COUNT(r.id) as student_count,
                                          AVG(r.sem1) as avg_sem1,
                                          AVG(r.sem2) as avg_sem2,
                                          AVG(r.total_marks) as avg_total,
                                          AVG(r.percentage) as avg_percentage,
                                          MAX(r.percentage) as highest_percentage,
                                          MIN(r.percentage) as lowest_percentage
                                       FROM results r
                                       JOIN users u ON r.user_id = u.id
                                       GROUP BY u.section");
            
            return $stmt->fetchAll();
        } catch (PDOException $e) {
            echo "Error getting performance stats: " . $e->getMessage();
            return false;
        }
    }
}

// Example usage with sample data
function populateSampleResults($conn, $userIds) {
    $results = new Results($conn);
    
    // Sample results data
    $results->recordResult($userIds[0], 82.5, 87.0); // John Smith
    $results->recordResult($userIds[1], 88.0, 91.5); // Sarah Johnson
    
    return true;
}

// Uncomment to test
// include_once 'users.php';
// $userIds = populateSampleUsers($conn);
// populateSampleResults($conn, $userIds);
// $resultsObj = new Results($conn);
// $resultRecords = $resultsObj->getAllResultsWithNames();
// echo "<pre>"; print_r($resultRecords); echo "</pre>";
?>