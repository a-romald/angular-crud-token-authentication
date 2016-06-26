<?php
require_once '../config.php';
require_once '../sql.php';

$token = !empty($_GET['token']) ? htmlspecialchars($_GET['token']) : null;

$db = Sql::app();

//User
$user = $db->selectOne("SELECT id FROM user WHERE token = '$token'");
$user_id = $user['id'];

$id = (int) $_GET['id'];
if (!empty($id)) {
	$note = $db->selectOne("SELECT * FROM note WHERE id = $id");

	$response = [];

	if (!empty($note)) {
		if ($note['user_id'] == $user_id) {
			$response['status'] = 'ok';
			$response['record'] = $note;
		}
		else {
			$response['status'] = 'error';
			$response['record'] = [];
			$response['error'] = "You don't have access to this note.";
		}
			
	}
	else {
		$response['status'] = 'empty';
		$response['record'] = [];
		$response['error'] = 'This note is not found.';
	}

	echo json_encode($response);
}


?>
