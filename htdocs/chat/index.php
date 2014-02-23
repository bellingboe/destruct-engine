<!DOCTYPE html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <link href='//fonts.googleapis.com/css?family=Exo:100,400,500,700' rel='stylesheet' type='text/css'>
    <style>
	* {
	    padding: 0;
	    margin: 0;
	    box-sizing: border-box;
	    outline: none;
	}
	body {
	    background: #232324;
	    color: #fff;
	    font-family: 'Exo', sans-serif;
	}
	h1, h2 {
	    font-weight: 700;
	    text-shadow: 0 3px 0 #111112;
	}
	header {
	    width: 100%;
	    height: 60px;
	    display: block;
	    background: rgba(10, 10, 13, 0.8);
	    border-bottom: 3px solid rgba(10, 10, 10, 0.7);
	}
	.center-text {
	    padding:10px;
	    width:100%;
	    text-align:center;
	    font-size: 34pt;
	}
	.header-callout {
	    margin-top: 30px;
	}
	input[type="text"], input[type="password"] {
	    border: 0;
	    padding-top: 15px;
	    padding-bottom: 15px;
	    margin-top: 12px;
	    margin-bottom: 12px;
	    -moz-box-sizing: border-box;
	    box-sizing: border-box;
	    display: inline-block;
	    padding-left: 15px;
	    padding-right: 15px;
	    border-bottom: 3px solid rgba(21, 21, 22, 0.85);
	    background: rgba(210, 210, 210, 0.2);
	}
	input[type="submit"], .btn {
	    background: #1e5088;
	    display: block;
	    border: 0;
	    border-bottom: 3px solid #1e374f;
	    padding: 10px;
	    font-size: 16pt;
	    color: #FFF;
	    cursor: pointer;
	    text-align: center;
	    box-shadow: 0px 4px 7px 1px rgba(0, 0, 0, 0.3);
	    font-family: 'Exo', sans-serif;
	    font-weight: 100;
	    text-shadow: 0 1px 1px rgba(0, 0, 0, 0.7);
	}
	input[type="submit"]:active, .btn:active {
	    background: #183f6b;
	}
	.contacts-list .btn {
	    margin: 15px;
	}
	.btn-green {
	    background: #2d881e;
	    border-bottom-color: #254f1e;
	}
	.btn-green:active {
	    background: #307226;
	}
	input[type="text"]:focus, input[type="password"]:focus {
	    background: #fff;
	}
	.box-form {
	    display: block;
	    width: 40%;
	    margin: 0 auto;
	    padding: 10px;
	}
	.box-form input {
	    display: block;
	    margin-top: 20px;
	    width: 100%;
	    max-width: 500px;
	    margin: 0 auto;
	}
	.box-form label {
	    display: block;
	    margin: 15px;
	}
	.box-form span {
	    display: block;
	    height: 40px;
	    line-height: 38px;
	    font-weight: 100;
	    font-size: 18pt;
	    text-shadow: 0 2px 0 rgba(17, 17, 18, 0.7);
	    opacity: 0.7;
	    width: 100%;
	    max-width: 500px;
	    margin: 0 auto;
	}
	.needs-logged-in {
	    display: none;
	}
	header a,
	header a:link,
	header a:visited {
	    display: inline-block;
	    height: 60px;
	    line-height: 40px;
	    padding: 10px;
	    color: #FFF;
	    text-decoration: none;
	    font-weight: 100;
	    font-size: 14pt;
	    -webkit-transition: all ease-in-out 0.25s;
	    transition: all ease-in-out 0.25s;
	    width: 100px;
	    text-align: center;
	}
	header a:hover {
	    background: rgba(0, 0, 0, 0.3);
	}
	.main-landing {
	    display: none;
	}
	.contacts-list {
	    background: rgba(11, 11, 12, 0.3);
	    width: 300px;
	    bottom: 0;
	    top: 60px;
	    left: 0;
	    position: fixed;
	    z-index: -1;
	}
	.user-nav {
	    text-align: right;
	}
	.user-info {
	    text-align: left;
	    height: 60px;
	    line-height: 30px;
	    float: left;
	    padding: 15px;
	    font-weight: bolder;
	    font-size: 13pt;
	    text-shadow: 0 2px 4px rgb(0, 0, 0);
	    color: rgba(255, 255, 255, 0.2);
	}
	.hide {
	    display:none;
	}
	input.contact-search-text {
	    margin-top: 5px;
	    margin-bottom: 5px;
	    padding: 10px;
	    width: 100%;
	    background: #fff;
	    border-bottom:0;
	}
	.contact-search-text:focus {
	    box-shadow: 0px 0px 12px 5px rgb(20, 80, 136);
	}
	.add-contact-wrapper {
	    position: relative;
	}
	.close-btn {
	    position: absolute;
	    top: 0;
	    right: 0;
	    cursor: pointer;
	    width: 30px;
	    height: 35px;
	    line-height: 33px;
	    text-align: center;
	    font-weight: 500;
	    background: rgba(0, 0, 0, 0.2);
	}
	.close-btn:hover {
	    background: rgba(0, 0, 0, 0.4);
	}
	.close-btn:active {
	    background: rgba(0, 0, 0, 0.5);
	}
    </style>
    <title>Chat</title>
