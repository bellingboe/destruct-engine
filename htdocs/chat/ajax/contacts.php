<?php
require_once '../../../inc/Functions.php';

$json = array();
$json['err'] = false;

if (!isset($_SESSION['id']) || (int)$_SESSION['id'] == 0) {
    $json['err'] = true;
} else {
    
    $mode = 1; // ============== GET ALL CONTACTS ==============
    
    if ($_POST && (isset($_POST['uid']) || isset($_POST['cid']))) {
        $mode = 2; // ============== SEND CONTACT REQUEST ==============
        if (isset($_POST['action']) && isset($_POST['cid'])) {
            if ($_POST['action'] == "approve") {
                $mode = 3; // ============== APPROVE CONTACT REQUEST ==============
            } else if ($_POST['action'] == "reject") {
                $mode = 4; // ============== REJECT CONTACT REQUEST ==============
            } else if ($_POST['action'] == "remove") {
                $mode = 5; // ============== REMOVE CONTACT ==============
            } else {
                $mode = 0; // FAILURE MODE
            }
        }
    }
    
    try {
        switch ($mode) {
            case 0:
                $json['m'] = "Invalid action type.";
                $json['err'] = true;
            break;
            case 1: // ============== GET ALL CONTACTS ==============
                $u = User::find((int)$_SESSION['id']);
                
                // APPROVED
                $approved_contacts = Contact::find('all', array('conditions' => array('(requester_id=? OR user_id=?) AND approved_ts > TIMESTAMP(0)',
                                                                                      $u->id, $u->id
                                                                                )));
                
                // SENT TO SOMEONE ELSE BY ME
                $pending_contacts = Contact::find('all', array('conditions' => array("requester_id=? AND approved_ts = TIMESTAMP(0)",
                                                                                     $u->id
                                                                                )));
                
                // SENT BY SOMEONE ELSE TO ME
                $sent_contacts = Contact::find('all', array('conditions' => array("user_id=? AND approved_ts = TIMESTAMP(0)",
                                                                                  $u->id
                                                                            )));
                
                // APPROVED
                $a_count = count($approved_contacts);
                if ($a_count > 0) {
                    $a_ = array();
                    foreach ($approved_contacts as $i=>$o) {
                        $uid = ($u->id == $o->requester_id) ? $o->user_id : $o->requester_id;
                        $other_u = User::find($uid);

                        foreach ($other_u->pairs as $p) {
                            if ($p->key_label == "Chat") {
                                $other_public_key = $p->pub_string;
                            }
                        }
                        
                        $unread_msg = Message::count(array('conditions' =>
                                                        array('read_ts = TIMESTAMP(0) AND contact_id = ? AND user_id = ?',
                                                              $o->contact_id, $uid
                                                         )));
                        
                        $cd = array(
                                    "contact_data" => array(
                                        "cid" => $o->contact_id,
                                        "approved_ts" => $o->approved_ts
                                    ),
                                    "contact_user" => array(
                                        "uid" => $uid,
                                        "e" => $other_u->email_address,
                                        "publicKey" => $other_public_key
                                    ),
                                    "contact_conversation" => array(
                                        "unread" => $unread_msg
                                    )
                            );

                        $a_[] = $cd;
                    }
                    $json['contacts']['list'] = $a_;
                } else {
                    $json['contacts']['list'] = [];
                }
                
                // SENT TO SOMEONE ELSE BY ME
                $p_count = count($pending_contacts);
                if ($p_count > 0) {
                    $p_ = array();
                    foreach ($pending_contacts as $i=>$o) {
                        $uid = $o->user_id;
                        $other_u = User::find($uid);
                        
                        $cd = array(
                                    "contact_data" => array(
                                        "cid" => $o->contact_id,
                                        "requested_ts" => $o->requested_ts
                                    ),
                                    "contact_user" => array(
                                        "uid" => $uid,
                                        "e" => $other_u->email_address
                                    )
                            );
                        
                        $p_[] = $cd;
                    }
                    $json['contacts']['sent'] = $p_;
                } else {
                    $json['contacts']['sent'] = [];
                }
                
                 // SENT BY SOMEONE ELSE TO ME
                $s_count = count($sent_contacts);
                if ($s_count > 0) {
                    $s_ = array();
                    foreach ($sent_contacts as $i=>$o) {
                        $uid = $o->requester_id;
                        $other_u = User::find($uid);
                        
                        $cd = array(
                                    "contact_data" => array(
                                        "cid" => $o->contact_id,
                                        "requested_ts" => $o->requested_ts
                                    ),
                                    "contact_user" => array(
                                        "uid" => $uid,
                                        "e" => $other_u->email_address
                                    )
                            );
                        
                        $s_[] = $cd;
                    }
                    $json['contacts']['requests'] = $s_;
                } else {
                    $json['contacts']['requests'] = [];
                }
            break;
            case 2: // ============== SEND CONTACT REQUEST ==============
                $add_id = (int)$_POST['uid'];
                $u1 = User::find((int)$_SESSION['id']);
                $u2 = User::find($add_id);
                
                $existing_connection = Contact::find('all', array('conditions' => array('(user_id=? AND requester_id=?) OR (user_id=? AND requester_id=?)',
                                                                                        $u1->id, $u2->id, $u2->id, $u1->id
                                                                                 )));
                if (count($existing_connection) == 0) {
                    $contact = new Contact;
                    $contact->requester_id = $u1->id;
                    $contact->user_id = $u2->id;
                    $contact->requested_ts = "NOW()";
                    $contact->save();
                    $json['m'] = "Contact request sent.";
                    $json['sent'] = true;
                } else {
                    $json['m'] = "Contact request already exists for this user.";
                    $json['sent'] = false;
                }
            break;
            case 3: // ============== APPROVE CONTACT REQUEST ==============
                $add_id = (int)$_POST['uid'];
                $u1 = User::find((int)$_SESSION['id']);
                $u2 = User::find($add_id);
                $cid = (int)$_POST['cid'];
                
                $contact_to_approve = Contact::find('all', array('conditions' => array('user_id=? AND requester_id=? AND contact_id=?',
                                                                                       $u1->id, $u2->id, $cid
                                                                                )));
                if (count($contact_to_approve) == 0) {
                    $json['m'] = "Could not approve contact request.";
                    $json['err'] = true;
                } else {
                    //$now = new ActiveRecord\DateTime('2010-01-02 03:04:05');
                    //$now->setTimestamp(time());

                    $contactObj = $contact_to_approve[0];
                    $contactObj->approved_ts = "NOW()"; //$now->format('db');
                    $contactObj->save();
                    
                    $json['m'] = "Contact request approved.";
                    $json['err'] = false;
                }
            break;
            case 4: // ============== REJECT CONTACT REQUEST ==============
                $add_id = (int)$_POST['uid'];
                $u1 = User::find((int)$_SESSION['id']);
                $u2 = User::find($add_id);
                $cid = (int)$_POST['cid'];
                
                $contact_to_reject = Contact::find('all', array('conditions' => array('user_id=? AND requester_id=? AND contact_id=?',
                                                                                      $u1->id, $u2->id, $cid
                                                                                )));
                if (count($contact_to_reject) == 0) {
                    $json['m'] = "Could not reject contact request.";
                    $json['err'] = true;
                } else {
                    $contactObj = $contact_to_reject[0];
                    $contactObj->delete();
                    $json['m'] = "Contact request removed.";
                    $json['err'] = false;
                }
            break;
            case 5: // ============== REMOVE CONTACT ==============
                $u1 = User::find((int)$_SESSION['id']);
                $cid = (int)$_POST['cid'];
                
                $contact_to_remove = Contact::find('all', array('conditions' =>
                                                                array("(requester_id=? OR user_id=?) AND contact_id=?",
                                                                      $u1->id, $u1->id, $cid
                                                                )));
                
                if (count($contact_to_remove) == 0) {
                    $json['m'] = "Could not remove contact.";
                    $json['err'] = true;
                } else {
                    $contactObj = $contact_to_remove[0];
                    $contactObj->delete();
                    $json['m'] = "Contact removed.";
                    $json['err'] = false;
                }
            break;
        }
    } catch(\Exception $e) {
        $json['debug'] = array("mode" => $mode, "action" => $_POST['action']);
        $json['err'] = true;
        $json['m'] = $e->getMessage();
    }
}

header("Content-Type: application/json");
echo json_encode($json);