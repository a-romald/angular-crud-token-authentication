<?php
require_once '../config.php';
require_once '../sql.php';


if ($_SERVER['REQUEST_METHOD'] == 'GET') {

	$id = !empty($_GET['id']) ? (int) $_GET['id'] : null;
	$token = !empty($_GET['token']) ? htmlspecialchars($_GET['token']) : null;

	$response = [];

	if (!empty($id)) {	

		$db = Sql::app();

		//User
		$user = $db->selectOne("SELECT id FROM user WHERE token = '$token'");
		$user_id = $user['id'];

		$note = $db->selectOne("SELECT id, user_id FROM note WHERE id = ?", array($id));
		if (!empty($note)) {
			if ($note['user_id'] == $user_id) {
				$result = $db->delete('note', "id = '$id'");
				if ($result) {
					$response['status'] = 'ok';
				}
				else {
					$response['status'] = 'error';
					$response['error'] = 'Note is not deleted.';
				}
			}
			else {
				$response['status'] = 'error';
				$response['error'] = "You don't have access to this note.";
			}
		}

		
		
	}
	else {
		$response['status'] = 'error';
		$response['error'] = 'Note is not defined.';
	}

	echo json_encode($response);

}

?>
