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

	    <h1 class="site-head">Keys - Help</h1>
            
	    <h2>Your Keypairs</h2>
	    <ul>
		<li>
		    You can create as many keypairs as you want.
		</li>
		<li>
		    Each keypair requires a password to encrypt before storage in our database, and to use the coresponding private key for signing messages.
		</li>
		<li>
		    You must unlock each keypair to do anything with it.  We do not store your password you choose, so if you forgot it, that keypair is unusable forevver.
		</li>
	    </ul>

	    <h2>Public Keys</h2>
	    <ul>
		<li>
		    You can think of these as contacts. You can encrypt / decrypt messages to & from these people ONLY.
		</li>
		<li>
		    If someone sends you their public key, you can click the "Add" button and paste it in and we'll save it for you.
		</li>
	    </ul>
	    
	    <h2>Encrypting A Message</h2>
	    <ol>
		<li>
		    Click "UNLOCK" for the keypair you wish to sign & encrypt the message with.
		</li>
		<li>
		    (Make sure the recipient has the public key for your chosen keypair.)
		</li>
		<li>
		    Once unlocked, click "Encrypt", and enter the password to decrypt your private key.
		</li>
		<li>
		    Choose the recipients public key, and enter your message. Remember, only the recipient can read your message, and they can only read the message if you've given them YOUR own public key also.
		</li>
	    </ol>

	    <h2>
		Decrypting A Message
	    </h2>
	    <ol>
		<li>
		    Click "UNLOCK" for the keypair you wish to decrypt with.
		</li>
		<li>
		    (Make sure you have the sender's public key in your "Public Keys" list.)
		</li>
		<li>
		    Once unlocked, click "Decrypt", and enter the password to decrypt your private key.
		</li>
		<li>
		    Choose the senders public key, and enter the PGP message. Remember, you must choose the correct sender to decrypt the message.
		</li>
	    </ol>
	    
	    <p class="authorline hotline">Keys is a <a href='/'>Destruct.co</a> experiment.</p>
	</div>
    </body>
</html>