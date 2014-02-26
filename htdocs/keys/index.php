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
    <link rel="stylesheet" href="/js/vendor/avgrund/style/avgrund.css">
    <script src="/js/vendor/modernizr.js"></script>
    <meta property="twitter:account_id" content="4503599627845130" />
</head>
    <body class="keys-main">
	<div id="wrapper">
        <!--[if lt IE 7]>
            <p class="chromeframe">You are using an <strong>outdated</strong> browser. Please <a href="//browsehappy.com/">upgrade your browser</a> or <a href="//www.google.com/chromeframe/?redirect=true">activate Google Chrome Frame</a> to improve your experience.</p>
        <![endif]-->

	    <h1 class="site-head">Keys (Experimental)</h1>
            
            <a href="#" id="show_intro_msg" class="info-toggle">What is this?</a>
            <div class="intro-msg">
		Keys is an experiment using OpenPGP.js for further browser-based encryption using PGP keypairs. You create an account or login, then create a keypair. The keypair is encrypted with your password before it's sent to the server, and your password is never sent to the server. All encryption/decryption happns in the browser.
            </div>
	    
	    <div id="userAccountPage" class="user-keys-page">
		<div class="nav-bar">
		    <a href="/keys/help.php" class="box-clickable" style="margin-left: 10px;">Help</a> - <a href="/keys/logout.php" class="box-clickable">Logout</a>
		    <br style="clear:both">
		</div>
		<div id="keyItemEntry" class="entryTemplate is-locked">
		    <div class="key-data"></div>
		    <span class="keyLabel"></span> <span class="box-clickable unlock-btn">Unlock</span> <span class="box-clickable lock-btn">LOCK</span> <span class="box-clickable pubk-btn">Public Key</span> <span class="box-clickable privk-btn">Private Key</span> <span class="box-clickable raw-btn" style="display:none;">Raw Key</span> <span class="box-clickable enc-msg-btn">Encrypt</span> <span class="box-clickable dc-msg-btn">Decrypt</span>
		    
		    <div class="key-pub-raw key-block" style="display:none;"></div>
		    <div class="key-priv-raw key-block" style="display:none;"></div>
		    <div class="key-raw-raw key-block" style="display:none;"></div>
		    
		    <div class="key-pub key-block"></div>
		    <div class="key-priv key-block"></div>
		    <div class="key-raw key-block"></div>
		</div>
		
		<div id="pubkeyItemEntry" class="entryTemplate is-unlocked">
		    <span class="keyLabel"></span> <span class="box-clickable pubk-btn">View Key</span>
		    <div class="key-pub key-block"></div>
		    <div class="key-pub-raw" style="display:none;"></div>
		</div>
		
		<h2>Your Keypairs <span class="box-clickable help-icon" id="keyPairHelp" title="These are the keypairs you have created. You can generate a new keypair with the 'Create' button which will allow you to send and receive secure messages.

		The new public/private keypair will be packed together and then encrypted with your password before ever being stored on the server.

		We never capture your key passwords.">?</span> <span class="box-clickable" id="createNewKeyBtn">Create</span></h2>
		<ul id="userKeysList" class="key-list-ul">
		    <li class="keys-none">No keys.</li>
		</ul>

		<h2>Public Keys <span class="box-clickable help-icon" id="publicKeyHelp" title="These are the public keys you've added.

		In order to send someone a secure message or link, they must give you their public key.

		Public keys are not secret information, and are not encrypted.">?</span> <span class="box-clickable" id="createNewPubKeyBtn">Add</span></h2>
		<ul id="userPubKeysList" class="key-list-ul">
		    <li class="keys-none-public">No keys.</li>
		</ul>
	    </div>
	    
            <form id="keysUserForm" action="" method="post">
		    <input type="text" class="keys-email" placeholder="Email Address">
		    <br style="clear:both">
		    <input type="password" class="keys-password" placeholder="Password">
                    <input type="submit" name="loginEncrypted" value="Manage Keys" class="submit">
                    <br style="clear:both">
            </form>
	    
            <p class="authorline">
                    Donate DOGE: <strong><?php echo DestructEngine::doge();?></strong>
            </p>
            <p class="authorline">
                    Donate LTC: <strong><?php echo DestructEngine::ltc();?></strong>
            </p>
	    <p class="authorline hotline">Keys is a <a href='/'>Destruct.co</a> experiment.</p>
	</div>

	<!--
        <script>window.jQuery || document.write('<script src="/js/jquery.js"><\/script>')</script>
        <script src="/js/core/plugins.js"></script>
	<script src="/js/vendor/openpgp/openpgp.js"></script>
	<script src="/js/vendor/avgrund/avgrund.js"></script>
	<script src="/js/core/aes.js"></script>
        <script src="/js/core/keys-main.js"></script>
	-->
	
	<script src="/combined.js"></script>
	
        <script>
                (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
                (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
                m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
                })(window,document,'script','//www.google-analytics.com/analytics.js','ga');
                
                ga('create', 'UA-27412705-2', 'destruct.co');
                ga('send', 'pageview');
        </script>
    </body>
</html>