<?php
class Pubkey extends ActiveRecord\Model {
	static $validates_presence_of = array(
					      array('key_data'),
					      array('user_id'),
					      array('key_label')
					);
	static $belongs_to = array(
		array('user')
	);
} 