</head>
    <body>
	 <header class="needs-logged-in">
	    <div class="user-info needs-logged-in"></div>
	    <div class="user-nav">
		<a href="/keys/logout.php?p=chat" class="box-clickable">Logout</a>
	    </div>
	 </header>
    
	<div class="main-landing" id="login_signup">
	    <h1 class="center-text header-callout">Login / Signup</h1>
	    <form action="" method="POST" id="user_form" class="box-form">
		<label>
		    <span>Email</span> <input type="text" id="login_e">
		</label>
		<label>
		    <span>Password</span> <input type="password" id="login_p">
		</label>
		<input type="submit" id="login_s" value="Submit">
	    </form>
	</div>
	
	<section role="sidebar" class="needs-logged-in contacts-list">
	    <span class="btn btn-green add-contact-wrapper">
		<div class="contact-search">Add Contact</div>
		<div class="contact-search-form form-group hide">
		    <div class="close-btn">x</div>
		    <input type="text" class="contact-search-text" placeholder="Search for email...">
		</div>
	    </span>
	</section>
    
        <script src="//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
        <script>window.jQuery || document.write('<script src="/js/vendor/jquery-1.9.1.min.js"><\/script>')</script>
        <script src="/js/plugins.js"></script>
	<script src="/js/vendor/openpgp/openpgp.min.js"></script>
	<script src="/js/aes.js"></script>
        <script src="/js/chat-main.js"></script>
	
	<script>
	$(document).ready(function () {	    
	    var passw,
		textc;
	    
	    var _decrypt = function (p, d) {
		try {
		    uc = unciph(p, d);
		} catch(e) {
		    alert("Could not decrypt. Invalid password maybe?");
		    return false;
		}
		return uc;
	    };
	    
	    var _encrypt = function (p, d) {
		try {
		    ec = ciph(p, d);
		} catch(e) {
		    alert("Could not encrypt. ("+e+")");
		    return false;
		}
		return ec;
	    };
	    
	    var _getText = function () {
		return $("#aes_text").val();
	    };
	    
	    var _getPass = function () {
		return $("#aes_pass").val();
	    };
	    
	    var _setVars = function () {
		passw = _getPass();
		textc = _getText();
	    };
	    
	    var _setResult = function (r) {
		$("#aes_res").html(r);
	    };
	    
	    $("#aes_type_e").on("click",  function(){
		_setVars();
		var res = _encrypt(passw, textc);
		if ("boolean" !== typeof res) {
		    _setResult(res);
		}
	    });
	    
	    $("#aes_type_d").on("click",  function(){
		_setVars();
		var res = _decrypt(passw, textc);
		if ("boolean" !== typeof res) {
		    _setResult(res);
		}
	    });
	    
	});
	</script>
	
    </body>
</html>