$(function(){
    
    var key_size = 2048
    var key_splitter = "|**|";
    var valid_storage_change = false;

    var _priv = {
        accessCheck: function() {
            $.getJSON("/keys/ajax/access.php", function(r) {
                if (r.id !== 0) {
                    var stored_pass = window.localStorage.getItem(r.email);
                    if (stored_pass) {
                        try {
                             window.user_pass = unciph(r.email, stored_pass);
                        } catch(e) {
                            valid_storage_change = false;
                            window.localStorage.removeItem( window.localStorage.key(0) );
                        }
                    }
                    loadUserPage(r.email);
                } else {
                    valid_storage_change = true;
                    window.localStorage.removeItem( window.localStorage.key(0) );
                    $("#login_signup").fadeIn();
                }
            });
        },
        dcKey: function(kd, ep) {
            try {
                var k_str = unciph(ep, kd);
            } catch(e) {
                window.user_pass = undefined;
                delete window.user_pass;
                window.localStorage.removeItem(window.user_email);
            }
            
            if (k_str) {
                window.localStorage.setItem(window.user_email, ciph(window.user_email, window.user_pass));
                var keys_sep = k_str.split(key_splitter);
                return keys_sep;
            }
            return false;
        },
        generateKey: function(e, p, l) {
            var
                new_key_pair = window.openpgp.generateKeyPair(1, key_size, l+" <"+e+">", e+p)
                , priv = new_key_pair.privateKeyArmored
                , pub = new_key_pair.publicKeyArmored
                , raw_key = JSON.stringify(new_key_pair.key)
                , key_arr = new Array();
                
            key_arr.push(priv);
            key_arr.push(pub);
            key_arr.push(raw_key);
            var keys_joined = key_arr.join(key_splitter);
            
            try {
                var enc_key_str = ciph(e+p, keys_joined);
            } catch(err) {
                cnsole.log(err);
            }
            if (enc_key_str) {
                $.post("/keys/ajax/regkey.php", {d: enc_key_str, l: l, pub: pub}, function(r) {
                    var ret_val = true;
                    if (r.key_err == true) {
                        alert("Error saving keypair.");
                        ret_val = false;
                    }
                    _priv.loadKeys();
                    return ret_val;
                }, "json");
            }
            return;
        },
        loadUserKeypair: function() {
            $.getJSON("/keys/ajax/keys.php", function(r) {
                var keys = r.keys;
                
                var kp = false
                
                for (var i=0; i<keys.length; i++) {
                    var key = keys[i];
                    kp = _priv.unlockKeypair(key.key_data);
                    
                    while( kp == false ) {
                        window.user_pass = prompt("Enter your password to unlock your private key.");
                        kp = _priv.unlockKeypair(key.key_data);
                    }
                    
                    window.user_pubkey = kp[1];
                    window.user_privkey = kp[0];
                }
                
                return true;
            });
        },
        unlockKeypair: function(data) {
            var ep = window.user_email+window.user_pass;
            var key_unlocked = _priv.dcKey(data, ep);
            
            return key_unlocked;
        }
    };
    
    var loadUserPage = function(em) {
        window.user_email = em;
        _priv.loadUserKeypair();
        $("#login_signup").remove();
        $(".needs-logged-in").fadeIn();
        $(".user-info").html(window.user_email);
    };
    
    $(window).bind('storage', function (e) {
        if (e.originalEvent.newValue !== e.originalEvent.oldValue && !valid_storage_change) {
            alert('Oops! Internal data modified. You will need to re-enter your password.');
            window.localStorage.removeItem(window.user_email);
            window.location.reload();
        }
      
    });
    
    $(".contact-search").on("click", function(){
        $(".contact-search-form").toggle();
        $(".contact-search-text").focus();
    });
    
    $(".close-btn").on("click", function() {
        $(this).closest(".form-group").toggle();
    });
    
    $("#user_form").submit(function(){
            var email = $("#login_e").val();
            var pass = $("#login_p").val();
            $.post("/keys/ajax/lookup.php", {em:email, pw:pass}, function(R) {
                if (R.id == 0) {
                    alert("Error logging in or creating account.");
                    return false;
                }
                
                window.user_pass = pass;
                loadUserPage(email);
                
                if (R.is_new == true) {
                    _priv.generateKey(email, pass, "Chat");
                }

                return false;
            }, "json")
            .fail(function(d) {
                return false;
            });
            
            return false;
    });

    _priv.accessCheck();

});