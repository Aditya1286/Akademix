<?php
// Include database connection
include_once '../db/db.php';

class Dashboard {
    private $conn;
    
    public function __construct($db) {
        $this->conn = $db;
    }
    
    // Get complete data for a specific student
    public function getStudentData($user_id) {
        try {
            $stmt = $this->conn->prepare("
                SELECT 
                    u.id,
                    u.name,
                    u.email,
                    u.section,
                    a.sub1_attendance,
                    a.sub2_attendance,
                    a.sub3_attendance,
                    a.aggregate_attendance,
                    f.total_fee,
                    f.fee_paid,
                    f.fee_due,
                    f.payment_date,
                    ass.a1,
                    ass.a2,
                    ass.a3,
                    ass.total_score AS assignments_total,
                    r.sem1,
                    r.sem2,
                    r.total_marks,
                    r.percentage
                FROM 
                    users u
                LEFT JOIN 
                    attendance a ON u.id = a.user_id
                LEFT JOIN 
                    fee_system f ON u.id = f.user_id
                LEFT JOIN 
                    assignments ass ON u.id = ass.user_id
                LEFT JOIN 
                    results r ON u.id = r.user_id
                WHERE 
                    u.id = :user_id
            ");
            
            $stmt->bindParam(':user_id', $user_id);
            $stmt->execute();
            
            return $stmt->fetch();
        } catch (PDOException $e) {
            echo "Error fetching student data: " . $e->getMessage();
            return false;
        }
    }
    
    // Get all student data combined for the dashboard
    public function getAllStudentsData() {
        try {
            $stmt = $this->conn->query("
                SELECT 
                    u.id,
                    u.name,
                    u.email,
                    u.section,
                    a.aggregate_attendance,
                    f.fee_due,
                    f.payment_date,
                    ass.total_score AS assignments_total,
                    r.percentage
                FROM 
                    users u
                LEFT JOIN 
                    attendance a ON u.id = a.user_id
                LEFT JOIN 
                    fee_system f ON u.id = f.user_id
                LEFT JOIN 
                    assignments ass ON u.id = ass.user_id
                LEFT JOIN 
                    results r ON u.id = r.user_id
                ORDER BY 
                    u.section, u.name
            ");
            
            return $stmt->fetchAll();
        } catch (PDOException $e) {
            echo "Error fetching all students data: " . $e->getMessage();
            return false;
        }
    }
    
    // Get dashboard summary statistics
    public function getDashboardSummary() {
        try {
            $summary = [];
            
            // Total students count
            $stmt = $this->conn->query("SELECT COUNT(*) as total_students FROM users");
            $summary['total_students'] = $stmt->fetch()['total_students'];
            
            // Section-wise student count
            $stmt = $this->conn->query("SELECT section, COUNT(*) as count FROM users GROUP BY section");
            $summary['section_counts'] = $stmt->fetchAll();
            
            // Average attendance
            $stmt = $this->conn->query("SELECT AVG(aggregate_attendance) as avg_attendance FROM attendance");
            $summary['avg_attendance'] = $stmt->fetch()['avg_attendance'];
            
            // Total fee dues
            $stmt = $this->conn->query("SELECT SUM(fee_due) as total_dues FROM fee_system");
            $summary['total_fee_dues'] = $stmt->fetch()['total_dues'];
            
            // Average assignment score
            $stmt = $this->conn->query("SELECT AVG(total_score) as avg_assignment FROM assignments");
            $summary['avg_assignment_score'] = $stmt->fetch()['avg_assignment'];
            
            // Average result percentage
            $stmt = $this->conn->query("SELECT AVG(percentage) as avg_percentage FROM results");
            $summary['avg_result_percentage'] = $stmt->fetch()['avg_percentage'];
            
            return $summary;
        } catch (PDOException $e) {
            echo "Error fetching dashboard summary: " . $e->getMessage();
            return false;
        }
    }
    
    // Get section-wise performance metrics
    public function getSectionPerformance() {
        try {
            $stmt = $this->conn->query("
                SELECT 
                    u.section,
                    COUNT(u.id) as student_count,
                    AVG(a.aggregate_attendance) as avg_attendance,
                    AVG(ass.total_score) as avg_assignment,
                    AVG(r.percentage) as avg_result,
                    SUM(f.fee_due) as total_dues
                FROM 
                    users u
                LEFT JOIN 
                    attendance a ON u.id = a.user_id
                LEFT JOIN 
                    assignments ass ON u.id = ass.user_id
                LEFT JOIN 
                    results r ON u.id = r.user_id
                LEFT JOIN 
                    fee_system f ON u.id = f.user_id
                GROUP BY 
                    u.section
            ");
            
            return $stmt->fetchAll();
        } catch (PDOException $e) {
            echo "Error fetching section performance: " . $e->getMessage();
            return false;
        }
    }
    
    // Get student overall ranking
    public function getStudentRankings() {
        try {
            $stmt = $this->conn->query("
                SELECT 
                    u.id,
                    u.name,
                    u.section,
                    a.aggregate_attendance,
                    ass.total_score as assignment_score,
                    r.percentage as result_percentage,
                    (a.aggregate_attendance * 0.3 + ass.total_score/3 * 0.3 + r.percentage * 0.4) as overall_score
                FROM 
                    users u
                LEFT JOIN 
                    attendance a ON u.id = a.user_id
                LEFT JOIN 
                    assignments ass ON u.id = ass.user_id
                LEFT JOIN 
                    results r ON u.id = r.user_id
                ORDER BY 
                    overall_score DESC
            ");
            
            return $stmt->fetchAll();
        } catch (PDOException $e) {
            echo "Error fetching student rankings: " . $e->getMessage();
            return false;
        }
    }
}

// Example usage
// $dashboard = new Dashboard($conn);
// $allStudentsData = $dashboard->getAllStudentsData();
// $dashboardSummary = $dashboard->getDashboardSummary();
// $sectionPerformance = $dashboard->getSectionPerformance();

// Display dashboard data in HTML format for testing
// echo "<h2>All Students Data</h2>";
// echo "<table border='1'>";
// echo "<tr><th>ID</th><th>Name</th><th>Email</th><th>Section</th><th>Attendance</th><th>Fee Due</th>
//      <th>Assignments</th><th>Results</th></tr>";

// foreach ($allStudentsData as $student) {
//     echo "<tr>";
//     echo "<td>{$student['id']}</td>";
//     echo "<td>{$student['name']}</td>";
//     echo "<td>{$student['email']}</td>";
//     echo "<td>{$student['section']}</td>";
//     echo "<td>{$student['aggregate_attendance']}%</td>";
//     echo "<td>₹{$student['fee_due']}</td>";
//     echo "<td>{$student['assignments_total']}</td>";
//     echo "<td>{$student['percentage']}%</td>";
//     echo "</tr>";
// }
// echo "</table>";

// echo "<h2>Dashboard Summary</h2>";
// echo "<pre>"; print_r($dashboardSummary); echo "</pre>";

// echo "<h2>Section Performance</h2>";
// echo "<pre>"; print_r($sectionPerformance); echo "</pre>";
?>