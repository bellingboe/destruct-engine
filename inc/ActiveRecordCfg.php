<?php
require_once 'php-activerecord/ActiveRecord.php';

$connections = array(
	'production' => 'mysql://'. DB_USER .':'. DB_PW .'@'. DB_HOST .'/'. DB_NAME
);

ActiveRecord\Config::initialize(function($cfg) use ($connections)
{
    $cfg->set_model_directory(dirname(__FILE__) . '/php-activerecord/models');
    $cfg->set_connections($connections);
});