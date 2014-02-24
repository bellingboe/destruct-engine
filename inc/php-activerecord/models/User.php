<?php
class User extends ActiveRecord\Model {
	static $validates_presence_of = array(
                                              array('email_address'),
                                              array('acct_pw')
                                        );
        
	static $has_many = array(
		array('pairs'),
                array('pubkeys'),
                array('contacts')
	);
        
        public static function _genUserHash($em, $pw, $salt) {
            return sha1(sha1($em.$pw).$salt.sha1($salt.sha1($pw)));
        }
}