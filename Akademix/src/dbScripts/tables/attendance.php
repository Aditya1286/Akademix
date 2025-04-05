<?php
header('Content-Type: application/json');
include_once '../db/db.php';

class Attendance {
    private $conn;
    
    public function __construct($db) {
        $this->conn = $db;
    }
    
    public function recordAttendance($user_id, $section, $subjects) {
        try {
            foreach ($subjects as $subject => $attendance) {
                $stmt = $this->conn->prepare("INSERT INTO attendance (user_id, section, subject, attendance) 
                                              VALUES (:user_id, :section, :subject, :attendance)");
                
                $stmt->execute([
                    ':user_id' => $user_id,
                    ':section' => $section,
                    ':subject' => $subject,
                    ':attendance' => $attendance
                ]);
            }
            echo json_encode(["message" => "Attendance recorded successfully"]);
        } catch (PDOException $e) {
            echo json_encode(["error" => $e->getMessage()]);
        }
    }
    
    public function getAttendance($user_id) {
        try {
            $stmt = $this->conn->prepare("SELECT a.id, u.name, a.section, a.subject, a.attendance FROM attendance a 
                                          JOIN users u ON a.user_id = u.id WHERE a.user_id = :user_id");
            
            $stmt->execute([':user_id' => $user_id]);
            echo json_encode($stmt->fetchAll());
        } catch (PDOException $e) {
            echo json_encode(["error" => $e->getMessage()]);
        }
    }
    
    public function updateAttendance($user_id, $subjects) {
        try {
            foreach ($subjects as $subject => $attendance) {
                $stmt = $this->conn->prepare("UPDATE attendance SET attendance = :attendance 
                                              WHERE user_id = :user_id AND subject = :subject");
                
                $stmt->execute([
                    ':user_id' => $user_id,
                    ':subject' => $subject,
                    ':attendance' => $attendance
                ]);
            }
            echo json_encode(["message" => "Attendance updated successfully"]);
        } catch (PDOException $e) {
            echo json_encode(["error" => $e->getMessage()]);
        }
    }
}

$attendance = new Attendance($conn);
$input = json_decode(file_get_contents("php://input"), true);

is_string($input["action"]) !== "string" && die(json_encode(["error" => "Invalid action"]));

switch ($input["action"]) {
    case "record":
        $attendance->recordAttendance($input["user_id"], $input["section"], $input["subjects"]);
        break;
    case "get":
        $attendance->getAttendance($input["user_id"]);
        break;
    case "update":
        $attendance->updateAttendance($input["user_id"], $input["subjects"]);
        break;
    default:
        echo json_encode(["error" => "Invalid action"]);
}
?>
