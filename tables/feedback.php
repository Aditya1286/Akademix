<?php
// Include database connection
include_once '../db/db.php';

class Feedback {
    private $conn;
    
    public function __construct($db) {
        $this->conn = $db;
    }
    
    // Submit feedback
    public function submitFeedback($user_id, $title, $query) {
        try {
            $stmt = $this->conn->prepare("INSERT INTO feedback (user_id, title, query) 
                                        VALUES (:user_id, :title, :query)");
            
            $stmt->bindParam(':user_id', $user_id);
            $stmt->bindParam(':title', $title);
            $stmt->bindParam(':query', $query);
            
            return $stmt->execute();
        } catch (PDOException $e) {
            echo "Error submitting feedback: " . $e->getMessage();
            return false;
        }
    }
    
    // Get feedback by user ID
    public function getFeedbackByUserId($user_id) {
        try {
            $stmt = $this->conn->prepare("SELECT * FROM feedback WHERE user_id = :user_id ORDER BY submission_date DESC");
            $stmt->bindParam(':user_id', $user_id);
            $stmt->execute();
            
            return $stmt->fetchAll();
        } catch (PDOException $e) {
            echo "Error fetching feedback: " . $e->getMessage();
            return false;
        }
    }
    
    // Get all feedback with student names
    public function getAllFeedbackWithNames() {
        try {
            $stmt = $this->conn->query("SELECT f.id, u.name, u.section, f.title, f.query, f.submission_date 
                                      FROM feedback f
                                      JOIN users u ON f.user_id = u.id
                                      ORDER BY f.submission_date DESC");
            
            return $stmt->fetchAll();
        } catch (PDOException $e) {
            echo "Error fetching all feedback: " . $e->getMessage();
            return false;
        }
    }
    
    // Get feedback by section
    public function getFeedbackBySection($section) {
        try {
            $stmt = $this->conn->prepare("SELECT f.id, u.name, f.title, f.query, f.submission_date 
                                        FROM feedback f
                                        JOIN users u ON f.user_id = u.id
                                        WHERE u.section = :section
                                        ORDER BY f.submission_date DESC");
            
            $stmt->bindParam(':section', $section);
            $stmt->execute();
            
            return $stmt->fetchAll();
        } catch (PDOException $e) {
            echo "Error fetching feedback by section: " . $e->getMessage();
            return false;
        }
    }
    
    // Delete feedback
    public function deleteFeedback($id) {
        try {
            $stmt = $this->conn->prepare("DELETE FROM feedback WHERE id = :id");
            $stmt->bindParam(':id', $id);
            
            return $stmt->execute();
        } catch (PDOException $e) {
            echo "Error deleting feedback: " . $e->getMessage();
            return false;
        }
    }
}

// Example usage with sample data
function populateSampleFeedback($conn, $userIds) {
    $feedback = new Feedback($conn);
    
    // Sample feedback data
    $feedback->submitFeedback(
        $userIds[0], 
        'Question about Mathematics', 
        'I need more resources for advanced trigonometry. Are there any additional materials available?'
    );
    
    $feedback->submitFeedback(
        $userIds[1], 
        'Suggestion for Science Lab', 
        'It would be helpful if we could have more practical experiments in the curriculum.'
    );
    
    return true;
}

// Uncomment to test
// include_once 'users.php';
// $userIds = populateSampleUsers($conn);
// populateSampleFeedback($conn, $userIds);
// $feedbackObj = new Feedback($conn);
// $feedbackRecords = $feedbackObj->getAllFeedbackWithNames();
// echo "<pre>"; print_r($feedbackRecords); echo "</pre>";
?>