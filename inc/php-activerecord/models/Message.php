<?php
class Message extends ActiveRecord\Model {
	static $table_name = 'messages';
	static $primary_key = 'id';
	static $connection = 'production';
        
	static $belongs_to = array(
                                   array('contact')
                            );

}