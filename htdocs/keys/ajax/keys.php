<?php
require_once '../../../inc/Functions.php';

$json = array();
$json['key_err'] = false;

if (!isset($_SESSION['id']) || (int)$_SESSION['id'] == 0) {
    $json['key_err'] = true;
} else {
    
    $public = false;
    $key_attr = "pairs";
    $pub_str = "pub_string";
    
    if (isset($_GET['public'])) {
        $key_attr = "pubkeys";
        $pub_str = "key_data";
        $public = true;
    }
    
    try {
        
        $u = User::find((int)$_SESSION['id']);
        $keys = $u->$key_attr;
        $key_count = count($keys);
        if ($key_count > 0) {
            $k = array();
            
            foreach ($keys as $i=>$o) {
                if ((isset($_GET['chat']) && $o->key_label == "Chat") || (!isset($_GET['chat']))) {
                    $data = $o->key_data;
                    $kd = array("key_data" => $data,
                                "id" => $o->id,
                                "label" => $o->key_label,
                                "pub_string" => $o->$pub_str);
                    $k[] = $kd;
                }
            }
            
            $json['keys'] = $k;
            $json['key_count'] = $key_count;
        } else {
            $json['key_count'] = 0;
        }  
        
    } catch(\Exception $e) {
        
        $json['key_err'] = true;
        $json['err'] = $e->getMessage();
        
    }
}

header("Content-Type: application/json");
echo json_encode($json);