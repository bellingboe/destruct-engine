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
            
            if (isset($_GET['since'])) {
                $since_id = (int)$_GET['since'];
                $convo_messsages = Message::find('all', array('conditions' => array('contact_id=? AND id > ?', $contact_object->contact_id, $since_id),
                                                              'limit' => 20,
                                                              'order' => 'id DESC'));
            } else {
                $convo_messsages = $contact_object->messages;
            }
            
            if ($contact_object->user_id == $u->id) {
                $other_id = $contact_object->requester_id;
            } else {
                $other_id = $contact_object->user_id;
            }
            
            $my_id = $u->id;
            $contact_with_user = User::find($other_id);
            
            if ($_POST && isset($_POST['t']) && isset($_POST['k'])) {
                
                $is_file = (int)$_POST['is_file'];
                
                $json['err'] = false;
                $json['msg_sent'] = true;
                
                $m_data = array();
                $m_data['t'] = $_POST['t'];
                $m_data['k'] = $_POST['k'];
                
                $msg = new Message();
                $msg->user_id = $u->id;
                $msg->contact_id = $contact_object->contact_id;
                $msg->sent_ts = "NOW()";
                $msg->is_file = (int)$is_file;
                $msg->enc_text = base64_encode(json_encode($m_data));

                if ($is_file) {
                    $file_data = $_POST['fb'];
                    $msg->enc_file = base64_encode(json_encode($file_data));
                }
                
                $msg->save();
            } else {
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
                        $m_['is_file'] = $m->is_file;
                        
                        if ($m->user_id == $other_id) {
                            $m_['user_email'] = $contact_with_user->email_address;
                        } else {
                            $m_['user_email'] = $u->email_address;
                        }
                        
                        $is_new = false;
                        
                        if ($m->user_id !== $u->id && $m->read_ts == null) {
                            $m->read_ts = "NOW()";
                            $m->save();
                            $is_new = true;
                        }
                        
                        $m_['is_new'] = $is_new;
                        $m_['read_ts'] = $m->read_ts;
                        $m_['sent_ts'] = $m->sent_ts;
                        $m_['data'] = json_decode(base64_decode($m->enc_text));
                        if ($m->is_file) {
                            $m_['f'] = json_decode(base64_decode($m->enc_file));
                        }
                        
                        $json['messages'][] = $m_;
                    }
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