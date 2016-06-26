<?php
require_once '../config.php';
require_once '../sql.php';


if ($_SERVER['REQUEST_METHOD'] == 'POST') {

	$body = file_get_contents('php://input');
	$user = json_decode($body, true);

	$email = !empty($user['email']) ? $user['email'] : null;
	$password = !empty($user['password']) ? md5($user['password']) : null;
	$username = !empty($user['username']) ? htmlspecialchars($user['username']) : null;
	$token = md5(time().uniqid());

	$response = [];
	$db = Sql::app();

	$user = $db->selectOne("SELECT id FROM user WHERE email = ?", array($email));
	if (!empty($user)) {
		$response['status'] = 'error';
		$response['error'] = 'This email is alredy registered';
	}
	else {
		if (!empty($email) && !empty($password) && !empty($username)) {		
			$data = array();
			$data['email'] = $email;
			$data['password'] = $password;
			$data['username'] = $username;
			$data['token'] = $token;

			$result = $db->insert('user', $data);		

			if ($result) {
				$response['status'] = 'ok';
			}	
			else {
				$response['status'] = 'error';
			}
			
		}
		else {
			$response['status'] = 'error';
			$response['error'] = 'All the fields should be filled out';
		}
	}

	

	echo json_encode($response);

}

?>
