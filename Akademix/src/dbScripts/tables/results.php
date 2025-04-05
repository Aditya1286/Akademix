<?php
// Include database connection
include_once '../db/db.php';

class Results {
    private $conn;

    public function __construct($db) {
        $this->conn = $db;
    }

    private function jsonResponse($success, $data = null, $error = null) {
        return json_encode(["success" => $success, "data" => $data, "error" => $error]);
    }

    public function recordResult($user_id, $sem1, $sem2) {
        try {
            $stmt = $this->conn->prepare("INSERT INTO results (user_id, sem1, sem2) VALUES (?, ?, ?)");
            $stmt->execute([$user_id, $sem1, $sem2]);
            return $this->jsonResponse(true, ["result_id" => $this->conn->lastInsertId()]);
        } catch (PDOException $e) {
            return $this->jsonResponse(false, null, $e->getMessage());
        }
    }

    public function getResultByUserId($user_id) {
        try {
            $stmt = $this->conn->prepare("SELECT * FROM results WHERE user_id = ?");
            $stmt->execute([$user_id]);
            return $this->jsonResponse(true, $stmt->fetch());
        } catch (PDOException $e) {
            return $this->jsonResponse(false, null, $e->getMessage());
        }
    }

    public function getAllResultsWithNames() {
        try {
            $stmt = $this->conn->query("SELECT r.id, u.name, u.section, r.sem1, r.sem2, r.total_marks, r.percentage 
                                        FROM results r
                                        JOIN users u ON r.user_id = u.id
                                        ORDER BY u.section, r.percentage DESC");
            return $this->jsonResponse(true, $stmt->fetchAll());
        } catch (PDOException $e) {
            return $this->jsonResponse(false, null, $e->getMessage());
        }
    }

    public function getResultsBySection($section) {
        try {
            $stmt = $this->conn->prepare("SELECT r.id, u.name, r.sem1, r.sem2, r.total_marks, r.percentage 
                                          FROM results r
                                          JOIN users u ON r.user_id = u.id
                                          WHERE u.section = ?
                                          ORDER BY r.percentage DESC");
            $stmt->execute([$section]);
            return $this->jsonResponse(true, $stmt->fetchAll());
        } catch (PDOException $e) {
            return $this->jsonResponse(false, null, $e->getMessage());
        }
    }

    public function updateResult($id, $sem1, $sem2) {
        try {
            $stmt = $this->conn->prepare("UPDATE results SET sem1 = ?, sem2 = ? WHERE id = ?");
            return $this->jsonResponse($stmt->execute([$sem1, $sem2]));
        } catch (PDOException $e) {
            return $this->jsonResponse(false, null, $e->getMessage());
        }
    }

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
            return $this->jsonResponse(true, $stmt->fetchAll());
        } catch (PDOException $e) {
            return $this->jsonResponse(false, null, $e->getMessage());
        }
    }
}
?>
