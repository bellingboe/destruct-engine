<?php

error_reporting(E_ALL);
ini_set("display_errors", "Off");

session_start();

require_once 'GibberishAES.php';
require_once 'Constants.php';       // Database connection parameters.
require_once 'ActiveRecordCfg.php'; // ActiveRecord config and setup.
require_once 'DestructEngine.php';  // The Engine class.