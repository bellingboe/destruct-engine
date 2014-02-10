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
        createHiddenModalEl: function() {
            $("<img>").addClass("modal-hack").css({width: 0, height: 0}).appendTo($("body"));
        },
        removeHiddenModalEl: function() {
            $(".modal-hack").remove();
        },
        getHiddenModalEl: function() {
            return $(".modal-hack");
        },
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
        keyPairDropdown: function() {
            var dropdown = $("<select>");
            $("#userKeysList .is-unlocked").each(function (index, value) {
                var key_id = $(this).attr("data-key-id");
                var key_label = $(this).find(".keyLabel").html();
                var option_item = $("<option>").val(key_id).html(key_label).appendTo(dropdown);
            });
            return dropdown;
        },
        publicKeyDropdown: function() {
            var dropdown = $("<select>").addClass("pub-key-select");
            $("#userPubKeysList .is-unlocked").each(function (index, value) {
                var key_id = $(this).attr("data-pub-key-id");
                var key_label = $(this).find(".keyLabel").html();
                var option_item = $("<option>").val(key_id).html(key_label).appendTo(dropdown);
            });
            return dropdown.wrap('<p>').parent();
        },
        getRawPrivateById: function(id) {
            return $(".kp-"+id).find(".key-priv-raw").html();
        },
        getPubKeyById: function(id) {
            return $(".pk-"+id).find(".key-pub-raw").html();
        },
        accessCheck: function() {
            $.getJSON("/keys/ajax/access.php", function(r) {
                if (r.id !== 0) {
                    loadUserPage(r.email);
                }
            });
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
                    tpl.addClass("pk-"+key.id)
                    tpl.attr("data-pub-key-id", key.id);
                    tpl.find(".keyLabel").html(key.label);
                    tpl.find(".key-pub").html(nl2br(key.key_data, false));
                    tpl.find(".key-pub-raw").html(key.key_data);
                    
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
                    tpl.addClass("kp-"+key.id)
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
            
            if (!key_label || key_label.length == 0) {
                return;
            }
            
            var pass = prompt("Enter a STRONG PASSWORD for this new keypair:");
            var pass2 = prompt("Enter the password again:");
            if (pass !== pass2) {
                alert("The passwords don't match!");
                return;
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
            return;
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
    
    $(".help-icon").on("click", function() {
        alert($(this).attr("title"));
    });
    
    user_page.on("click", ".unlock-btn", function() {
        var data = $(this).siblings(".key-data").html();
        var label = $(this).siblings(".keyLabel").html();
        var unlocked_pass = prompt("To unlock this keypair, enter its password.\n\nIf you do not remember the password, this key cannot be used.\n\nUsing Key: '"+label+"'");
        if (!unlocked_pass || unlocked_pass.length == 0) {
            return;
        }
        
        var ep = window.user_email+unlocked_pass;
        var key_unlocked = _priv.dcKey(data, ep);
        
        if (key_unlocked == false) {
            return;
        }
        
        $(this).siblings(".key-priv").html(nl2br(key_unlocked[0], false));
        $(this).siblings(".key-pub").html(nl2br(key_unlocked[1], false));
        $(this).siblings(".key-raw").html(nl2br(key_unlocked[2], false));
        
        $(this).siblings(".key-priv-raw").html(key_unlocked[0]);
        $(this).siblings(".key-pub-raw").html(key_unlocked[1]);
        $(this).siblings(".key-raw-raw").html(key_unlocked[2]);
        
        var locked = $(this).closest(".is-locked");
        locked.removeClass("is-locked").addClass("is-unlocked");
    });
    
    user_page.on("click", ".lock-btn", function() {
        $(this).siblings(".key-priv").html("");
        $(this).siblings(".key-pub").html("");
        $(this).siblings(".key-raw").html("");
        $(this).siblings(".key-priv-raw").html("");
        $(this).siblings(".key-pub-raw").html("");
        $(this).siblings(".key-raw-raw").html("");
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
    
    user_page.on("click", ".dc-msg-btn", function() {
        var priv_str = $(this).siblings(".key-priv-raw").html();
        var priv_key_obj = window.openpgp.key.readArmored(priv_str);        
        var label = $(this).siblings(".keyLabel").html();
        var unlocked_pass = prompt("To use this private key you need to enter the password to decrypt it.\n\nIf you do not remember the password, this key cannot be used.\n\nUsing Key: '"+label+"'");
        var priv_key = priv_key_obj.keys[0];
        
        if (!unlocked_pass || unlocked_pass.length == 0) {
            return;
        }
        
        var did_unlock = priv_key.decrypt(window.user_email+unlocked_pass);

        if (!did_unlock) {
            alert('Could not decrypt private key for message decryption.');
            return;
        }
        
        var pub_arr = [];
        
        _priv.removeHiddenModalEl();
        _priv.createHiddenModalEl();
        var new_hook = _priv.getHiddenModalEl();
        
        new_hook.avgrund({
                height: 500,
                holderClass: 'custom',
                showClose: true,
                enableStackAnimation: true,
                onBlurContainer: '#wrapper',
                onUnload: function(e) {
                    $("body").off("click", ".keys-pub-dc");
                },
                template: '<p>Choose the sender\'s public key, and paste the armored message.</p>' +
                '<div>' +
                'Sender Key: ' + _priv.publicKeyDropdown().html() +
                '<br style="clear:both">' +
                'Message: <textarea style="height:150px;" class="keys-pub-txt"></textarea>'+
                '<input type="button" value="Decrypt" class="submit keys-pub-dc">' +
                '</div>'
        });
        
        new_hook.trigger("click");
        
        $("body").on("click", ".keys-pub-dc", function(){
            var select_id = $(".pub-key-select option:selected").val();
            var pk_raw = _priv.getPubKeyById(select_id);
            var pub_key_obj = window.openpgp.key.readArmored(pk_raw);
            var pub_key = pub_key_obj.keys[0];
            pub_arr.push(pub_key);
            var msg_text = $(".keys-pub-txt").val();
            var msg_obj = window.openpgp.message.readArmored(msg_text);
            
            try {
                var real_msg = window.openpgp.decryptAndVerifyMessage(priv_key, pub_arr, msg_obj);
            } catch(e) {
                alert("Could not decrypt message. Perhaps you picked the wrong private key to use?");
                pub_arr = [];
                return;
            }
            
            if ("undefined" !== typeof real_msg.signatures && "undefined" !== typeof real_msg.signatures[0] && real_msg.signatures[0].valid == true) {
                $(".keys-pub-txt").val(real_msg.text);
            } else {
                alert("The message signature does not match the public key you supplied. Pick the correct sender key.");
            }
        });
        
        
    });
    
    user_page.on("click", ".enc-msg-btn", function() {
        var priv_str = $(this).siblings(".key-priv-raw").html();
        var priv_key_obj = window.openpgp.key.readArmored(priv_str);        
        var label = $(this).siblings(".keyLabel").html();
        var unlocked_pass = prompt("To use this private key you need to enter the password to decrypt it.\n\nIf you do not remember the password, this key cannot be used.\n\nUsing Key: '"+label+"'");
        var priv_key = priv_key_obj.keys[0];
        
        if (!unlocked_pass || unlocked_pass.length == 0) {
            return;
        }
        
        var did_unlock = priv_key.decrypt(window.user_email+unlocked_pass);

        if (!did_unlock) {
            alert('Could not decrypt private key for signing.');
            return;
        }
        
        var pub_arr = [];
        
        _priv.removeHiddenModalEl();
        _priv.createHiddenModalEl();
        var new_hook = _priv.getHiddenModalEl();
        
        new_hook.avgrund({
                height: 500,
                holderClass: 'custom',
                showClose: true,
                enableStackAnimation: true,
                onBlurContainer: '#wrapper',
                onUnload: function(e) {
                    $("body").off("click", ".keys-pub-enc");
                },
                template: '<p class="authorline" style="padding-top:0;">Choose the public key from your keys list. This is the only person who will be able to read your message. Then type your message and the text area will populate with a PGP armored message.</p>' +
                '<div>' +
                'Recipient Key: ' + _priv.publicKeyDropdown().html() +
                '<br style="clear:both">' +
                '<textarea style="height:150px;" class="keys-pub-txt"></textarea>'+
                '<input type="button" value="Encrypt and Sign" class="submit keys-pub-enc">' +
                '</div>'
        });
        
        new_hook.trigger("click");
        
        $("body").on("click", ".keys-pub-enc", function(){
            var select_id = $(".pub-key-select option:selected").val();
            var pk_raw = _priv.getPubKeyById(select_id);
            var pub_key_obj = window.openpgp.key.readArmored(pk_raw);
            var pub_key = pub_key_obj.keys[0];
            pub_arr.push(pub_key);
            var msg_text = $(".keys-pub-txt").val();
            var arm_msg = window.openpgp.signAndEncryptMessage(pub_arr, priv_key, msg_text);
            $(".keys-pub-txt").val(arm_msg);
        });
        
        
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
    
    _priv.accessCheck();

});