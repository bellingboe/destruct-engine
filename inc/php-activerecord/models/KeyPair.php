<?php
class KeyPair extends ActiveRecord\Model {
	static $table_name = 'key_pairs';
	static $primary_key = 'key_id';
	static $connection = 'production';
	static $validates_presence_of = array(array('key_data'), array('user_id'));
} 