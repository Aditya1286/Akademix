<?php
include_once '../db/db.php';

class Resources {
    private $conn;

    public function __construct($db) {
        $this->conn = $db;
    }

    private function jsonResponse($status, $message, $data = null) {
        echo json_encode(["status" => $status, "message" => $message, "data" => $data]);
        exit;
    }

    public function addResource($section, $title, $r1, $r2, $r3) {
        try {
            $stmt = $this->conn->prepare("INSERT INTO resources (section, title, r1, r2, r3) 
                                          VALUES (:section, :title, :r1, :r2, :r3)");
            $stmt->execute(compact("section", "title", "r1", "r2", "r3"));
            $this->jsonResponse("success", "Resource added successfully");
        } catch (PDOException $e) {
            $this->jsonResponse("error", $e->getMessage());
        }
    }

    public function getResourcesBySection($section) {
        try {
            $stmt = $this->conn->prepare("SELECT * FROM resources WHERE section = :section");
            $stmt->execute(["section" => $section]);
            $this->jsonResponse("success", "Resources fetched", $stmt->fetchAll());
        } catch (PDOException $e) {
            $this->jsonResponse("error", $e->getMessage());
        }
    }

    public function getAllResources() {
        try {
            $stmt = $this->conn->query("SELECT * FROM resources ORDER BY section, title");
            $this->jsonResponse("success", "All resources fetched", $stmt->fetchAll());
        } catch (PDOException $e) {
            $this->jsonResponse("error", $e->getMessage());
        }
    }

    public function updateResource($id, $title, $r1, $r2, $r3) {
        try {
            $stmt = $this->conn->prepare("UPDATE resources SET title=:title, r1=:r1, r2=:r2, r3=:r3 WHERE id=:id");
            $stmt->execute(compact("id", "title", "r1", "r2", "r3"));
            $this->jsonResponse("success", "Resource updated");
        } catch (PDOException $e) {
            $this->jsonResponse("error", $e->getMessage());
        }
    }

    public function deleteResource($id) {
        try {
            $stmt = $this->conn->prepare("DELETE FROM resources WHERE id=:id");
            $stmt->execute(["id" => $id]);
            $this->jsonResponse("success", "Resource deleted");
        } catch (PDOException $e) {
            $this->jsonResponse("error", $e->getMessage());
        }
    }
}

// API Handling
header("Content-Type: application/json");

$resources = new Resources($conn);
$requestMethod = $_SERVER["REQUEST_METHOD"];

if ($requestMethod === "POST") {
    $data = json_decode(file_get_contents("php://input"), true);
    if (isset($data["action"])) {
        switch ($data["action"]) {
            case "add":
                $resources->addResource($data["section"], $data["title"], $data["r1"], $data["r2"], $data["r3"]);
                break;
            case "update":
                $resources->updateResource($data["id"], $data["title"], $data["r1"], $data["r2"], $data["r3"]);
                break;
            case "delete":
                $resources->deleteResource($data["id"]);
                break;
        }
    }
} elseif ($requestMethod === "GET") {
    if (isset($_GET["section"])) {
        $resources->getResourcesBySection($_GET["section"]);
    } else {
        $resources->getAllResources();
    }
}
?>
