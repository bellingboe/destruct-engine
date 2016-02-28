var
    socket = io('https://cipher.tools:3232', {
        secure: true,
        'transports': ['websocket', 'xhr-polling']
    }),
    is_online = 0,
    DEBUG_MODE = false;
    is_msg_page = false;
    
$(function() {
    
    var chatEvent = function(u) {
	$('.app-open-conversation"[data-user="'+u+'"]').trigger("click")
	//loadMessageList();
    };

    $(".dotdotdot").on("click", function(e) {
        e.preventDefault();
        var o = active_id_object();
        alert("Your ID is: " + o.username);
    });

    var
        pin_index = 0,
        master_pin_string = "",
        master_pin_string2 = "",
        master_pin_entry = "";

    window.ACTIVE_CHAT = false;

    if (DEBUG_MODE) {
        $(".debug").show();
    } else {
        $(".debug").remove();
    }

    var htmlEncode = function(str) {
        return $('<div/>').text(str).html();
    }

    socket.on('verify-true', function(res) {
        var id_obj = active_id_object();
        var obj = res;
        var name = obj.name;
        var key = obj.key;
        window.localStorage.setItem(name + "_key", key);
        addMessage(name, null, id_obj.username);
        socket.emit("send-user-verify", {
            me: id_obj.username,
            user: name
        });
        $(".add-contact-txt").val("");
        openPage("#app_page", "left", "left");
    });

    socket.on('verify-false', function(res) {
        $(".add-contact-txt").css({
            border: "1px solid red"
        }).val("");
        alert("User ID not online.");
    });

    socket.on("added-by-user", function(who) {
        var name = who.name;
        addMessage(name, null, name);
        alert("ID: " + name + " added you as a contact.");
        window.localStorage.setItem(name + "_key", who.key);
    });

    socket.on("socket-test-msg", function(res) {
        var msg = res.msg
        alert(msg);
    });

    socket.on("get-pub", function(res) {
        window.localStorage.setItem(res.name + "_key", res.pub);
    });

    socket.on('disconnect', function() {});

    socket.on('rec-encrypted-message', function(p) {
	
	console.log("===== rec-encrypted-message =====");
	console.log(p);
	
	old_chat = window.ACTIVE_CHAT;
	
        var me = active_id_object();
        var aes_key = window.openpgp.message.readArmored(p.ek);
        var chat = null;

        if (window.ACTIVE_CHAT) {
            chat = window.ACTIVE_CHAT;
        } else {
            if (!getUserPublicKey(p.to[1])) {
                socket.emit("pub-get", {
                    user: p.to[1]
                });
            }

	    if (p.f == me.username) {
		chat = {
		    user: p.to[1],
		    key: getUserPublicKey(p.to[1])
		};
	    } else {
		chat = {
		    user: p.f,
		    key: getUserPublicKey(p.f)
		};
		    
	    }
        }
	
	console.log("(chat) obj ===== ");
	console.log(chat);
	
	var
	    pub_key_obj = window.openpgp.key.readArmored(chat.key),
	    pub_key = pub_key_obj.keys[0],
	    my_priv = me.unlocked_private_key,
	    my_pub_key_obj = window.openpgp.key.readArmored(me.key.pub),
	    my_pub_key = pub_key_obj.keys[0];
	
        var dec_msg_key = window.openpgp.decryptAndVerifyMessage(my_priv, [pub_key, my_pub_key], aes_key);

        if ("undefined" !== typeof dec_msg_key.signatures && "undefined" !== typeof dec_msg_key.signatures[0]) {
            if (dec_msg_key.signatures[0].hasOwnProperty("keyid")) {
                sig_key_hex = dec_msg_key.signatures[0].keyid.toHex();
            }
        }

        var dec_msg_text = unciph(dec_msg_key.text, p.et);
        var msg_text = dec_msg_text;

        if (p.f == me.username) {
            var from = "<strong>" + p.f + " (You)</strong>:<br>";
	    //chatEvent(p.to[1]);
        } else {
            var from = p.f + ":<br>";
	    //chatEvent(p.to[1]);
	    
	    dec_msg_text = "<div class='msg-item'>" + from + htmlEncode(dec_msg_text).replace("\n", "</div><div>") + "</div>";
	    var msg_item = $("<div>").attr("data-ts", p.ts).html(dec_msg_text);
	    var display = $(".app-messages-conversation-display").append(msg_item);
        }

        addMessage(chat.user, msg_text, p.f);

        $(".app-messages-conversation-display").scrollTop($(".app-messages-conversation-display").prop('scrollHeight') + 999);
    });

    $("#app_setup")
        .css({
            top: parseInt($(window).height() + 1, 10)
        });

    $("#app_setup2")
        .css({
            top: parseInt($(window).height() + 1, 10)
        });

    $("#app_login")
        .css({
            top: parseInt($(window).height() + 1, 10)
        });

    var logOut = function() {
        var storage_items = window.localStorage.length;
        for (var i = 0; i < storage_items; i++) {
            var storage_item_key = window.localStorage.key(storage_items[i]);
            window.localStorage.removeItem(storage_item_key);
        }
        location.reload();
    }; /* /logOut() */

    var getUserPublicKey = function(u) {
        window.localStorage.getItem(u + "_key");
    };

    var openPage = function(id, new_up_down, old_up_down, cb) {
        window.scrollTo(0, 0);

        var old = $(".page-open");
        var page = $(id);

        if (old) {
            switch (old_up_down) {
                case "up":
                    old.animate({
                        top: -parseInt($(window).height() + 1, 10)
                    }, {
                        complete: function() {
                            $(this).addClass("hiding").removeClass("page-open");
                        }
                    });
                    break;
                case "down":
                    old.animate({
                        top: parseInt($(window).height() + 1, 10)
                    }, {
                        complete: function() {
                            $(this).addClass("hiding").removeClass("page-open");
                        }
                    });
                    break;
                case "left":
                    old.animate({
                        top: 0,
                        left: -parseInt($(window).width(), 10)
                    }, {
                        complete: function() {
                            $(this).addClass("hiding").removeClass("page-open");
                        }
                    });
                    break;
                case "right":
                    old.animate({
                        top: 0,
                        left: parseInt($(window).width() * 2, 10)
                    }, {
                        complete: function() {
                            $(this).addClass("hiding").removeClass("page-open");
                        }
                    });
                    break;
            }
        }

        switch (new_up_down) {
            case "up":
                page
                    .css({
                        top: parseInt($(window).height() + 1, 10)
                    })
                    .removeClass("hiding")
                    .animate({
                        top: 0
                    }, {
                        complete: function() {
                            $(this).addClass("page-open");
                            if ("function" === typeof cb) {
                                cb();
                            }
                        }
                    });
                break;
            case "down":
                page
                    .css({
                        top: -parseInt($(window).height() + 1, 10)
                    })
                    .removeClass("hiding")
                    .animate({
                        top: 0
                    }, {
                        complete: function() {
                            $(this).addClass("page-open");
                            if ("function" === typeof cb) {
                                cb();
                            }
                        }
                    });
                break;
            case "left":
                page
                    .css({
                        top: 0,
                        left: parseInt($(window).width() * 2, 10)
                    })
                    .removeClass("hiding")
                    .animate({
                        top: 0,
                        left: 0
                    }, {
                        complete: function() {
                            $(this).addClass("page-open");
                            if ("function" === typeof cb) {
                                cb();
                            }
                        }
                    });
                break;
            case "right":
                page
                    .css({
                        top: 0,
                        left: -parseInt($(window).width(), 10)
                    })
                    .removeClass("hiding")
                    .animate({
                        top: 0,
                        left: 0
                    }, {
                        complete: function() {
                            $(this).addClass("page-open");
                            if ("function" === typeof cb) {
                                cb();
                            }
                        }
                    });
                break;
        }
    }; /* /openPage() */

    var setup_app_password = window.localStorage.getItem("ct_masterpass");

    var get_master_pin = function() {
        return window.localStorage.getItem("ct_masterpass");
    }; /* /get_mesater_pin() */

    var active_id_object = function() {
        var enc_ident = window.localStorage.getItem("ct_id_obj");
        if (!enc_ident) {
            return false;
        }
        var identity = unciph(get_master_pin(), enc_ident);
        var id_parsed = JSON.parse(identity);

        var privateKey = openpgp.key.readArmored(id_parsed.key.priv).keys[0];
        privateKey.decrypt(get_master_pin());
        id_parsed.unlocked_private_key = privateKey;

        return id_parsed;
    }; /* /active_id_object */

    window.active_id_object = active_id_object;

    var getLocalMessages = function() {
        return JSON.parse(window.localStorage.getItem("ct_msgs"));
    }; /* /getLocalMessages() */

    var placeIdentityIntoStorage = function(id) {
        window.localStorage.setItem("ct_id_obj", id);
    };

    var generateNewIdentity = function() {
        $(".app-id-action").attr("disabled", "disabled").val("Creating New Identity...");
        $(".id-name").removeClass("hiding").css({
            color: "grey"
        }).html("Creating identity, please wait... ");

        var new_id_str = random_string(5) + "-" + random_string(5);

        var identity = {
            username: new_id_str,
            pgp_email: new_id_str + " <anon-" + new_id_str + "@getciphertext.com>"
        };

        window.openpgp.initWorker('js/openpgp.worker.js');
        window.openpgp.generateKeyPair(1, 2048, identity.pgp_email, get_master_pin(), function(err, res) {
            if (err) {
                $(".id-name").removeClass("hiding").css({
                    color: "red"
                }).html("Error creating keypair: " + err);
                return false;
            }

            var new_key_pair = res;

            identity.key = {};
            identity.key.pub = new_key_pair.publicKeyArmored;
            identity.key.priv = new_key_pair.privateKeyArmored;
            identity.key.raw = new_key_pair.key;

            socket.emit('id-with-key', new_id_str, identity.key.pub);
            ident_enc = ciph(get_master_pin(), JSON.stringify(identity));
            placeIdentityIntoStorage(ident_enc);
            refreshIdStatus();

            return true;
        });
    }; /* /generateNewIdentity() */

    var addMessage = function(n, m, f) {
        var messages = getLocalMessages();
        var myId = active_id_object();

        if (!messages) {
            messages = {};
        }

        if ("string" == typeof f && n !== myId.username) {
            if (!messages[n]) {
                messages[n] = {};
                messages[n]["info"] = {
                    "created": new Date().getTime()
                }
                messages[n]["m"] = new Array();
            }

            if (m && m.length > 0) {
                var mo = {
                    ts: new Date().getTime(),
                    from: f == myId.username ? myId.username : f,
                    msg: m
                };

                messages[n]["m"].push(mo);
            }
        }

        window.localStorage.setItem("ct_msgs", JSON.stringify(messages));
    }; /* /addMessage */

    var loadMessageList = function() {
        var messages = getLocalMessages();
        $(".app-message-list").children().remove();
        if (!messages || messages.length == 0) {
            $(".app-message-list").append($("<li>").html("No messages."));
        } else {
            $(".app-message-list").children().remove();

            var users = Object.keys(messages);
            var i = 0;

            for (var m in messages) {
                var msg = messages[m];

                var cur_user = users[i];
                if (msg.hasOwnProperty("m")) {
                    if (msg["m"].length == 0) {
                        var has_msg = "Empty";
                    } else {
                        var has_msg = msg["m"].length + " msgs";
                    }
                }

                $(".app-message-list")
                    .append($("<li>")
                        .addClass("app-open-conversation")
                        .attr("data-user", cur_user)
                        .html("<strong>" + cur_user + "</strong> &mdash; " + has_msg));

                i++;
            }

        }
    };

    var refreshIdStatus = function() {
        myId = active_id_object();

        if (!myId) {
            $(".app-id-action").removeAttr("disabled").attr("data-has-id", "0").val("Create First Identity");
            $(".id-name").removeClass("hiding").html("Create an identity to get started.");
        } else {
            if (is_online == 0) {
                socket.emit('id-with-key', myId.username, myId.key.pub);
            }

            $(".app-id-action").removeAttr("disabled").attr("data-has-id", "1").val("New Identity");
            $(".id-name").removeClass("hiding").html("Your ID: " + myId.username);
            $(".id-display").html(myId.username);
            $(".app-messages").removeClass("hiding");
            $(".app-identity-data").removeClass("hiding");
            $(".app-add-contact").removeClass("hiding");

            $(".tutorial-message").addClass("hiding");

            $(".id-created-date").html(myId.unlocked_private_key.primaryKey.created);
            $(".id-public-key").html(myId.key.pub);
        }

        is_online = 1;
    };

    refreshIdStatus();

    $(".app-debug-selftest").on("click", function() {
        var name = active_id_object().username;
        socket.emit("socket-test", name);
    });

    $(".app-send-msg").on("click", function() {
        var me = active_id_object();
        var chat = window.ACTIVE_CHAT;

        var
            aesKey = random_string(32),
            pub_key_obj = window.openpgp.key.readArmored(chat.key),
            pub_key = pub_key_obj.keys[0],
            my_pub_key_obj = window.openpgp.key.readArmored(me.key.pub),
            my_pub_key = my_pub_key_obj.keys[0],
            my_priv = me.unlocked_private_key,
            enc_key,
            enc_text,
            txt = $(".send-msg-txt").val();

        window.openpgp.initWorker('js/openpgp.worker.js');
        window.openpgp.signAndEncryptMessage([pub_key, my_pub_key], my_priv, aesKey, function(err, res) {
            if (err) {
                alert("Encryption failed.");
                console.log(err);
                return false;
            }

            enc_key = res;
            enc_text = ciph(aesKey, txt);

            var msg_payload = {
                to: [me.username, window.ACTIVE_CHAT.user],
                ek: enc_key,
                et: enc_text,
                f: me.username,
                ts: new Date().getTime()
            };
	    
	    console.log("message paylod:")
	    console.log(msg_payload);
	    
            socket.emit("send-encrypted-message", msg_payload);

            $(".send-msg-txt").val('').focus();

            return true;
        });
    });

    $(".app-id-action").on("click", function() {
        var has_id = $(this).attr("data-has-id") == "0" ? false : true;
        if (has_id) {
            var confirm_new = confirm("Are you sure? This will remove all data related to this identity and immediately create a new one.");
            if (confirm_new) {
                try {
                    var storage_items = window.localStorage.length;
                    for (var i = 0; i < storage_items; i++) {
                        var storage_item_key = window.localStorage.key(storage_items[i]);
                        window.localStorage.removeItem(storage_item_key);
                    }

                } catch (e) {
                    console.log(e);
                }
                generateNewIdentity();
            }
        } else {
            generateNewIdentity();
        }
    });

    setTimeout(function() {
        $("#app_intro_load").fadeOut({
            duration: 1000,
            queue: false
        });

        if (!setup_app_password) {
            pin_index = 0;
            $("#app_setup")
                .css({
                    display: "block"
                })
                .delay(500)
                .animate({
                    top: 0
                });
        } else {
            pin_index = 0;
            $("#app_login")
                .css({
                    display: "block"
                })
                .delay(500)
                .animate({
                    top: 0
                });
        }
    }, 2000);

    $(".app-save-contact").on("click", function() {
        var name_to_check = $(".add-contact-txt").val();
        var id_obj = active_id_object();

        if (name_to_check == id_obj.username) {
            alert("Cannot add yourself.");
            return false;
        }

        socket.emit("verify-name", name_to_check);
        return true;
    });

    $(".app-clear-pin-1").on("click", function() {
        openPage("#app_confirm_erase", "left", "left");
    });

    $(".app-add-contact").on("click", function() {
        openPage("#app_add_contact", "right", "right", function() {
            $(".add-contact-txt").focus();
        });
    });

    $(".app-close-add-contact").on("click", function() {
        openPage("#app_page", "left", "left");
    });

    $(".app-clear-pin").on("click", function() {
        logOut();
    });

    $(".app-exit").on("click", function() {
        location.reload();
    });

    $(".app-help").on("click", function() {
        openPage("#app_help", "up", "up");
    });

    $(".app-messages").on("click", function() {
        loadMessageList();
        openPage("#app_messages", "left", "left");
    });

    $(".app-close-help").on("click", function() {
        openPage("#app_page", "down", "down");
    });

    $(".app-close-messages").on("click", function() {
        openPage("#app_page", "right", "right");
    });

    $(".app-close-id-data").on("click", function() {
        openPage("#app_page", "right", "right");
    });

    $(".app-identity-data").on("click", function() {
        refreshIdStatus();
        openPage("#app_id_data", "left", "left");
    });

    $(".app-close-erase").on("click", function() {
        refreshIdStatus();
        openPage("#app_id_data", "right", "right");
    });

    $(".app-close-conversation").on("click", function() {
        loadMessageList();
        openPage("#app_messages", "right", "right");
        window.ACTIVE_CHAT = false;
	is_msg_page = false;
    });

    $(".app-message-list").on("click", ".app-open-conversation", function() {
        var user = $(this).attr("data-user");
        $(".app-messages-conversation-display").html("");

	if (is_msg_page == false) {
	    loadMessageList();
	    var messages = JSON.parse(window.localStorage.getItem("ct_msgs"));
	    openPage("#app_conversation_view", "left", "left", function() {
		is_msg_page = true;
		var me = active_id_object();
    
		$("#app_conversation_view > p").html(user);
    
		var active_obj = {
		    user: user,
		    key: window.localStorage.getItem(user + "_key")
		};
    
		window.ACTIVE_CHAT = active_obj;
    
		var user_m = messages[user];
		var msg = user_m.m;
    
		for (var i = 0; i < msg.length; i++) {
		    var m = msg[i];
    
		    if (m.from == me.username) {
			var from = "<strong>" + m.from + " (You)</strong>:<br>";
		    } else {
			var from = m.from + ":<br>"
		    }
    
		    msg_text = m.msg;
    
		    msg_text = "<div class='msg-item'>" + from + htmlEncode(msg_text).replace("\n", "</div><div>") + "</div>";
		    var msg_item = $("<div>").attr("data-ts", m.ts).html(msg_text).appendTo($(".app-messages-conversation-display"));
		    $(".app-messages-conversation-display").scrollTop($(".app-messages-conversation-display").prop('scrollHeight') + 999);
		}
	    });
	}
    });

    $("#login_masterpass_form input[type=button]")
        .on("click", function() {
            var which_pin = pin_index;
            if ($(this).hasClass("pin-back")) {
                $("#login_masterpass_form input[data-idx=" + (which_pin - 1) + "]").val('');
                if (which_pin > 0) {
                    pin_index = which_pin - 1;
                }
            } else {
                var btn_val = $(this).val();
                $("#login_masterpass_form input[data-idx=" + which_pin + "]").val(btn_val);
                if (which_pin < 3) {
                    pin_index = which_pin + 1;
                } else {
                    $("#login_masterpass_form .pin-display").each(function() {
                        master_pin_entry = "" + master_pin_entry + "" + $(this).val();
                    });

                    if (master_pin_entry === setup_app_password) {
                        $("#app_page").css({
                            top: -parseInt($(window).height() + 1, 10)
                        }).removeClass("hiding").animate({
                            top: 0
                        }).addClass("page-open");
                        $("#app_login")
                            .animate({
                                top: parseInt($(window).height() + 1, 10)
                            }, {
                                complete: function() {
                                    $(this).hide();
                                }
                            });
                    } else {
                        alert("Incorrect PIN. Try again.");
                        $(".pin-display").val("");
                        pin_index = 0;
                        master_pin_entry = "";
                    }
                }
            }
        });

    $("#new_masterpass_form input[type=button]")
        .on("click", function() {
            var which_pin = pin_index;
            if ($(this).hasClass("pin-back")) {
                $("#new_masterpass_form input[data-idx=" + (which_pin - 1) + "]").val('');
                if (which_pin > 0) {
                    pin_index = which_pin - 1;
                }
            } else {
                var btn_val = $(this).val();
                $("#new_masterpass_form input[data-idx=" + which_pin + "]").val(btn_val);
                if (which_pin < 3) {
                    pin_index = which_pin + 1;
                } else {
                    pin_index = 0;
                    $("#new_masterpass_form .pin-display").each(function() {
                        master_pin_string = "" + master_pin_string + "" + $(this).val();
                    });
                    $("#app_setup")
                        .hide()
                        .css({
                            top: parseInt($(window).height() + 1, 10)
                        });
                    $("#app_setup2")
                        .css({
                            display: "block"
                        })
                        .animate({
                            top: 0
                        });
                }
            }
        });

    $("#new_masterpass_form2 input[type=button]")
        .on("click", function() {
            var which_pin = pin_index;
            if ($(this).hasClass("pin-back")) {
                $("#new_masterpass_form2  input[data-idx=" + (which_pin - 1) + "]").val('');
                if (which_pin > 0) {
                    pin_index = which_pin - 1;
                }
            } else {
                var btn_val = $(this).val();
                $("#new_masterpass_form2  input[data-idx=" + which_pin + "]").val(btn_val);
                if (which_pin < 3) {
                    pin_index = which_pin + 1;
                } else {
                    $("#new_masterpass_form2 .pin-display").each(function() {
                        master_pin_string2 = "" + master_pin_string2 + "" + $(this).val();
                    });

                    if (master_pin_string === master_pin_string2) {
                        window.localStorage.setItem("ct_masterpass", master_pin_string2);
                        $("#app_page").css({
                            top: -parseInt($(window).height() + 1, 10)
                        }).removeClass("hiding").animate({
                            top: 0
                        }).addClass("page-open");
                        $("#app_setup2")
                            .animate({
                                top: parseInt($(window).height() + 1, 10)
                            }, {
                                complete: function() {
                                    $("#app_setup2").hide();
                                }
                            });
                    } else {
                        alert("PINs don't match. Try again.");
                        $(".pin-display").val("");
                        pin_index = 0;
                        master_pin_string = "";
                        master_pin_string2 = "";
                        $("#app_setup2")
                            .hide()
                            .css({
                                top: parseInt($(window).height() + 1, 10)
                            });
                        $("#app_setup")
                            .css({
                                display: "block"
                            })
                            .animate({
                                top: 0
                            });
                    }
                }
            }
        });

    $("#new_masterpass_form")
        .on("submit", function() {
            return false;
        });

    $("#login_masterpass_form")
        .on("submit", function() {
            return false;
        });
});