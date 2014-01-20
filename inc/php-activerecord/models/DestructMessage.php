<?php
class DestructMessage extends ActiveRecord\Model {
	static $table_name = 'crypt_data';
	static $primary_key = 'id';
	static $connection = 'production';
        
	static $validates_presence_of = array(
		array('b'), array('n'));
}