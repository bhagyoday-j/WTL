<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, PUT, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json; charset=UTF-8');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST' && $_SERVER['REQUEST_METHOD'] !== 'PUT') {
    http_response_code(405);
    echo json_encode(['message' => 'POST or PUT requests only.']);
    exit;
}

require_once 'db_connect.php';

$data = json_decode(file_get_contents('php://input'), true);

$id          = (int) ($data['id'] ?? 0);
$studentName = trim($data['studentName'] ?? '');
$courseName  = trim($data['courseName'] ?? '');
$rating      = (int) ($data['rating'] ?? 0);
$comments    = trim($data['comments'] ?? '');

if ($id <= 0 || $studentName === '' || $courseName === '' || $rating < 1 || $rating > 5 || $comments === '') {
    http_response_code(422);
    echo json_encode(['message' => 'Invalid data provided for update.']);
    exit;
}

$statement = $connection->prepare(
    'UPDATE feedback SET student_name = ?, course_name = ?, rating = ?, comments = ? WHERE id = ?'
);
$statement->bind_param('ssisi', $studentName, $courseName, $rating, $comments, $id);

if ($statement->execute()) {
    echo json_encode(['success' => true, 'message' => 'Feedback updated successfully.']);
} else {
    http_response_code(500);
    echo json_encode(['message' => 'Failed to update feedback.']);
}

$statement->close();
$connection->close();
?>