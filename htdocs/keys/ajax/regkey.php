<?php
require_once '../../../inc/Functions.php';

$json = array();
$json['key_err'] = false;

if (!isset($_SESSION['id']) || (int)$_SESSION['id'] == 0) {
    $json['key_err'] = true;
} else {
    
    if (isset($_GET['public'])) {
        $func = "create_pubkeys";
    } else {
        $func = "create_pairs";
    }
    
    $d = $_POST['d'];
    $l = $_POST['l'];
    
    try {
        
        $u = User::find((int)$_SESSION['id']);
        $key = $u->$func(array("key_data" => $d, "key_label" => $l));
        $json['kid'] = $key->id;
        
    } catch(\Exception $e) {
        
        $json['key_err'] = true;
        $json['err'] = $e->getMessage();
        
    }
}

header("Content-Type: application/json");
echo json_encode($json);