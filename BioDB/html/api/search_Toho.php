<?php
header('Content-Type:text/html; charset=UTF-8');

require('Toho_login.php');
header('Access-Control-Allow-Origin: http://localhost:3000');
header('Access-Control-Allow-Methods: GET');
header('Access-Control-Allow-Headers: Content-Type');

$id = (isset($_GET['id']) && $_GET['id'] !== "") ? $_GET['id'] : "%";
$Name = (isset($_GET['Name']) && $_GET['Name'] !== "") ? $_GET['Name'] : "%";
$genre = (isset($_GET['genre']) && $_GET['genre'] !== "") ? $_GET['genre'] : "%";
$stage = (isset($_GET['stage']) && $_GET['stage'] !== "") ? $_GET['stage'] : "%";
$Enemy_name = (isset($_GET['Enemy_name']) && $_GET['Enemy_name'] !== "") ? $_GET['Enemy_name'] : null;

// 基本のSQL文
$sql = "
SELECT 
    Music.ID,
    Music.Name,
    Music.Enemy_Name,
    Music.stage,
    Genre.genre,
    Genre.url
FROM Music
NATURAL JOIN Genre
NATURAL JOIN Tohomusic
WHERE (Music.ID LIKE :id)
AND (Music.Name LIKE :Name)
AND (Music.Enemy_Name LIKE :Enemy_name or Music.Enemy_name is null)
AND (Music.stage LIKE :stage)
AND (Genre.genre LIKE :genre)
";

try {
    $stmh = $pdo->prepare($sql);

    $stmh->bindValue(":id", "%{$id}%", PDO::PARAM_INT);
    $stmh->bindValue(":stage", "%{$stage}%", PDO::PARAM_INT);
    $stmh->bindValue(":Name", "%{$Name}%", PDO::PARAM_STR);
    $stmh->bindValue(":Enemy_name", "%{$Enemy_name}%", PDO::PARAM_STR);
    $stmh->bindValue(":genre", "%{$genre}%", PDO::PARAM_STR);

    $stmh->execute();

    // 検索結果の取得
    $result = $stmh->fetchAll(PDO::FETCH_ASSOC);
    $count = $stmh->rowCount();

    // JSONレスポンスの構築
    $response = [
        'status' => 'success',
        'count' => $count,
        'data' => $result
    ];

    echo json_encode($response, JSON_UNESCAPED_UNICODE);

} catch (PDOException $e) {
    // エラーメッセージの詳細を出力
    http_response_code(500);
    echo json_encode([
        'status' => 'error',
        'message' => 'データベースエラーが発生しました: ' . $e->getMessage()
    ], JSON_UNESCAPED_UNICODE);
}
?>
