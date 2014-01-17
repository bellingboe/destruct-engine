<?php

class DestructEngine {
    
    /**
     * ========== PRIVATE VARS========== 
     **/
    
    private static $LTC_ADDR            = 'LaXR9JPXeMJFoznpqsHPWJsTULPdeijyVx';
    private static $BTC_ADDR            = '1N6BYCRbrL7mLLvpgP9asgnxpzs7oticmc';
    
    private static $url_protocol        = 'https';
    private static $url_domain          = 'destruct.co';
    
    private static $unauth_agents       = array('facebookexternalhit');
    private static $unauth_header       = 'HTTP/1.0 500 Server Error';
    
    private static $err_msg_gone        = 'That message no longer exists.';
    
    private $db                         = null;
    private $agent                      = null;
    private $message                    = null;
    private $share_url                  = null;
    
    /**
     * ========== PRIVATE METHODS ==========
     **/
    
    private function __construct() {
        $this->db       = Database::factory();
        $this->agent    = $_SERVER['HTTP_USER_AGENT'];
    }
    
    private function _mergeUnauthUserAgents() {
        return implode('|', self::$unauth_agents);
    }
    
    private function _agentMatchUnauth() {
        $merged_agents      = $this->_mergeUnauthUserAgents();
        $search_pattern     = '/(' . $merged_agents . ')/si';
        $agent              = $this->agent;
        
        return preg_match($search_pattern, $agent);
    }
    
    private function _detectUserAgent() {
        if ($this->_agentMatchUnauth()) {
            header(self::$unauth_header); 
            die();
        }
    }
    
    private function _getMessage($nonce) {
        $get_sql = sprintf("SELECT b FROM crypt_data WHERE n LIKE BINARY '%s' LIMIT 1", $nonce);
        $this->db->query($get_sql);
        $this->db->singleRecord();
        $this->message = $this->db->Record['b'];
    }
    
    private function _deleteMessage($nonce) {
        $del_sql = sprintf("DELETE FROM crypt_data WHERE n LIKE BINARY '%s' LIMIT 1", $nonce);
        $this->db->query($del_sql);
    }
    
    private function _createMessage($body, $nonce) {
        $insert_sql = sprintf("INSERT INTO crypt_data (b, n) VALUES ('%s', '%s')", $body, $nonce);
        $this->db->query($insert_sql);
    }
    
    private function _proccessMessageView($nonce) {
        $this->_getMessage($nonce);
        $this->_deleteMessage($nonce);
    }
    
    private function _ranStr($length = 16) {
        $chars ="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890";
        $final_rand='';
        for($i=0;$i<$length; $i++)
        {
            $final_rand .= $chars[ rand(0,strlen($chars)-1)];
     
        }
        return $final_rand;
    }
    
    /**
     * ========== PUBLIC METHODS ==========
     **/
    
    public static function factory() {
        return new self();
    }
    
    public function errorGone() {
        return self::$err_msg_gone;
    }
    
    public function message() {
        return $this->message;
    }
    
    public function url() {
        return $this->share_url;
    }
    
    public function runDisplayEngine() {
        if(!$_POST && isset($_GET['key'])) {
            $n = $_GET['key'];
            $this->_proccessMessageView($n);
        }
    }
    
    public function runPostEngine() {
        if (isset($_POST['m'])) {
            $b = $_POST['m'];
            $n = $this->_ranStr();
            $this->_createMessage($b, $n);
            $this->share_url = sprintf('%s://%s/n_%s', self::$url_protocol, self::$url_domain, $n);
        }
    }
    
}