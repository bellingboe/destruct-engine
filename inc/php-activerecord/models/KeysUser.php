<?php
class KeysUser extends ActiveRecord\Model {
	static $table_name = 'users';
	static $primary_key = 'user_id';
	static $connection = 'production';
        
	static $validates_presence_of = array(array('email_address'));
}