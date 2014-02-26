<?php
class Contact extends ActiveRecord\Model {
	static $table_name = 'contacts';
	static $primary_key = 'contact_id';
	static $connection = 'production';
        
	static $belongs_to = array(array(
                                'user'
                            ));
        
	static $has_many = array(
		array('messages', 'limit' => 20, 'order' => 'sent_ts ASC')
	);

}