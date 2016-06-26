<?php
require_once '../config.php';
require_once '../sql.php';


if ($_SERVER['REQUEST_METHOD'] == 'POST') {

	$body = file_get_contents('php://input');
	$user = json_decode($body, true);

	$email = !empty($user['email']) ? $user['email'] : null;
	$password = !empty($user['password']) ? $user['password'] : null;	

	$response = [];
	$db = Sql::app();

	$result = $db->selectOne("SELECT * FROM user WHERE email = ?", array($email));
	if (!empty($result)) {
		$password_hash = $result['password'];
		if(md5($password) == $password_hash) {
			$username = $result['username'];
			$token = $result['token'];
			$response['status'] = 'ok';
			$response['user']['username'] = $username;
			$response['user']['token'] = $token;
		}
		else {
			$response['status'] = 'error';
			$response['error'] = 'User password is incorrect!';			
		}		
	}
	else {
		$response['status'] = 'error';
		$response['error'] = 'This email is not registered in our database!';
	}	

	echo json_encode($response);

}

?>
