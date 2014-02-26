<?php
require_once '../../inc/Functions.php';
?>
<!DOCTYPE html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <link href='//fonts.googleapis.com/css?family=Exo:100,200,300,400,500,700' rel='stylesheet' type='text/css'>
    <link href="/css/chat.css" rel="stylesheet">
    <title>Chat</title>
</head>
    <body class="chat-main landing">
	 <header class="needs-logged-in">
	    <div class="user-info needs-logged-in"></div>
	    <div class="user-nav">
		<a href="/keys/logout.php?p=chat" class="box-clickable btn-red btn" id="do_logout">Logout</a>
	    </div>
	 </header>
    
	<div class="main-landing" id="login_signup">
	    <h1 class="center-text header-callout landing-head">Login / Signup</h1>
	    <form action="" method="POST" id="user_form" class="box-form">
		<label>
		    <span>Email</span> <input type="text" id="login_e">
		</label>
		<label>
		    <span>Password</span> <input type="password" id="login_p">
		</label>
		<input type="submit" id="login_s" value="Submit">
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
			The server never stores, or captures, your password except to hash it to login.
		    </li>
		    <li>
			Every chat message is encrypted with your public, and your recipients. Not even I (<a class='btn btn-green btn-small' href='//twitter.com/NerdWhoCodes'>@NerdWhoCodes</a>) can read a single message.
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
	    
	    <div class="sep"></div>
	    
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
	    <textarea class="conversation-text-input needs-active-chat"></textarea>
	</section>
	
	<footer>
	    <a class='btn' href='/'>A Destruct.co Experiment</a> made by <a class='btn btn-green' href='//twitter.com/NerdWhoCodes'>@NerdWhoCodes</a>
	</footer>
    <!--
        <script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>
        <script>window.jQuery || document.write('<script src="/js/vendor/jquery-1.11.0.min.js"><\/script>')</script>
        <script src="/js/plugins.js"></script>
	<script src="/js/vendor/openpgp/openpgp.min.js"></script>
	<script src="/js/aes.js"></script>
        <script src="/js/chat-main.js"></script>
    -->
    
	<script src="/combined.js"></script>
	
	<input type="hidden" id="curr_chat_pub_key">
    </body>
</html>