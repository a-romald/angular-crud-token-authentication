<?php
require_once '../config.php';
require_once '../sql.php';


if ($_SERVER['REQUEST_METHOD'] == 'POST') {

	$body = file_get_contents('php://input');
	$note = json_decode($body, true);

	$id = !empty($note['id']) ? (int) $note['id'] : null;
	$title = !empty($note['title']) ? htmlspecialchars($note['title']) : null;
	$content = !empty($note['content']) ? htmlspecialchars($note['content']) : null;
	$token = !empty($note['token']) ? htmlspecialchars($note['token']) : null;

	$response = [];

	if (!empty($id) && !empty($title) && !empty($content)) {		

		$db = Sql::app();

		//User
		$user = $db->selectOne("SELECT id FROM user WHERE token = '$token'");
		$user_id = $user['id'];

		$note = $db->selectOne("SELECT * FROM note WHERE id = $id");
		if ($note['user_id'] == $user_id) {

			$data = array();
			$data['title'] = $title;
			$data['content'] = $content;

			$result = $db->update('note', $data, "id = '$id'");

			if ($result) {
				$response['status'] = 'ok';
			}	
			else {
				$response['status'] = 'error';
				$response['error'] = 'Note is not updated';
			}
		}
		else {
			$response['status'] = 'error';
			$response['error'] = "You don't have access to this note.";
		}	
		
	}
	else {
		$response['status'] = 'error';
		$response['error'] = 'All the fields must be filled out';
	}

	echo json_encode($response);

}

?>
