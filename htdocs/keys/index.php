<?php
require_once '../../inc/Functions.php';
?>
<!DOCTYPE html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js"> <!--<![endif]-->
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <title>Private, secure, destructable messages with Destruct.co</title>
    <meta name="description" content="Share a confidential note via a web link that will self-destruct after it is read by your intended recipient.">
    <meta name="viewport" content="width=device-width">
    <link rel="stylesheet" href="/css/normalize.css">
    <link rel="stylesheet" href="/css/main.css">
    <link rel="stylesheet" href="/css/style.css">
    <script src="/js/vendor/modernizr-2.6.2.min.js"></script>
</head>
    <body>
	<div id="wrapper">
        <!--[if lt IE 7]>
            <p class="chromeframe">You are using an <strong>outdated</strong> browser. Please <a href="//browsehappy.com/">upgrade your browser</a> or <a href="//www.google.com/chromeframe/?redirect=true">activate Google Chrome Frame</a> to improve your experience.</p>
        <![endif]-->

	    <h1 class="site-head">Keys (Experimental)</h1>
            
            <a href="#" id="show_intro_msg" class="info-toggle">What is this?</a>
            <div class="intro-msg">
		Keys is an experiment using OpenPGP.js for further browser-based encryption using PGP keypairs.
            </div>
	    
            <form id="keysUserForm" action="" method="post">
		    <p class="infoline">
			Your password is <strong>not</strong> sent to the server in plaintext. We cannot decrypt your keys or messages.
		    </p>

		    <input type="text" class="keys-email" placeholder="Email Address">
		    <br style="clear:both">
		    <input type="password" class="keys-password" placeholder="Password">
    
                    <input type="submit" name="loginEncrypted" value="Manage Keys" class="submit">
                    <br style="clear:both">
            </form>
		
	</div>
        
        <script src="//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
        <script>window.jQuery || document.write('<script src="/js/vendor/jquery-1.9.1.min.js"><\/script>')</script>
        <script src="/js/plugins.js"></script>
	<script src="/js/vendor/openpgp/openpgp.min.js"></script>
	<script src="/js/aes.js"></script>
        <script src="/js/keys-main.js"></script>
    </body>
</html>