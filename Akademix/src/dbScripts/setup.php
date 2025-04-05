<?php
// Initial setup script to create database, tables, and sample data

header("Content-Type: application/json");

// Include database connection
include_once 'db/db.php';
// Include all class files
$classFiles = [
    'users', 'attendance', 'fee_system', 'assignments',
    'resources', 'results', 'feedback'
];

foreach ($classFiles as $file) {
    include_once "tables/$file.php";
}

// Run database setup
try {
    include_once 'db/setup.php';

    // Populate sample data
    $userIds = populateSampleUsers($conn);
    populateSampleAttendance($conn, $userIds);
    populateSampleFees($conn, $userIds);
    populateSampleAssignments($conn, $userIds);
    populateSampleResources($conn);
    populateSampleResults($conn, $userIds);
    populateSampleFeedback($conn, $userIds);

    echo json_encode([
        "status" => "success",
        "message" => "Database setup completed successfully",
        "redirect" => "dashboard/dashboard.php"
    ]);
} catch (PDOException $e) {
    echo json_encode([
        "status" => "error",
        "message" => "Setup Error: " . $e->getMessage()
    ]);
}
?>
