<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json; charset=UTF-8');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST' && $_SERVER['REQUEST_METHOD'] !== 'DELETE') {
    http_response_code(405);
    echo json_encode(['message' => 'POST or DELETE requests only.']);
    exit;
}

require_once 'db_connect.php';

$data = json_decode(file_get_contents('php://input'), true);
$id = (int) ($data['id'] ?? 0);

if ($id <= 0) {
    http_response_code(422);
    echo json_encode(['message' => 'Invalid feedback ID.']);
    exit;
}

$statement = $connection->prepare('DELETE FROM feedback WHERE id = ?');
$statement->bind_param('i', $id);

if ($statement->execute()) {
    echo json_encode(['success' => true, 'message' => 'Feedback deleted successfully.']);
} else {
    http_response_code(500);
    echo json_encode(['message' => 'Failed to delete feedback.']);
}

$statement->close();
$connection->close();
?>