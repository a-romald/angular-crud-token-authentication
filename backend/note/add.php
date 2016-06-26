<?php
require_once '../config.php';
require_once '../sql.php';


if ($_SERVER['REQUEST_METHOD'] == 'POST') {

	$body = file_get_contents('php://input');
	$note = json_decode($body, true);

	$title = !empty($note['title']) ? htmlspecialchars($note['title']) : null;
	$content = !empty($note['content']) ? htmlspecialchars($note['content']) : null;
	$token = !empty($note['token']) ? htmlspecialchars($note['token']) : null;

	$response = [];

	if (!empty($title) && !empty($content) && !empty($token)) {		

		$db = Sql::app();

		//User
		$user = $db->selectOne("SELECT id FROM user WHERE token = '$token'");
		$user_id = $user['id'];

		$data = array();
		$data['title'] = $title;
		$data['content'] = $content;
		$data['user_id'] = $user_id;

		$result = $db->insert('note', $data);		

		if ($result) {
			$response['status'] = 'ok';
		}	
		else {
			$response['status'] = 'error';
		}		
		
	}
	else {
		$response['status'] = 'error';
	}

	echo json_encode($response);

}

?>
