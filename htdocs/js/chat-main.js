$(function(){
    
    var key_size = 2048
    var key_splitter = "|**|";
    var valid_storage_change = false;
    var curr_active_cid;

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
                
                for (var i=0; i<contacts.length; i++) {
                    var contact = contacts[i];
                    $("<span>")
                        .addClass("btn-clear")
                        .addClass("contact-item")
                        .addClass("contact-approved")
                        .attr("data-uid", contact.contact_user.uid)
                        .attr("data-cid", contact.contact_data.cid)
                        .html(contact.contact_user.e)
                        .appendTo(list_html);
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
        _priv.loadUserContacts();
    };
    
    $(window).bind('storage', function (e) {
        if (e.originalEvent.newValue !== e.originalEvent.oldValue && !valid_storage_change) {
            alert('Oops! Internal data modified. You will need to re-enter your password.');
            window.localStorage.removeItem(window.user_email);
            window.location.reload();
        }
      
    });
    
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
    
    $(".contacts-list").on("click", ".contact-approved", function() {
        var $this = $(this);
        var cid = $this.attr("data-cid");
        if ("object" == typeof curr_active_cid) {
            curr_active_cid.removeClass("box-dark-open");
        }
        _priv.loadConversation(cid, function(_r){
            if (_r.err) {
                alert(_r.m);
                return;
            }
            curr_active_cid = $this;
            curr_active_cid.addClass("box-dark-open");
            var user = _r.conversation_data.user;
            $("#conversation-header").html("Conversation with "+user.user_email);
        });
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