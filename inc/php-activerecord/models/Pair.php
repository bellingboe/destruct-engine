<?php
class Pair extends ActiveRecord\Model {
	static $validates_presence_of = array(
					      array('key_data'),
					      array('user_id'),
					      array('key_label'),
					      array('pub_string')
					);
	static $belongs_to = array(
		array('user')
	);
} 