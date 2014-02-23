<?php
require_once '../../inc/Functions.php';

unset($_SESSION['id']);
session_destroy();

if (isset($_GET['p'])) {
    $p = $_GET['p'];
} else {
    $p = "keys";
}

header("Location: /$p/");
exit;