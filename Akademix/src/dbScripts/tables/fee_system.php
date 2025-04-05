<?php
// Include database connection
include_once '../db/db.php';

class FeeSystem {
    private $conn;

    public function __construct($db) {
        $this->conn = $db;
    }

    // Record fee payment
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
            return json_encode(["error" => "Error recording fee: " . $e->getMessage()]);
        }
    }

    // Get all fee records with student names
    public function getAllFeesWithNames() {
        try {
            $stmt = $this->conn->query("SELECT f.id, u.name, u.section, f.total_fee, f.fee_paid, f.payment_date 
                                        FROM fee_system f
                                        JOIN users u ON f.user_id = u.id
                                        ORDER BY f.payment_date DESC");
            return json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
        } catch (PDOException $e) {
            return json_encode(["error" => "Error fetching fees: " . $e->getMessage()]);
        }
    }
}

// Example usage
$feeObj = new FeeSystem($conn);
header('Content-Type: application/json');
echo $feeObj->getAllFeesWithNames();
?>
