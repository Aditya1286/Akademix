<?php
// Include database connection
include_once '../db/db.php';

class Resources {
    private $conn;
    
    public function __construct($db) {
        $this->conn = $db;
    }
    
    // Add resources for a section
    public function addResource($section, $title, $r1, $r2, $r3) {
        try {
            $stmt = $this->conn->prepare("INSERT INTO resources (section, title, r1, r2, r3) 
                                        VALUES (:section, :title, :r1, :r2, :r3)");
            
            $stmt->bindParam(':section', $section);
            $stmt->bindParam(':title', $title);
            $stmt->bindParam(':r1', $r1);
            $stmt->bindParam(':r2', $r2);
            $stmt->bindParam(':r3', $r3);
            
            return $stmt->execute();
        } catch (PDOException $e) {
            echo "Error adding resource: " . $e->getMessage();
            return false;
        }
    }
    
    // Get resources by section
    public function getResourcesBySection($section) {
        try {
            $stmt = $this->conn->prepare("SELECT * FROM resources WHERE section = :section");
            $stmt->bindParam(':section', $section);
            $stmt->execute();
            
            return $stmt->fetchAll();
        } catch (PDOException $e) {
            echo "Error fetching resources: " . $e->getMessage();
            return false;
        }
    }
    
    // Get all resources
    public function getAllResources() {
        try {
            $stmt = $this->conn->query("SELECT * FROM resources ORDER BY section, title");
            return $stmt->fetchAll();
        } catch (PDOException $e) {
            echo "Error fetching all resources: " . $e->getMessage();
            return false;
        }
    }
    
    // Update resource
    public function updateResource($id, $title, $r1, $r2, $r3) {
        try {
            $stmt = $this->conn->prepare("UPDATE resources 
                                        SET title = :title, r1 = :r1, r2 = :r2, r3 = :r3 
                                        WHERE id = :id");
            
            $stmt->bindParam(':id', $id);
            $stmt->bindParam(':title', $title);
            $stmt->bindParam(':r1', $r1);
            $stmt->bindParam(':r2', $r2);
            $stmt->bindParam(':r3', $r3);
            
            return $stmt->execute();
        } catch (PDOException $e) {
            echo "Error updating resource: " . $e->getMessage();
            return false;
        }
    }
    
    // Delete resource
    public function deleteResource($id) {
        try {
            $stmt = $this->conn->prepare("DELETE FROM resources WHERE id = :id");
            $stmt->bindParam(':id', $id);
            
            return $stmt->execute();
        } catch (PDOException $e) {
            echo "Error deleting resource: " . $e->getMessage();
            return false;
        }
    }
}

// Example usage with sample data
function populateSampleResources($conn) {
    $resources = new Resources($conn);
    
    // Sample resources for Section A
    $resources->addResource(
        'A',
        'Mathematics Resources',
        'https://example.com/math_textbook',
        'https://example.com/math_exercises',
        'https://example.com/math_solutions'
    );
    
    // Sample resources for Section B
    $resources->addResource(
        'B',
        'Science Resources',
        'https://example.com/science_textbook',
        'https://example.com/science_experiments',
        'https://example.com/science_videos'
    );
    
    return true;
}

// Uncomment to test
// populateSampleResources($conn);
// $resourcesObj = new Resources($conn);
// $resourceRecords = $resourcesObj->getAllResources();
// echo "<pre>"; print_r($resourceRecords); echo "</pre>";
?>