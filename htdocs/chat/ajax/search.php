<?php
require_once '../../../inc/Functions.php';

$json = array();
$json['err'] = false;
$json['users'] = [];

if (!isset($_SESSION['id']) || (int)$_SESSION['id'] == 0) {
    $json['err'] = true;
} else {
    try {
        $u = User::find((int)$_SESSION['id']);
        $users = User::find('all', array('conditions' => array("email_address = ? AND email_address != ?", $_GET['s'], $u->email_address)));
        
        $u_count = count($users);
        if ($u_count > 0) {
            $u_ = array();
            foreach ($users as $i=>$o) {
                $ud = array("e" => $o->email_address, "id" => $o->id);
                $u_[] = $ud;
            }
            $json['users'] = $u_;
        }
        
    } catch(\Exception $e) {
        $json['err'] = true;
        $json['err_string'] = $e->getMessage();
    }
}

header("Content-Type: application/json");
echo json_encode($json);