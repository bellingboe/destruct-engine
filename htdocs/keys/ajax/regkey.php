<?php
require_once '../../../inc/Functions.php';

$json = array();
$json['key_err'] = false;

if (!isset($_SESSION['id']) || (int)$_SESSION['id'] == 0) {
    $json['key_err'] = true;
} else {
    
    $d = $_POST['d'];
    $l = $_POST['l'];
    
    $cols = array();
    
    if (isset($_GET['public'])) {
        $func = "create_pubkeys";
        $cols =  array("key_data" => $d, "key_label" => $l);
    } else {
        $func = "create_pairs";
        $pub = $_POST['pub'];
        $cols =  array("key_data" => $d, "key_label" => $l, "pub_string" => $pub);
    }
    
    try {
        
        $u = User::find((int)$_SESSION['id']);
        $key = $u->$func($cols);
        $json['kid'] = $key->id;
        
    } catch(\Exception $e) {
        
        $json['key_err'] = true;
        $json['err'] = $e->getMessage();
        
    }
}

header("Content-Type: application/json");
echo json_encode($json);