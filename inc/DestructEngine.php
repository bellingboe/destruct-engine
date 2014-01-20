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
    private static $unauth_header       = 'HTTP/1.0 302 Found';
    
    private static $err_msg_gone        = 'That message no longer exists.';
    
    private $agent                      = null;
    private $message                    = null;
    private $share_url                  = null;
    
    /**
     * ========== PRIVATE METHODS ==========
     **/
    
    private function __construct() {
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
        $this->message = DestructMessage::find_by_n($nonce, array('limit' => 1));
    }
    
    private function _deleteMessage($nonce) {
        if (is_object($this->message)) {
            $this->message->delete();
        }
    }
    
    private function _createMessage($body, $nonce) {
        $msg = DestructMessage::create(array('b' => $body, 'n' => $nonce));
    }
    
    private function _proccessMessageView($nonce) {
        $this->_getMessage($nonce);
        $this->_deleteMessage($nonce);
    }
    
    private function _ranStr($length = 16) {
        $chars ="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890";
        $final_rand='';
        for($i=0;$i<$length; $i++) {
            $final_rand .= $chars[ rand(0,strlen($chars)-1)];
     
        }
        return $final_rand;
    }
    
    private function _safeString($str) {
        return preg_match('/^[a-zA-Z0-9]+$/', $str);
    }
    
    /**
     * ========== PUBLIC METHODS ==========
     **/
    
    public static function ltc() {
        return self::$LTC_ADDR;
    }
    
    public static function btc() {
        return self::$BTC_ADDR;
    }
    
    public static function factory() {
        return new self();
    }
    
    public function errorGone() {
        return self::$err_msg_gone;
    }
    
    public function message() {
        if (is_object($this->message)) {
            return $this->message->b;
        }
        return null;
    }
    
    public function url() {
        return $this->share_url;
    }
    
    public function runDisplayEngine() {
        if(!$_POST && isset($_GET['key'])) {
            $n = htmlentities(trim($_GET['key']));
            if ($this->_safeString($n) && strlen($n) == 16) {
                $this->_proccessMessageView($n);
            }
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