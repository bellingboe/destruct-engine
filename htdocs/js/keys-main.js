

$(function(){

	function nl2br (str, is_xhtml) {
		var breakTag = (is_xhtml || typeof is_xhtml === 'undefined') ? '<br />' : '<br>';
		return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + breakTag + '$2');
	}

        $("#show_intro_msg").on("click", function(e){
            e.preventDefault();
            $(".intro-msg").toggle();
            
            return false;
        });
        
	$("#keysUserForm").submit(function(){
                var email = $(".keys-email").val();
                var pass = $(".keys-password").val();
		$.post("/keys/ajax/lookup.php", {em: email}, function(R) {
                    if (R.id == null) {
                        alert("Error acessing user data.");
                        return false;
                    }
                    if (R.keys == null) {
                        var new_key_pair = window.openpgp.generateKeyPair(1, 1280, email, email+pass);
                        var priv = new_key_pair.privateKeyArmored;
                        var pub = new_key_pair.publicKeyArmored;
                        
                        var key_arr = new Array();
                        key_arr.push(priv);
                        key_arr.push(pub);
                        var keys_joined = key_arr.join("[[**SPLITTER**]]");
                        
                        try {
                            var enc_key_str = ciph(email+pass, keys_joined);
                        } catch(err) {
                            cnsole.log(err);
                        }
                        
                        $.post("/keys/ajax/regkey.php", {d: enc_key_str}, function(R) {
                            console.log(R);
                        }, "json");
                    } else {
                        for (var i=0;i<R.keys.length;i++) {
                            var kd = R.keys[i];
                            try {
                                var k_str = unciph(email+pass, kd.key_data);
                            } catch(e) {
                                alert("Invalid password.");
                            }
                            if (k_str) {
                                var keys_sep = k_str.split("[[**SPLITTER**]]");
                                var priv = keys_sep[0];
                                var pub = keys_sep[1];
                                console.log(pub);
                            }
                        }
                    }
                    return false;
		})
		.fail(function(d) {
			console.log('failed');
			console.log(d);
		});
		
		return false;
	});
        
});