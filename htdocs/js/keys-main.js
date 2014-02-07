$(function(){
    
    var nl2br = function(str, is_xhtml) {
           var breakTag = (is_xhtml || typeof is_xhtml === 'undefined') ? '<br />' : '<br>';
           return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + breakTag + '$2');
   };
    
    var key_splitter = "|**|";
    var key_list = $("#userKeysList");
    var pub_key_list = $("#userPubKeysList");
    var new_key_btn = $("#createNewKeyBtn");
    var new_pub_key_btn = $("#createNewPubKeyBtn");
    var key_item_tpl = $("#keyItemEntry");
    var pub_key_item_tpl = $("#pubkeyItemEntry");
    var user_page = $("#userAccountPage");
    
    var _priv = {
        dcKey: function(kd, ep) {
            try {
                var k_str = unciph(ep, kd);
            } catch(e) {
                alert("Invalid password.");
            }
            
            if (k_str) {
                var keys_sep = k_str.split(key_splitter);
                return keys_sep;
            }
            return false;
        },
        loadPubKeys: function() {
            pub_key_list.find("li:not(.keys-none-public)").remove();
            $.getJSON("/keys/ajax/keys.php?public", function(r) {
                var keys = r.keys;
                if (keys.length == 0) {
                    $(".keys-none-public").show();
                    return false;
                }
                
                for (var i=0; i<keys.length; i++) {
                    var key = keys[i];
                    var tpl = pub_key_item_tpl.clone();
                    tpl.removeAttr("id");
                    tpl.attr("data-key-id", key.id);
                    tpl.find(".keyLabel").html(key.label);
                    tpl.find(".key-pub").html(key.key_data);
                    
                    var new_li = $("<li>");
                    tpl.appendTo(new_li);
                    
                    new_li.appendTo(pub_key_list);
                }
                
                $(".keys-none-public").hide();
                return true;
            });
        },
        loadKeys: function() {
            key_list.find("li:not(.keys-none)").remove();
            $.getJSON("/keys/ajax/keys.php", function(r) {
                var keys = r.keys;
                if (keys.length == 0) {
                    $(".keys-none").show();
                    return false;
                }
                
                for (var i=0; i<keys.length; i++) {
                    var key = keys[i];
                    var tpl = key_item_tpl.clone();
                    tpl.removeAttr("id");
                    tpl.attr("data-key-id", key.id);
                    tpl.find(".keyLabel").html(key.label);
                    tpl.find(".key-data").html(key.key_data);
                    
                    var new_li = $("<li>");
                    tpl.appendTo(new_li);
                    
                    new_li.appendTo(key_list);
                }
                
                $(".keys-none").hide();
                return true;
            });
            
            _priv.loadPubKeys();
        },
        addPublicKey: function(pd, pl) {
            $.post("/keys/ajax/regkey.php?public", {d: pd, l: pl}, function(r) {
                if (r.key_err == true) {
                    alert("Error saving keypair.");
                    return;
                }
                _priv.loadPubKeys();
            }, "json");            
        },
        createKeyPair: function() {
            var key_label = prompt("Enter a label for this new keypair:");
            var pass = prompt("Enter a STRONG PASSWORD for this new keypair:");
            var pass2 = prompt("Enter the password again:");
            if (pass !== pass2) {
                alert("The passwords don't match!");
                return false;
            }
            var email = window.user_email;
            var
                new_key_pair = window.openpgp.generateKeyPair(1, 1280, email, email+pass)
                , priv = new_key_pair.privateKeyArmored
                , pub = new_key_pair.publicKeyArmored
                , raw_key = JSON.stringify(new_key_pair.key)
                , key_arr = new Array();
                
            key_arr.push(priv);
            key_arr.push(pub);
            key_arr.push(raw_key);
            var keys_joined = key_arr.join(key_splitter);
            
            try {
                var enc_key_str = ciph(email+pass, keys_joined);
            } catch(err) {
                cnsole.log(err);
            }
            if (enc_key_str) {
                $.post("/keys/ajax/regkey.php", {d: enc_key_str, l:key_label}, function(r) {
                    var ret_val = true;
                    if (r.key_err == true) {
                        alert("Error saving keypair.");
                        ret_val = false;
                    }
                    _priv.loadKeys();
                    return ret_val;
                }, "json");
            }
            return true;
        }
    };
    
    var loadUserPage = function(em) {
        window.user_email = em;
        $("#keysUserForm").remove();
        $("#userAccountPage").show();
        _priv.loadKeys();
        new_key_btn.on("click", function(){
            _priv.createKeyPair();
        });
        
        //_priv.addPublicKey();
        
        new_pub_key_btn.avgrund({
                height: 500,
                holderClass: 'custom',
                showClose: true,
                enableStackAnimation: true,
                onBlurContainer: '#wrapper',
                template: '<p>Paste someone\'s public key here.</p>' +
                '<div>' +
                '<input type="text" class="keys-pub-name" placeholder="Person\'s Name or Email">' +
                '<br style="clear:both">' +
                '<textarea class="keys-pub-key"></textarea>'+
                '<input type="button" value="Add Public Key" class="submit keys-pub-add">' +
                '</div>'
        });
        
    };
    
    $("body").on("click", ".keys-pub-add", function(){
        var pl = $(".keys-pub-name").val();
        var pd = $(".keys-pub-key").val();
        _priv.addPublicKey(pd, pl);
        $(".avgrund-close").trigger("click");
        return false;
    });
    
    user_page.on("click", ".unlock-btn", function() {
        var data = $(this).siblings(".key-data").html();
        var label = $(this).siblings(".keyLabel").html();
        var unlocked_pass = prompt("Enter the password for the key '"+label+"'");
        var ep = window.user_email+unlocked_pass;
        var key_unlocked = _priv.dcKey(data, ep);
        
        if (key_unlocked == false) {
            return false;
        }
        
        $(this).siblings(".key-priv").html(nl2br(key_unlocked[0], false));
        $(this).siblings(".key-pub").html(nl2br(key_unlocked[1], false));
        $(this).siblings(".key-raw").html(nl2br(key_unlocked[2], false));
        
        var locked = $(this).closest(".is-locked");
        locked.removeClass("is-locked").addClass("is-unlocked");
        
        return true;
    });
    
    user_page.on("click", ".lock-btn", function() {
        $(this).siblings(".key-priv").html("");
        $(this).siblings(".key-pub").html("");
        $(this).siblings(".key-raw").html("");
        var unlocked = $(this).closest(".is-unlocked");
        unlocked.removeClass("is-unlocked").addClass("is-locked");
    });
    
    user_page.on("click", ".privk-btn", function() {
        $(this).siblings(".key-priv").toggle();
    });
    
    user_page.on("click", ".raw-btn", function() {
        $(this).siblings(".key-raw").toggle();
    });
    
    user_page.on("click", ".pubk-btn", function() {
        $(this).siblings(".key-pub").toggle();
    });
    
    $("#show_intro_msg").on("click", function(e){
        e.preventDefault();
        $(".intro-msg").toggle();
        return false;
    });
    
    $("#keysUserForm").submit(function(){
            var email = $(".keys-email").val();
            var pass = $(".keys-password").val();
            $.post("/keys/ajax/lookup.php", {em:email, pw:pass}, function(R) {
                if (R.id == 0) {
                    alert("Error logging in or creating account.");
                    return false;
                }
                loadUserPage(email);
                return false;
            }, "json")
            .fail(function(d) {
                return false;
            });
            
            return false;
    });

});