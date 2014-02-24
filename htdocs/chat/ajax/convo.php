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
            $convo_messsages = $contact_object->messages;
            
            if ($contact_object->user_id == $u->id) {
                $other_id = $contact_object->requester_id;
            } else {
                $other_id = $contact_object->user_id;
            }
            
            $contact_with_user = User::find($other_id);
            
            foreach ($contact_with_user->pairs as $p) {
                if ($p->key_label == "Chat") {
                    $other_public_key = $p->pub_string;
                }
            }
            
            $json['conversation_data'] = array(
                                        "msg_count" => count($convo_messsages),
                                        "user" => array(
                                                  "user_id" => $other_id,
                                                  "user_email" => $contact_with_user->email_address,
                                                  "user_chat_public_key" => $other_public_key)
                                        );

            $json['messages'] = [];
            
            if ($convo_messsages) {
                foreach ($convo_messsages as $m) {
                    $m_ = [];
                    $m_['id'] = $m->id;
                    $m_['user_id'] = $m->user_id;
                    $m_['read_ts'] = $m->read_ts;
                    $m_['t'] = $m->enc_text;
                    $json['messages'][] = $m_;
                }
            }
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