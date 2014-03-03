<?php
require_once '../../inc/Functions.php';

$msg_id = @$_GET['m'];
$key = @$_GET['k'];

$msg = Message::find((int)$msg_id);

$msg_data = json_decode(base64_decode($msg->enc_text));

echo "m->enc_text:\n\n";
var_dump($msg->enc_text);

echo "msg_data:\n\n";
var_dump($msg_data);

$dec = GibberishAES::dec($msg_data->t, $key);