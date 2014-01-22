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
    private static $unauth_text         = 'This message is encrypted.';
    
    private static $err_header          = 'x-msg: did-err';
    
    private static $err_msg_gone        = 'That message no longer exists.';
    
    private $agent                      = null;
    private $message                    = null;
    private $share_url                  = null;
    private $err                        = false;
    
    /**
     * ========== PRIVATE METHODS ==========
     **/
    
    private function __construct() {
        $this->agent = $_SERVER['HTTP_USER_AGENT'];
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
            echo $this->_unauthText();
            die();
        }
    }
    
    private function _unauthText() {
        return self::$unauth_text;
    }
    
    private function _findMessage($nonce) {
        $this->message = DestructMessage::find_by_n($nonce, array('limit' => 1));
    }
    
    private function _deleteMessage() {
        $this->message->delete();
    }
    
    private function _createMessage($body, $nonce) {
        return DestructMessage::create(array('b' => $body, 'n' => $nonce));
    }
    
    private function _proccessMessageView($nonce) {
        $this->_findMessage($nonce);
        if (is_object($this->message)) {
            $this->_deleteMessage();
        } else {
            $this->_sendHeader('x-nonce: ' . $nonce);
        }
    }
    
    private function _runDisplayEngine() {
        $n = $this->_sqlifyStr($_GET['key']);
        $this->_proccessMessageView($n);
    }
    
    private function _runPostEngine() {
        $body   = $this->_sqlifyStr($_POST['m']);
        $nonce  = $this->_randomNonce();
        $msg    = $this->_createMessage($body, $nonce);
        
        if (is_object($msg)) {
             $this->share_url = sprintf('%s://%s/n_%s', self::$url_protocol, self::$url_domain, $nonce);
        } else {
            $this->err = true;
        }
    }
    
    private function _isMessagePost() {
        if (isset($_POST) && isset($_POST['m'])) {
            return true;
        }
        return false;
    }
    
    private function _isMessageRead() {
        if(!isset($_POST) && isset($_GET['key'])) {
            return true;
        }
        return false;
    }
    
    private function _randomNonce($len = 16) {
        $chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890';
        $nonce = NULL;
        for ($i=0; $i<$len; $i++) {
            $nonce .= $chars[rand(0,strlen($chars)-1)];
        }
        return $nonce;
    }

    private function _sqlifyStr($str) {
        $str = htmlentities(trim($str));
        $clean = preg_replace('/[^a-zA-Z0-9=]/i', '', $str);
        $this->_sendHeader('x-clean: ' . $clean);
        $this->_sendHeader('x-dirty: ' . $str);
        return $clean;
    }
    
    /**
     * ========== PUBLIC METHODS ==========
     **/
    
    // ===== STATIC Methods ===== //
    
    public static function factory() {
        return new self();
    }
    
    public static function ltc() {
        return self::$LTC_ADDR;
    }
    
    public static function btc() {
        return self::$BTC_ADDR;
    }
    
    private static function _sendHeader($header) {
        header($header);
    }
    
    // ===== INSTANCE Methods ===== //
    
    public function stopLinkGrabbing() {
        $this->_detectUserAgent();
    }
    
    public function errHeader() {
        $this->_sendHeader(self::$err_header);
    }
    
    public function err() {
        return $this->err;
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
    
    public function run() {
        
        if ($this->err) {
            $this->errHeader();
        }
        
        if ($this->_isMessageRead()) {
            $this->_runDisplayEngine();
        }
        
        if ($this->_isMessagePost()) {
            $this->_runPostEngine();
        }
    }
    
}