<?php
// Check if the database has been set up
$dbFile = 'db/db.php';
$setupComplete = file_exists($dbFile);

if (!$setupComplete) {
    // Redirect to setup
    header('Location: setup.php');
    exit;
} else {
    // Redirect to dashboard
    header('Location: dashboard/dashboard.php');
    exit;
}
?>