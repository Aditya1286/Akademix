<?php
// Include database connection
include_once '../db/db.php';
include_once 'dashboard.php';

// Initialize dashboard
$dashboard = new Dashboard($conn);

// Get all students data
$allStudentsData = $dashboard->getAllStudentsData();

// Get dashboard summary
$dashboardSummary = $dashboard->getDashboardSummary();

// Get section performance
$sectionPerformance = $dashboard->getSectionPerformance();

// Get student rankings
$studentRankings = $dashboard->getStudentRankings();

// Function to display formatted table
function displayTable($data, $headers) {
    echo "<table border='1' cellpadding='5' cellspacing='0' style='border-collapse: collapse; width: 100%;'>";
    
    // Display headers
    echo "<tr style='background-color: #f2f2f2;'>";
    foreach ($headers as $header) {
        echo "<th style='text-align: left; padding: 8px;'>{$header}</th>";
    }
    echo "</tr>";
    
    // Display data
    $rowCount = 0;
    foreach ($data as $row) {
        $rowStyle = $rowCount % 2 == 0 ? "background-color: #ffffff;" : "background-color: #f9f9f9;";
        echo "<tr style='{$rowStyle}'>";
        
        foreach ($row as $key => $value) {
            // Skip keys that aren't in headers
            if (!in_array($key, array_keys($headers))) continue;
            
            // Format based on value type
            if (is_numeric($value) && strpos($key, 'percentage') !== false) {
                $formatted = number_format($value, 2) . '%';
            } else if (is_numeric($value) && (strpos($key, 'fee') !== false || strpos($key, 'dues') !== false)) {
                $formatted = '₹' . number_format($value, 2);
            } else if (is_numeric($value) && strpos($key, 'attendance') !== false) {
                $formatted = number_format($value, 2) . '%';
            } else {
                $formatted = $value;
            }
            
            echo "<td style='padding: 8px;'>{$formatted}</td>";
        }
        
        echo "</tr>";
        $rowCount++;
    }
    
    echo "</table>";
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>School Management System Dashboard</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 20px;
            background-color: #f8f9fa;
        }
        
        .container {
            max-width: 1200px;
            margin: 0 auto;
        }
        
        .dashboard-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
        }
        
        .card {
            background-color: #fff;
            border-radius: 5px;
            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
            padding: 20px;
            margin-bottom: 20px;
        }
        
        .stats-container {
            display: flex;
            flex-wrap: wrap;
            gap: 20px;
            margin-bottom: 20px;
        }
        
        .stat-card {
            background-color: #fff;
            border-radius: 5px;
            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
            padding: 15px;
            flex: 1;
            min-width: 200px;
        }
        
        .stat-value {
            font-size: 24px;
            font-weight: bold;
            margin: 10px 0;
        }
        
        .stat-label {
            color: #666;
            font-size: 14px;
        }
        
        h1, h2, h3 {
            color: #333;
        }
        
        table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
        }
        
        th, td {
            text-align: left;
            padding: 8px;
            border: 1px solid #ddd;
        }
        
        th {
            background-color: #f2f2f2;
        }
        
        tr:nth-child(even) {
            background-color: #f9f9f9;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="dashboard-header">
            <h1>School Management System Dashboard</h1>
            <p><?php echo date('F d, Y'); ?></p>
        </div>
        
        <div class="stats-container">
            <div class="stat-card">
                <div class="stat-label">Total Students</div>
                <div class="stat-value"><?php echo $dashboardSummary['total_students']; ?></div>
            </div>
            
            <div class="stat-card">
                <div class="stat-label">Average Attendance</div>
                <div class="stat-value"><?php echo number_format($dashboardSummary['avg_attendance'], 2); ?>%</div>
            </div>
            
            <div class="stat-card">
                <div class="stat-label">Total Fee Dues</div>
                <div class="stat-value">₹<?php echo number_format($dashboardSummary['total_fee_dues'], 2); ?></div>
            </div>
            
            <div class="stat-card">
                <div class="stat-label">Avg Assignment Score</div>
                <div class="stat-value"><?php echo number_format($dashboardSummary['avg_assignment_score'], 2); ?></div>
            </div>
            
            <div class="stat-card">
                <div class="stat-label">Avg Result Percentage</div>
                <div class="stat-value"><?php echo number_format($dashboardSummary['avg_result_percentage'], 2); ?>%</div>
            </div>
        </div>
        
        <div class="card">
            <h2>All Students Data</h2>
            <?php
            $studentHeaders = [
                'id' => 'ID',
                'name' => 'Name',
                'email' => 'Email',
                'section' => 'Section',
                'aggregate_attendance' => 'Attendance',
                'fee_due' => 'Fee Due',
                'assignments_total' => 'Assignment Score',
                'percentage' => 'Result %'
            ];
            
            displayTable($allStudentsData, $studentHeaders);
            ?>
        </div>
        
        <div class="card">
            <h2>Section Performance</h2>
            <?php
            $sectionHeaders = [
                'section' => 'Section',
                'student_count' => 'Students',
                'avg_attendance' => 'Avg Attendance',
                'avg_assignment' => 'Avg Assignment',
                'avg_result' => 'Avg Result',
                'total_dues' => 'Total Dues'
            ];
            
            displayTable($sectionPerformance, $sectionHeaders);
            ?>
        </div>
        
        <div class="card">
            <h2>Student Rankings</h2>
            <?php
            $rankHeaders = [
                'name' => 'Name',
                'section' => 'Section',
                'aggregate_attendance' => 'Attendance',
                'assignment_score' => 'Assignment Score',
                'result_percentage' => 'Result %',
                'overall_score' => 'Overall Score'
            ];
            
            displayTable($studentRankings, $rankHeaders);
            ?>
        </div>
    </div>
</body>
</html>