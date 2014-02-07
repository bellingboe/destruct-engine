<?php
require_once '../../inc/Functions.php';

unset($_SESSION['id']);
session_destroy();

header("Location: https://destruct.co/keys/");
exit;