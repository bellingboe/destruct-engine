<?php
require_once '../../../inc/Functions.php';

$em = $_POST['em'];
$raw_pw = $_POST['pw'];
$pw = User::_genUserHash($em, $raw_pw, PW_SALT);
$json = array();
$json['new'] = false;
$user = User::find_by_email_address($em, array('limit' => '1'));

if ($user == null) {
    $json['new'] = true;
    $u = new User();
    $u->email_address = $em;
    $u->acct_pw = $pw;
    $u->save();
    $json['id'] = (int)$u->id;
    $user = $u;
} else if ($user->acct_pw !== $pw) {
    $json['id'] = 0;
    $json['pw'] = false;
} else {
    $json['id'] = (int)$user->id;
    $json['s'] = true;
}

if ($json['id'] > 0) {
    $_SESSION['id'] = $json['id'];
}

header("Content-Type: application/json");
echo json_encode($json);