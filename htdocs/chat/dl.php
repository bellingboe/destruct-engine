<?php
require_once '../../inc/Functions.php';

$msg_id = @$_GET['m'];
$key = @$_GET['k'];

$msg = Message::find((int)$msg_id);

$msg_data = json_decode(base64_decode($msg->enc_text));

$dec = GibberishAES::dec($msg_data['t'], $key);