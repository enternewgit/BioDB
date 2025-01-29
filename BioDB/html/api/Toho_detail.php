<?php
// api/Toho_detail.php
header('Content-Type: application/json; charset=UTF-8');
require('Toho_login.php');

// CORSの設定、開発環境用
header('Access-Control-Allow-Origin: http://localhost:3000');
header('Access-Control-Allow-Methods: GET');
header('Access-Control-Allow-Headers: Content-Type');

// Music IDの取得と検証
$id = (isset($_GET['id']) && $_GET['id'] !== "") ? $_GET['id'] : "%";
if (!$id) {
    http_response_code(400);
    echo json_encode([
        'status' => 'error',
        'message' => 'Music ID is required'
    ]);
    exit;
}

$sql = "
SELECT
    Music.ID, Music.Name, Music.Enemy_Name, Music.stage, Genre.genre, Genre.url, Music.Musicurl
FROM Music
NATURAL JOIN Tohomusic
NATURAL JOIN Genre
WHERE Music.ID = :id
";

try {
    $stmh = $pdo->prepare($sql);
    $stmh->bindValue(":id", $id, PDO::PARAM_INT);
    $stmh->execute();

    $result = $stmh->fetch(PDO::FETCH_ASSOC);

    if ($result) {
        echo json_encode([
            'status' => 'success',
            'data' => $result
        ], JSON_UNESCAPED_UNICODE);
    } else {
        http_response_code(404);
        echo json_encode([
            'status' => 'error',
            'message' => 'Music not found'
        ]);
    }
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        'status' => 'error',
        'message' => 'データベースエラーが発生しました'
    ], JSON_UNESCAPED_UNICODE);
}
?>