<?php
$connection = new mysqli('localhost', 'root', 'root', 'feedback_db');

if ($connection->connect_error) {
    http_response_code(500);
    echo json_encode(['message' => 'Database connection failed.']);
    exit;
}

$connection->set_charset('utf8mb4');
?>