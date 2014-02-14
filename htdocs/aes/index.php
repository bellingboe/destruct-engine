<!DOCTYPE html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <title>AES</title>
</head>
    <body>
	
	<h1>AES</h1>
	
	<h2>
	    Text:
	</h2>
	<textarea  id="aes_text" style="width:400px; height:300px;"></textarea>
	
	<h2>
	    Password:
	</h2>
	<input type="text" id="aes_pass">
	
	<input type="button" id="aes_type_e" value="Encrypt"> <input type="button" id="aes_type_d" value="Decrypt">
	
	<hr>
	<pre id="aes_res" style="word-wrap: break-word; width:100%;"></pre>
	<hr>

        <script src="//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
        <script>window.jQuery || document.write('<script src="/js/vendor/jquery-1.9.1.min.js"><\/script>')</script>
        <script src="/js/plugins.js"></script>
	<script src="/js/aes.js"></script>
	
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