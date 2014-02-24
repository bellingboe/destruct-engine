<?php
require_once '../../../inc/Functions.php';

$json = array();
$json['err'] = false;

if (!isset($_SESSION['id']) || (int)$_SESSION['id'] == 0) {
    $json['err'] = true;
} else {
    try {
        $u = User::find((int)$_SESSION['id']);
        $conditions = array('conditions' => array('contact_id=? AND (user_id=? OR requester_id=?)', $_GET['cid'], $u->id, $u->id));
        $contact_auth = Contact::exists($conditions);
        
        if ($contact_auth) {
            $contact_object = Contact::find((int)$_GET['cid']);
            
        } else {
            $json['err'] = true;
            $json['m'] = "Unauthorized.";
        }
        
    } catch(\Exception $e) {
        $json['err'] = true;
        $json['m'] = $e->getMessage();
    }
}

header("Content-Type: application/json");
echo json_encode($json);