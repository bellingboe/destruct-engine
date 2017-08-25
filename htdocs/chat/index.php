<?php
require_once '../../inc/Functions.php';
?>
<!DOCTYPE html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <link href='//fonts.googleapis.com/css?family=Exo:100,200,300,400,500,700' rel='stylesheet' type='text/css'>
	
    <link href="/css/chat.css" rel="stylesheet">
    <link href="/css/pw.css" rel="stylesheet">
     
    <meta name="description" content="Secure end-to-end AES+PGP chat sessions.">

    <meta property="twitter:account_id" content="17138864" />
    <meta name="twitter:card" content="summary">
    <meta name="twitter:site" content="@_ellingboe">
    <meta name="twitter:title" content="Chat with end-to-end AES encryption. No more prying eyes!">
    <meta name="twitter:description" content="Everything is encrypted in 256-bit AES in combintation with PGP keys">
    <meta name="twitter:creator" content="@_ellingboe">
    <meta name="twitter:image:src" content="">
    <meta name="twitter:domain" content="chat.gd">
    <meta name="twitter:app:name:iphone" content="">
    <meta name="twitter:app:name:ipad" content="">
    <meta name="twitter:app:name:googleplay" content="">
    <meta name="twitter:app:url:iphone" content="">
    <meta name="twitter:app:url:ipad" content="">
    <meta name="twitter:app:url:googleplay" content="">
    <meta name="twitter:app:id:iphone" content="">
    <meta name="twitter:app:id:ipad" content="">
    <meta name="twitter:app:id:googleplay" content="">
    <title>Secure end-to-end AES+PGP Chat Sessions</title>
</head>
     <body class="chat-main landing">
      
	  <header class="needs-logged-in">
	     <div class="user-info needs-logged-in"></div>
	     <div class="user-nav">
		 <a href="/keys/logout.php?p=chat" class="box-clickable btn-red btn" id="do_logout">Logout</a>
	     </div>
	  </header>
     
	  <div class="main-landing" id="login_signup">
	      <h1 class="center-text header-callout landing-head">Chat</h1>
	     
	  
	      <form action="" method="POST" id="user_form" class="box-form">
		<label>
		    <span>Email</span> <input type="text" id="login_e">
		</label>
		<label>
		    <span>
			<span id="pw-lbl">Password</span>
			<div id="pwindicator">
			    <div class="bar"></div>
			    <div class="label"></div>
			</div>
		    </span> <input type="password" id="login_p" data-indicator="pwindicator">
		</label>
		<input type="submit" id="login_s" class="btn" value="Submit">
	      </form>
	      <section class="box-form">
		  <h2>Some Tidbits</h2>
		  <ul>
		      <li>
			  Enter an email address and a password. You will use them to login.
		      </li>
		      <li>
			  Each account gets an encrypted PGP keypair, locked with your password. 
		      </li>
		      <li>
			  The server salts, and hashes your password, and never stores the actual password itself.
		      </li>
		      <li>
			  Every chat message is encrypted with your public key, and your recipients. Not even I (<a class='btn btn-green btn-small' href='//twitter.com/_ellingboe'>_ellingboe</a>) can read a single message.
		      </li>
		  </ul>
	      </section>
	  </div>
	 
	 <section class="needs-logged-in contacts-list">
	     <span class="btn btn-green add-contact-wrapper">
		 <div class="contact-search">Add Contact</div>
		 <div class="contact-search-form form-group hide">
		     <div class="close-btn contact-search-close">x</div>
		     <input type="text" class="contact-search-text" placeholder="Search for FULL email address...">
		     <div class="contact-search-results"></div>
		 </div>
	     </span>
	     	     
	     <div class="contact-header">Contacts</div>
	     <div class="contact-list">None</div>
	     
	     <div class="contact-header">Contact Requests</div>
	     <div class="contact-requests">None</div>
	     
	     <div class="contact-header">Sent Requests</div>
	     <div class="contact-sent">None</div>
	 </section>
	
	<section class="needs-logged-in welcome-screen hide">
	    <h1>Welcome</h1>
	    <h2>Contacts</h2>
	    <ul>
		<li>
		    To add contacts, click on the "Add" button on the left, enter their <i>full</i> email address, then click on it when it appears.
		</li>
		<li>
		    When they approve your request, they will appear under "Contacts". If they reject your request, you will no logner see their email in any list.
		</li>
	    </ul>
	</section>
      
	<section class="conversation-output hide">
	    <h1 id="conversation-header" class="needs-active-chat"></h1>
	    <div class="conversation-output-stream needs-active-chat"></div>
	    
	    <div class="chat-actions-toolbar">
		<form id="upload_file_crypt" action="" class="toolbar-form">
		    <input type="submit" name="send-file" class="btn btn-green btn-small" id="send-file" value="Attach File">
		    <div class="hide">
			<input name="files[]" type="file" class="hide" id="up-file-files">
		    </div>
		</form>
		<div id="up-file-status" class="toolbar-status"></div>
	    </div>

	    <textarea class="conversation-text-input needs-active-chat"></textarea>
	</section>
	
	<input type="hidden" id="curr_chat_pub_key">
	
	<footer>
	    <a class='btn' href='/'>A Chat.gd Experiment</a> made by <a class='btn btn-green' href='//twitter.com/_ellingboe'>@_ellingboe</a> <a class='btn btn-green btn-small' href="/keys/">Key Management</a> <a class='btn btn-blue btn-small' href="https://github.com/bellingboe/destruct-engine">Source Code</a>
	</footer>
	
	<script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>
	<script src="/combined.js"></script>
	
	<div class="sheet-msg-box"></div>
	<div class="sheet-overlay"></div>
	
				<script>
						(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
						(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
						m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
						})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
				
						ga('create', 'UA-105320948-1', 'auto');
						ga('send', 'pageview');
						
					ga('send', 'page', 'land', 'chat-homepage', {
						'time': time()
					});
				
				</script>
	
    </body>
</html>