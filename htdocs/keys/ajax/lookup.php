<?php
require_once '../../../inc/Functions.php';

$em = $_POST['em'];
$raw_pw = $_POST['pw'];

$pw = User::_genUserHash($em, $raw_pw, PW_SALT);
$user = User::find_by_email_address($em, array('limit' => '1'));

$json = array();
$json['is_new'] = false;

if ($user == null) {
    $json['new'] = true;
    $u = new User();
    $u->email_address = $em;
    $u->acct_pw = $pw;
    $u->save();
    $json['id'] = (int)$u->id;
    $json['email'] = $u->email_address;
    $json['is_new'] = true;
    $user = $u;
} else if ($user->acct_pw !== $pw) {
    $json['id'] = 0;
    $json['pw'] = false;
} else {
    $json['id'] = (int)$user->id;
    $json['s'] = true;
    $json['email'] = $user->email_address;
}

if ($json['id'] > 0) {
    $_SESSION['id'] = $json['id'];
    $_SESSION['email'] = $json['email'];
}

header("Content-Type: application/json");
echo json_encode($json);