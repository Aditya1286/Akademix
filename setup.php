<?php
// Initial setup script to create database, tables, and sample data

// Include database connection
include_once 'db/db.php';

// Include all class files
include_once 'tables/users.php';
include_once 'tables/attendance.php';
include_once 'tables/fee_system.php';
include_once 'tables/assignments.php';
include_once 'tables/resources.php';
include_once 'tables/results.php';
include_once 'tables/feedback.php';

// Create database and tables
try {
    // Run the database setup script
    include_once 'db/setup.php';
    
    echo "<h2>Database setup completed successfully</h2>";
    
    // Add sample data
    echo "<h3>Adding sample data...</h3>";
    
    // Add users
    $userIds = populateSampleUsers($conn);
    echo "- Added 2 sample users<br>";
    
    // Add attendance records
    populateSampleAttendance($conn, $userIds);
    echo "- Added attendance records<br>";
    
    // Add fee records
    populateSampleFees($conn, $userIds);
    echo "- Added fee records<br>";
    
    // Add assignment records
    populateSampleAssignments($conn, $userIds);
    echo "- Added assignment records<br>";
    
    // Add resources
    populateSampleResources($conn);
    echo "- Added resources<br>";
    
    // Add results
    populateSampleResults($conn, $userIds);
    echo "- Added results<br>";
    
    // Add feedback
    populateSampleFeedback($conn, $userIds);
    echo "- Added feedback<br>";
    
    echo "<h3>Setup completed successfully!</h3>";
    echo "<p>You can now access the <a href='dashboard/dashboard.php'>Dashboard</a></p>";
    
} catch (PDOException $e) {
    die("Setup Error: " . $e->getMessage());
}
?>