<?php
// Include database connection
include_once '../db/db.php';

class FeeSystem {
    private $conn;
    
    public function __construct($db) {
        $this->conn = $db;
    }
    
    // Record fee payment for a student
    public function recordFeePayment($user_id, $total_fee, $fee_paid, $payment_date) {
        try {
            $stmt = $this->conn->prepare("INSERT INTO fee_system (user_id, total_fee, fee_paid, payment_date) 
                                        VALUES (:user_id, :total_fee, :fee_paid, :payment_date)");
            
            $stmt->bindParam(':user_id', $user_id);
            $stmt->bindParam(':total_fee', $total_fee);
            $stmt->bindParam(':fee_paid', $fee_paid);
            $stmt->bindParam(':payment_date', $payment_date);
            
            return $stmt->execute();
        } catch (PDOException $e) {
            echo "Error recording fee payment: " . $e->getMessage();
            return false;
        }
    }
    
    // Get fee records for a student
    public function getFeesByUserId($user_id) {
        try {
            $stmt = $this->conn->prepare("SELECT * FROM fee_system WHERE user_id = :user_id ORDER BY payment_date DESC");
            $stmt->bindParam(':user_id', $user_id);
            $stmt->execute();
            
            return $stmt->fetchAll();
        } catch (PDOException $e) {
            echo "Error fetching fees: " . $e->getMessage();
            return false;
        }
    }
    
    // Get all fee records with student names
    public function getAllFeesWithNames() {
        try {
            $stmt = $this->conn->query("SELECT f.id, u.name, u.section, f.total_fee, f.fee_paid, f.fee_due, f.payment_date 
                                      FROM fee_system f
                                      JOIN users u ON f.user_id = u.id
                                      ORDER BY f.payment_date DESC");
            
            return $stmt->fetchAll();
        } catch (PDOException $e) {
            echo "Error fetching fee records: " . $e->getMessage();
            return false;
        }
    }
    
    // Get total fee status for each student
    public function getStudentFeeStatus() {
        try {
            $stmt = $this->conn->query("SELECT 
                                          u.id as user_id,
                                          u.name, 
                                          u.section,
                                          SUM(f.total_fee) as total_fee_amount,
                                          SUM(f.fee_paid) as total_fee_paid,
                                          SUM(f.fee_due) as total_fee_due,
                                          MAX(f.payment_date) as last_payment_date
                                       FROM users u
                                       LEFT JOIN fee_system f ON u.id = f.user_id
                                       GROUP BY u.id, u.name, u.section
                                       ORDER BY u.section, u.name");
            
            return $stmt->fetchAll();
        } catch (PDOException $e) {
            echo "Error getting fee status: " . $e->getMessage();
            return false;
        }
    }
    
    // Update fee payment
    public function updateFeePayment($id, $fee_paid, $payment_date) {
        try {
            $stmt = $this->conn->prepare("UPDATE fee_system 
                                        SET fee_paid = :fee_paid, 
                                            payment_date = :payment_date 
                                        WHERE id = :id");
            
            $stmt->bindParam(':id', $id);
            $stmt->bindParam(':fee_paid', $fee_paid);
            $stmt->bindParam(':payment_date', $payment_date);
            
            return $stmt->execute();
        } catch (PDOException $e) {
            echo "Error updating fee payment: " . $e->getMessage();
            return false;
        }
    }
}

// Example usage with sample data
function populateSampleFees($conn, $userIds) {
    $feeSystem = new FeeSystem($conn);
    
    // Sample fee data
    $today = date('Y-m-d');
    
    // For John Smith
    $feeSystem->recordFeePayment($userIds[0], 15000, 10000, $today);
    
    // For Sarah Johnson
    $feeSystem->recordFeePayment($userIds[1], 15000, 12000, $today);
    
    return true;
}

// Uncomment to test
// include_once 'users.php';
// $userIds = populateSampleUsers($conn);
// populateSampleFees($conn, $userIds);
// $feeObj = new FeeSystem($conn);
// $feeRecords = $feeObj->getAllFeesWithNames();
// echo "<pre>"; print_r($feeRecords); echo "</pre>";
?>