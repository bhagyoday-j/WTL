<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json; charset=UTF-8');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['message' => 'POST requests only.']);
    exit;
}

require_once 'db_connect.php';

$data = json_decode(file_get_contents('php://input'), true);

$studentName = trim($data['studentName'] ?? '');
$courseName  = trim($data['courseName'] ?? '');
$rating      = (int) ($data['rating'] ?? 0);
$comments    = trim($data['comments'] ?? '');

if ($studentName === '' || $courseName === '' || $rating < 1 || $rating > 5 || $comments === '') {
    http_response_code(422);
    echo json_encode(['message' => 'Please complete every field with a rating from 1 to 5.']);
    exit;
}

$statement = $connection->prepare(
    'INSERT INTO feedback (student_name, course_name, rating, comments) VALUES (?, ?, ?, ?)'
);
$statement->bind_param('ssis', $studentName, $courseName, $rating, $comments);
$statement->execute();

echo json_encode([
    'success' => true,
    'message' => 'Feedback submitted successfully.'
]);

$statement->close();
$connection->close();
?>