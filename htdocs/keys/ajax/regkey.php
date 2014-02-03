<?php
session_start();
require_once '../../../inc/Functions.php';

error_reporting(E_ALL);
ini_set("display_errors", "On");

if (!isset($_SESSION['id']) || (int)$_SESSION['id'] == 0) {
    exit;
}

$d = $_POST['d'];
$json = array();

$key = KeyPair::create(array("user_id" => $_SESSION['id'],
                                "key_data" => $d));

$json['kid'] = $key->key_id;

header("Content-Type: application/json");
echo json_encode($json);