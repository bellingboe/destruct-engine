<?php
require_once '../../../inc/Functions.php';

$json = array();
$json['key_err'] = false;

if (!isset($_SESSION['id']) || (int)$_SESSION['id'] == 0) {
    $json['id'] = 0;
} else {
    $u = User::find((int)$_SESSION['id']);
    $json['id'] = $u->id;
    $json['email'] = $u->email_address;
}

header("Content-Type: application/json");
echo json_encode($json);