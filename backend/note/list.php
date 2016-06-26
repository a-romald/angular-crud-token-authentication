<?php
require_once '../config.php';
require_once '../sql.php';

$token = !empty($_GET['token']) ? htmlspecialchars($_GET['token']) : null;

$db = Sql::app();

//User
$user = $db->selectOne("SELECT id FROM user WHERE token = '$token'");
$user_id = $user['id'];
//Notes
$notes = $db->selectAll("SELECT id, title, content FROM note WHERE user_id = $user_id");

$response = [];
$result = [];

if (!empty($notes)) {
	foreach ($notes as $note) {
		$item = [];
		$item['id'] = $note['id'];
		$item['title'] = $note['title'];
		$item['content'] = $note['content'];
		$result[] = $item;
	}
	$response['status'] = 'ok';
	$response['records'] = $result;	
}
else {
	$response['status'] = 'empty';
	$response['records'] = [];
}

echo json_encode($response, JSON_NUMERIC_CHECK);

?>
