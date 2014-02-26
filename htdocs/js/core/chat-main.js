/*!
 * chat-main.js
 * https://destruct.co
 *
 * Copyright 2014 Brenden Ellingboe (brenden@brenden.me)
 *
 */
var _Chat = (function($) {
    
    $(function(){
        
        if (!$("body").hasClass("chat-main")) {
            return;
        }
        
        var key_size = 2048
        var key_splitter = "|**|";
        var valid_storage_change = false;
        var curr_active_cid;
        var curr_cid;
        var curr_interval;
        var lazy_reload_ms = 10000;
    
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
            sendMessageToActiveChatSession: function(t, cb) {
                var pub_arr = [];
                
                var pub_key_contact = $("#curr_chat_pub_key").val();
                var cid = curr_active_cid.attr("data-cid");
                var aesKey = random_string(32);
    
                var pub_key_obj = window.openpgp.key.readArmored(pub_key_contact);
                var pub_key = pub_key_obj.keys[0];
                pub_arr.push(pub_key);
                
                var my_pub_key_obj = window.openpgp.key.readArmored(window.user_pubkey);
                var my_pub_key = my_pub_key_obj.keys[0];
                pub_arr.push(my_pub_key);
                
                var enc_key = window.openpgp.encryptMessage(pub_arr, aesKey);
                var enc_text = ciph(aesKey, t);
    
                
                $.post("/chat/ajax/convo.php?cid=" + cid, {t: enc_text, k: enc_key}, function(r) {
                    cb(r);
                }, "json");
    
            },
            loadConversation: function(c, cb) {
                $.getJSON("/chat/ajax/convo.php?cid=" + c, function(r) {
                    cb(r);
                });
            },
            rejectContactRequest: function(c, u, cb) {
                $.post("/chat/ajax/contacts.php", {uid: u, cid: c, action: "reject"}, function(r) {
                    cb(r);
                }, "json");
            },
            approveContactRequest: function(c, u, cb) {
                $.post("/chat/ajax/contacts.php", {uid: u, cid: c, action: "approve"}, function(r) {
                    cb(r);
                }, "json");
            },
            sendContactRequest:  function(id, cb) {
                $.post("/chat/ajax/contacts.php", {uid: id}, function(r) {
                    cb(r);
                }, "json");
            },
            searchForContacts: function(s, cb) {
                $.getJSON("/chat/ajax/search.php?s=" + s, function(r) {
                    var res = [];
                    if ("undefined" !== typeof r.users) {
                        var res = r.users;
                    }
                    cb(res);
                });
            },
            loadUserContacts: function() {
                $.getJSON("/chat/ajax/contacts.php", function(r) {
                    var list_html = $(".contact-list");
                    var req_html = $(".contact-requests");
                    var sent_html = $(".contact-sent");
                    
                    list_html.empty();
                    req_html.empty();
                    sent_html.empty();
                    
                    var contacts = r.contacts.list;
                    var sent = r.contacts.sent;
                    var req = r.contacts.requests;
                    
                    if (contacts.length == 0) {
                        $("<span>")
                            .addClass("contact-item")
                            .addClass("list-empty")
                            .html("No contacts.")
                            .appendTo(list_html);
                    }
                    
                    for (var i=0; i<contacts.length; i++) {
                        var contact = contacts[i];
                        var unread_msg = contact.contact_conversation.unread;
                        
                        var contact_obj = $("<span>")
                            .addClass("btn-clear")
                            .addClass("contact-item")
                            .addClass("contact-approved")
                            .attr("data-uid", contact.contact_user.uid)
                            .attr("data-cid", contact.contact_data.cid)
                            .html(contact.contact_user.e)
                            .appendTo(list_html);
                        
                        if (unread_msg > 0) {
                            $("<span>")
                                .addClass("unread-badge")
                                .html(unread_msg)
                                .appendTo(contact_obj);
                        }

                    }
                    
                    if (req.length == 0) {
                        $("<span>")
                            .addClass("contact-item")
                            .addClass("list-empty")
                            .html("No contact requests.")
                            .appendTo(req_html);
                    }
                    
                    for (var i=0; i<req.length; i++) {
                        var c_req = req[i];
                        var contact_item = $("<span>")
                            .addClass("btn-clear")
                            .addClass("contact-item")
                            .addClass("contact-request")
                            .attr("data-uid", c_req.contact_user.uid)
                            .attr("data-cid", c_req.contact_data.cid)
                            .html(c_req.contact_user.e)
                            .appendTo(req_html);
                            
                        var req_actions = $("<div>")
                            .addClass("hide")
                            .addClass("req-action")
                            .addClass("box-dark-open")
                            .attr("id", "request-"+c_req.contact_data.cid+"-action")
                            .appendTo(req_html);
                            
                        var req_ok = $("<span>")
                            .addClass("btn")
                            .addClass("btn-green")
                            .addClass("btn-small")
                            .addClass("req-approve")
                            .html("Approve")
                            .appendTo(req_actions);
                            
                        var req_reject = $("<span>")
                            .addClass("btn")
                            .addClass("btn-red")
                            .addClass("btn-small")
                            .addClass("req-reject")
                            .html("Reject")
                            .appendTo(req_actions);
                    }
                    
                    if (sent.length == 0) {
                        $("<span>")
                            .addClass("contact-item")
                            .addClass("list-empty")
                            .html("No sent requests.")
                            .appendTo(sent_html);
                    }
                    
                    for (var i=0; i<sent.length; i++) {
                        var c_sent = sent[i];
                        $("<span>")
                            .addClass("btn-clear")
                            .addClass("contact-item")
                            .addClass("contact-sent")
                            .attr("data-uid", c_sent.contact_user.uid)
                            .attr("data-cid", c_sent.contact_data.cid)
                            .html(c_sent.contact_user.e)
                            .appendTo(sent_html);
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
            generateKey: function(e, p, l, cb) {
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
                    console.log(err);
                }
                if (enc_key_str) {
                    $.post("/keys/ajax/regkey.php", {d: enc_key_str, l: l, pub: pub}, function(r) {
                        if (r.key_err == true) {
                            alert("Error saving keypair.");
                            $("#do_logout").simulate("click");
                        } else {
                            cb(e, p);
                        }
                    }, "json");
                }
                return;
            },
            loadUserKeypair: function() {
                $.getJSON("/keys/ajax/keys.php?chat", function(r) {
                    var keys = r.keys;
                    var kp = false;
                    var voluntary_logout = false;
                    
                    if ("undefined" == typeof keys) {
                        return false;
                    }
                    
                    for (var i=0; i<keys.length; i++) {
                        var key = keys[i];
                        kp = _priv.unlockKeypair(key.key_data);
                        
                        while (kp == false) {
                            window.user_pass = prompt("Enter your password to unlock your private key:");
                            kp = _priv.unlockKeypair(key.key_data);
    
                            if (!kp) {
                                var will_try_again = confirm("INCORRECT PASSWORD!\n\nWould you like to try again? If you choose not to, you will be logged out because we will not be able to secure your session.\n\nIf you have repeat problems with your password, you will need to create a new account but this email address will not be usable.");
                                if (!will_try_again) {
                                    kp = true;
                                    voluntary_logout = true;
                                }
                            }
                        }
                        
                        if (voluntary_logout) {
                            $("#do_logout").simulate("click");
                            return false;
                        }
                        
                        window.user_pubkey = kp[1];
                        window.user_privkey = kp[0];
                        
                        var privKey_aromor = window.openpgp.key.readArmored(window.user_privkey);
                        var priv_key = privKey_aromor.keys[0];
                        
                        window.user_privkey_unlock_pass = priv_key.decrypt(window.user_email+window.user_pass);
                        
                        if (window.user_privkey_unlock_pass) {
                            window.user_privkey_unlocked = priv_key;
                        }
                    }
                    
                    return true;
                });
            },
            unlockKeypair: function(data) {
                var ep = window.user_email+window.user_pass;
                var key_unlocked = _priv.dcKey(data, ep);
                
                return key_unlocked;
            },
            initUser: function (e, p) {
                window.user_pass = p;
                loadUserPage(e);
            },
            reloadConversation: function(cid, $this) {
                var conversation_stream = $(".conversation-output-stream");
                
                $(".conversation-output-stream").empty();
                $this.find(".unread-badge").remove();
                
                _priv.loadConversation(cid, function(_r){
                    if (_r.err) {
                        $(".needs-active-chat").hide();
                        alert(_r.m);
                        return;
                    }
                    $(".conversation-output").fadeIn();
                    
                    curr_cid = cid;
                    curr_active_cid = $this;
                    
                    curr_active_cid.addClass("box-dark-open");
                    curr_active_cid.addClass("active-chat");
                    var user = _r.conversation_data.user;
                    $("#conversation-header").html("Conversation with "+user.user_email);
                    window.localStorage.setItem("chat_"+window.user_email+"_"+cid, user.user_chat_public_key);
                    $("#curr_chat_pub_key").val(user.user_chat_public_key);
                    $(".needs-active-chat").show();
                    
                    var m = _r.messages;
                    
                    if (m.length > 0) {
                        m.reverse();
                    }
        
                    for(var i=0; i<m.length; i++) {
                        var msg = m[i];
                        var msg_obj = msg.data;
                        var msg_k_enc = msg_obj.k;
                        var msg_t_enc = msg_obj.t;
                        
                        var priv_key_obj = window.user_privkey_unlocked;
                        var msg_key_obj = window.openpgp.message.readArmored(msg_k_enc);
                        var dec_key = window.openpgp.decryptMessage(priv_key_obj, msg_key_obj);
                        var dec_msg_text = unciph(dec_key, msg_t_enc);
                        
                        dec_msg_text = "<p>"+dec_msg_text.replace("\n", "</p><p>")+"</p>";
                        
                        var email_display = "You";
                        var msg_class = "msg-me";
                        
                        if (msg.user_email !== window.user_email) {
                            email_display = msg.user_email;
                            msg_class = "msg-them";
                            if (msg.is_new) {
                                msg_class = "msg-new";
                            }
                        }
                        
                        var msg_date = "<span class='msg-ts'>"+msg.sent_ts.date+"</span>";
                        
                        email_display = "<span class='msg-name'>"+email_display+"</span>";
                        email_display = email_display+":"+msg_date;
                        
                        var new_msg = $("<div>")
                            .addClass("msg-text-entry")
                            .addClass(msg_class)
                            .html(email_display+"<br>"+dec_msg_text)
                            .appendTo(conversation_stream);
                        
                        conversation_stream.scrollTop(conversation_stream.prop('scrollHeight') + 999);
                    }
                    
                    _priv.stopRefreshInterval();
                    _priv.setOffRefreshInterval();
                    
                });
            },
            setOffRefreshInterval: function() {
                curr_interval = setInterval(function(){
                    _priv.reloadConversation(curr_cid, curr_active_cid);
                }, lazy_reload_ms);
            },
            stopRefreshInterval: function() {
                if ("undefined" !== typeof curr_interval) {
                    window.clearInterval(curr_interval);
                }
            }
        };
        
        var loadUserPage = function(em) {
            window.user_email = em;
            _priv.loadUserKeypair();
            $("#login_signup").remove();
            $(".needs-logged-in").fadeIn();
            $("body").toggleClass("landing");
            $(".user-info").html(window.user_email);
            _priv.loadUserContacts();
        };
        
        /*
         *
         * TODO: refactor storage listener.
         *
        $(window).bind('storage', function (e) {
            if (e.originalEvent.newValue !== e.originalEvent.oldValue && !valid_storage_change) {
                alert('Oops! Internal data modified. You will need to re-enter your password.');
                window.localStorage.removeItem(window.user_email);
                window.location.reload();
            }
        });
        */
        
        $(".contact-search-text").on("keyup", function() {
            var search_res_display = $(".contact-search-results");
            var search_text = $(this).val();
            search_res_display.removeClass("box-shape").html(" . . . ");
            
            if (search_text.length == 0) {
                search_res_display.removeClass("box-shape").html("");
                return;
            }
            
            var search_res = _priv.searchForContacts(search_text, function(_r){
                if (_r.length == 0) {
                    search_res_display.addClass("box-shape").html("No results.");
                    return;
                } else {
                    search_res_display.removeClass("box-shape").html("");
                    for (var i=0; i<_r.length; i++) {
                        var u = _r[i];
                        $("<span>").addClass("btn-clear").addClass("add-contact-action").attr("data-uid", u.id).html(u.e).appendTo(search_res_display);
                    }
                }
            });
        });
        
        $(".contacts-list").on("click", ".add-contact-action", function() {
            _priv.sendContactRequest($(this).attr("data-uid"), function(_r){
                $(".contact-search-close").click();
                if (_r.sent) {
                    _priv.loadUserContacts();
                }
                alert(_r.m);
            });
        });
        
        $(".contacts-list").on("click", ".contact-request", function() {
            $(this).toggleClass("box-dark-open");
            var cid = $(this).attr("data-cid");
            var req_action = $("#request-"+cid+"-action");
            req_action.toggle();
        });
        
        $(".contacts-list").on("click", ".req-approve", function() {
            var parentContainer = $(this).parent().siblings(".contact-item");
            var cid = parentContainer.attr("data-cid");
            var uid = parentContainer.attr("data-uid");
            
            _priv.approveContactRequest(cid, uid, function(_r){
                parentContainer.click();
                if (!_r.err) {
                    _priv.loadUserContacts();
                } else {
                    alert(_r.m);
                }
            });
        });
        
        $(".contacts-list").on("click", ".req-reject", function() {
            var parentContainer = $(this).parent().siblings(".contact-item");
            var cid = parentContainer.attr("data-cid");
            var uid = parentContainer.attr("data-uid");
            
            _priv.rejectContactRequest(cid, uid, function(_r){
                parentContainer.click();
                if (!_r.err) {
                    _priv.loadUserContacts();
                } else {
                    alert(_r.m);
                }
            });
        });
        
        $(".conversation-text-input").on("keydown", function(e){
            var msg = $(this).val();
            if (e.keyCode == 13 && !e.shiftKey) {
                e.preventDefault();
                _priv.sendMessageToActiveChatSession(msg, function(_r){
                    if (!_r.err) {
                        $(".conversation-text-input").val("");
                        _priv.stopRefreshInterval();
                        _priv.reloadConversation(curr_active_cid.attr("data-cid"), curr_active_cid);
                    } else {
                        alert(_r.m);
                    }
                });
                return false;
            }
            return true;
        });
        
        $(".contacts-list").on("click", ".contact-approved", function() {
            var $this = $(this);
            var cid = $this.attr("data-cid");
            var this_active = $this.hasClass("active-chat");
            
            _priv.stopRefreshInterval();
            
            $(".conversation-output").fadeOut();
            $(".welcome-screen").fadeOut();
            
            if ("object" == typeof curr_active_cid) {
                curr_active_cid.removeClass("box-dark-open").removeClass("active-chat");
                if (this_active) {
                    curr_active_cid = undefined;
                    curr_cid = undefined;
                    curr_interval = undefined;
                    $(".welcome-screen").fadeIn();
                    return;
                }
            }
            
            _priv.reloadConversation(cid, $this);
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
                    
                    if (R.is_new == true) {
                        _priv.generateKey(email, pass, "Chat", function(e, p){
                            _priv.initUser(e, p);
                        });
                    } else {
                        _priv.initUser(email, pass);
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
})(jQuery);