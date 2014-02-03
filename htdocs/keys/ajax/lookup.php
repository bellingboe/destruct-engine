<?php
error_reporting(E_ALL);
ini_set("display_errors", "On");

//session_start();

require_once '../../../inc/Functions.php';

$em = $_POST['em'];
$json = array();
$json['new'] = false;

$user = KeysUser::find_by_email_address($em, array('limit' => 1));

if ($user == null) {
    $json['new'] = true;
    $user = KeysUser::create(array("email_address" => $em));
}

$json['id'] = $user->user_id;

if ($json['id'] !== null) {
    
    //$json['keys'] = KeyPair::find_all_by_user_id($json['id'], array('order' => 'key_id desc'));
    //$json['keys'] = KeyPair::find('all', array('conditions' => array('user_id=?',$json['id']), 'order' => 'key_id desc'));
    
    try {
        //$k = KeyPair::find_all_by_user_id($json['id'], array('order' => 'key_id desc'));
        $keys = KeyPair::find_all_by_user_id($json['id']);
        $k = array();
        foreach ($keys as $i=>$o) {
            $kd = array("key_data" => $o->key_data, "key_id" => $o->key_id);
            $k[] = $kd;
        }
        
        $json['keys'] = $k;
        $json['key_count'] = count($k);
    } catch(\Exception $e) {
        $json['key_err'] = true;
        $json['err'] = $e;
    }
    
    $_SESSION['id'] = $json['id'];
}

header("Content-Type: application/json");
echo json_encode($json);