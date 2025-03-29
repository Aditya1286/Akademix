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
        return $this->executeQuery(
            "INSERT INTO feedback (user_id, title, query) VALUES (:user_id, :title, :query)",
            compact('user_id', 'title', 'query')
        );
    }

    // Get feedback by user ID
    public function getFeedbackByUserId($user_id) {
        return $this->fetchAll("SELECT * FROM feedback WHERE user_id = :user_id ORDER BY submission_date DESC", compact('user_id'));
    }

    // Get all feedback with student names
    public function getAllFeedbackWithNames() {
        return $this->fetchAll("SELECT f.id, u.name, u.section, f.title, f.query, f.submission_date FROM feedback f JOIN users u ON f.user_id = u.id ORDER BY f.submission_date DESC");
    }

    // Get feedback by section
    public function getFeedbackBySection($section) {
        return $this->fetchAll("SELECT f.id, u.name, f.title, f.query, f.submission_date FROM feedback f JOIN users u ON f.user_id = u.id WHERE u.section = :section ORDER BY f.submission_date DESC", compact('section'));
    }

    // Delete feedback
    public function deleteFeedback($id) {
        return $this->executeQuery("DELETE FROM feedback WHERE id = :id", compact('id'));
    }

    // Execute a query
    private function executeQuery($sql, $params) {
        try {
            $stmt = $this->conn->prepare($sql);
            return $stmt->execute($params) ? ['success' => true] : ['success' => false];
        } catch (PDOException $e) {
            return ['error' => $e->getMessage()];
        }
    }

    // Fetch all results
    private function fetchAll($sql, $params = []) {
        try {
            $stmt = $this->conn->prepare($sql);
            $stmt->execute($params);
            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            return ['error' => $e->getMessage()];
        }
    }
}

// Example usage
header('Content-Type: application/json');
$feedback = new Feedback($conn);
echo json_encode($feedback->getAllFeedbackWithNames());
?>
