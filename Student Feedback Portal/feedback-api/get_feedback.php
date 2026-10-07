<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json; charset=UTF-8');

require_once 'db_connect.php';

$result = $connection->query(
    'SELECT id, student_name, course_name, rating, comments, created_at FROM feedback ORDER BY created_at DESC'
);

$feedback = [];

while ($row = $result->fetch_assoc()) {
    $feedback[] = $row;
}

echo json_encode($feedback);

$connection->close();
?>