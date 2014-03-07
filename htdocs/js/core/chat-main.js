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
        
        var sheet_overlay = $(".sheet-overlay");
        var sheet_msg = $(".sheet-msg-box");
        
        /*
         * UP-CRYPT LIBRARY
         */
        
        var _UpCrypt = {

            xhr: null,
            aes_key: null,
            
            aesKey: function() {
                return this.aes_key;
            },
            
            setAesKey: function(k) {
                this.aes_key = k;
            },
            
            init: function() {
                $("#up-file-status").html("");
                $("#up-file-files").val("");
                this.setXhr();
            },
            
            tearDown: function() {
               
            },
            
            uint8ToString: function (buf) {
                var i, length, out = '';
                for (i = 0, length = buf.length; i < length; i += 1) {
                    out += String.fromCharCode(buf[i]);
                }
                return out;
            },
                        
            Base64Crypt: function (b64string, key) {
                var bytes = Crypto.util.base64ToBytes(b64string);
                var crypt = Crypto.AES.encrypt(Crypto.charenc.Binary.bytesToString(bytes), key);
                return crypt;
            },
            
            Base64Decrypt: function (b64string, key) {
                var decrypt = Crypto.AES.decrypt(b64string, key);
                return Crypto.util.bytesToBase64(Crypto.charenc.Binary.stringToBytes(decrypt));
            },
            
            PackData: function (boundary, data, filename, varname) {
                var datapack = '';
                datapack += '--' + boundary + '\r\n';
                datapack += 'Content-Disposition: form-data; ';
                datapack += 'name="' + varname + '"; filename="' + filename + '"\r\n';
                datapack += 'Content-Type: application/octet-stream\r\n\r\n';
                datapack += data;
                datapack += '\r\n';
                datapack += '--' + boundary + '--';
                return datapack;
            },
            
            uploadData: function (url, datapack, boundary) {
                var xhr = new XMLHttpRequest();
                /*
                xhr.onreadystatechange = function() {
                    if(this.readyState == 4)
                       alert("error in upload!");
                }
                */
                xhr.open('POST', url);
                xhr.setRequestHeader('Content-Type', 'multipart/form-data; boundary=' + boundary);
                xhr.send(datapack);
            },
            
            getBlob: function (url, callback) {
              var xhr = new XMLHttpRequest();  // Create new XHR object
              xhr.open("GET", url);            // Specify URL to fetch
              xhr.responseType = "blob"        // We'd like a Blob, please
              xhr.onload = function() {        // onload is easier than onreadystatechange
                  callback(xhr.response);      // Pass the blob to our callback
              }                                // Note .response, not .responseText
              xhr.send(null);                  // Send the request now
            },
            
            processBlob: function blobTest(f,n,c) {
                this.getBlob(f, function(d){
                  $("a")
                    .attr("href",URL.createObjectURL(d))
                    .attr("download", n)
                    .html("Download " + n + "now")
                    .appendTo( c );
                });
                return true;
            },
            
            blobToUrl: function(d, t, i){
                var file_dl_btn = $("<a>")
                    .attr("href", URL.createObjectURL(d))
                    .attr("id", i)
                    .attr("download", t)
                    .html(t)
                    
                file_dl_btn.addClass("btn").addClass("btn-small").addClass("btn-purple").addClass("btn-action");
                    
                return file_dl_btn.prop("outerHTML");
            },
            
            b64toBlob: function(b64Data, contentType, sliceSize) {
                contentType = contentType || '';
                sliceSize = sliceSize || 512;
            
                var byteCharacters = atob(b64Data);
                var byteArrays = [];
            
                for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
                    var slice = byteCharacters.slice(offset, offset + sliceSize);
            
                    var byteNumbers = new Array(slice.length);
                    for (var i = 0; i < slice.length; i++) {
                        byteNumbers[i] = slice.charCodeAt(i);
                    }
            
                    var byteArray = new Uint8Array(byteNumbers);
            
                    byteArrays.push(byteArray);
                }
            
                var blob = new Blob(byteArrays, {type: contentType});
                return blob;
            },
                        
            pullData: function (file, outelement, key) {
                this.xhr.onreadystatechange = function() {
                console.log("pulling!");
                    if(xhr.readyState == 4){
                        var outdata = xhr.responseText;
                        var decrypted = "data:application/octet-stream;base64,";
                        console.log(outdata);
                        try {
                                console.log(outelement.href);
                                if(!outelement.href.match("base64")) {
                                        decrypted += _UpCrypt.Base64Decrypt(outdata, key);
                                        console.log(decrypted);
                                        outelement.href = decrypted;
                                        outelement.className = "downloaded";
                                }
                        }
                        catch(err) {
                                alert("wrong key!");
                        }
                        };
                };
                this.xhr.open('GET', "uploads/"+file, true);
                this.xhr.send();
                return false;
            },
            
            setFileNameDisplay: function (s) {
                var str = "";
                if (s.length > 0) {
                    str = "File Attached: <strong style='font-size: 11pt;'>" + s + "</strong>";
                }
                $("#up-file-status").html(str);
            },
            
            upload: function (event) {
                if ( event.preventDefault ) {
                    event.preventDefault();
                }
                
                event.returnValue = false;
                
                var reader = new FileReader()
                , aes_key = this.aesKey()
                , files = document.getElementById('up-file-files').files
                , key = aes_key
                , filename = document.getElementById('up-file-files').value
                ;
                
                if(!key) {
                  alert("key not set!");
                  return false;
                }
                
                if(!files[0]) {
                  alert("no file selected!")
                  return false;
                }
                
                reader.onload = function() {
                  
                    var b64str = reader.result.split(",")[1];
                    $("#up-file-status").html("encrypting file ...");
                    var crypt = _UpCrypt.Base64Crypt(b64str, key);
                    $("#up-file-status").html("uploading ...");

                    /*
                    var boundary = "-----------------"+Math.floor(Math.random()*32768)+Math.floor(Math.random()*32768);
                    var datapack = _UpCrypt.PackData(boundary, crypt, filename, "fileupload");
                    try {
                        _UpCrypt.uploadData("/chat/upload.php", datapack, boundary);
                        $("#up-file-status").html("uploaded successfully!");
                    }
                    catch(er) {
                        $("#up-file-status").html("error uploading!");
                    }
                    */
                };
                
                reader.readAsDataURL(files[0]);
                return false;
            },
            
            setXhr: function () {
                this.xhr = new XMLHttpRequest();
            },
            
            fileList: function(){
                var upload_obj = this;
                this.xhr.onreadystatechange = function() {
                    if(this.xhr.readyState == 4){
                      var files = xhr.responseText;
                      var filelist = "<ul>";
                      files = files.split(";");
                      
                      for(var i in files) {
                        if(files[i].length > 1){
                          filelist += '<li><a href="#" class="fileel" id="' + files[i] + '">'+files[i]+'</a></li>';
                        }
                      }
                      filelist += "</ul>";
                      document.getElementById("stored").innerHTML = filelist;
                    var links = document.getElementsByTagName("a");
                    for (var i in links) {
                      if(links[i].className == "fileel") {
                            links[i].addEventListener('click', function(e){
                                _UpCrypt.pullData(e.target.id, e.target, upload_obj.aesKey())
                            }, false);
                        }
                      }
                    }
                };
                  
                //xhr.open('GET', "upload.php?getfilelist", true);
                //xhr.send();
                //console.log(xhr.responseText); 
            }
        };

        var enc_wait_text = "Generating Encryption Key...<br><br>Please do not close your browser window.",
            search_res_display = $(".contact-search-results"),
            login_page = $("#login_signup"),
            user_form = $("#user_form"),
            conversation_stream = $(".conversation-output-stream"),
            list_html = $(".contact-list"),
            req_html = $(".contact-requests"),
            sent_html = $(".contact-sent"),
            body = $("body"),
            
            file_send_event = null,
            file_send = 0,
            
            key_size = 2048,
            key_splitter = "|**|",
            valid_storage_change = false,
            curr_active_cid,
            curr_cid,
            curr_interval,
            lazy_reload_ms = 30000,
            last_msg_id = 0,
            
            _priv = {
                htmlEncode: function(str){
                  return $('<div/>').text(str).html();
                },
                displayMessage: function(t) {
                    sheet_overlay.fadeIn();
                    sheet_msg.html(t).fadeIn();
                },
                blinkErrWithDelay: function(t, d) {
                    sheet_msg.fadeOut(400, function(){
                        sheet_msg.html(t).addClass("btn-red").fadeIn(400, function(){
                            $(this).delay(d).fadeOut(400, function(){
                                $(this).hide();
                            });
                            sheet_overlay.delay(d).fadeOut(400, function(){
                                $(this).hide();
                            });
                        });
                    });
                },
                hideMessage: function() {
                    sheet_overlay.fadeOut();
                    sheet_msg.fadeOut(400, function(){
                        $(this).html("");
                    });
                },
                isValidAddr: function(e) {
                    var email_match = e.match(/^[+a-zA-Z0-9_.-]+@([a-zA-Z0-9-]+\.)+[a-zA-Z0-9]{2,6}$/);
                    if (email_match == null) {
                        return false;
                    }
                    if ("string" == typeof email_match[0]) {
                        return true;
                    }
                    return false;
                },
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
                            login_page.show();
                        }
                    });
                },
                hasActiveChat: function() {
                    return ( ("undefined" !== typeof curr_active_cid) && ("undefined" !== typeof curr_cid) && ("undefined" !== typeof curr_interval) )
                },
                sendMessageToActiveChatSession: function(t, is_file, cb) {
                    if (!_priv.hasActiveChat()) {
                        alert("No active chat session.");
                        return;
                    }
                    
                    var pub_key_contact = $("#curr_chat_pub_key").val(),
                        cid = curr_active_cid.attr("data-cid"),
                        aesKey = random_string(32),
                        pub_key_obj = window.openpgp.key.readArmored(pub_key_contact),
                        pub_key = pub_key_obj.keys[0],
                        my_pub_key_obj = window.openpgp.key.readArmored(window.user_pubkey),
                        my_pub_key = my_pub_key_obj.keys[0],
                        txt = t,
                        enc_key,
                        enc_text;
                    
                    window.openpgp.initWorker('/openpgp.worker.js');
                    
                    window.openpgp.signAndEncryptMessage([pub_key, my_pub_key], window.user_privkey_unlocked, aesKey, function(err, res){
                        if (err) {
                            alert("Encryption failed.");
                            console.log(err);
                            return false;
                        }
                        
                        enc_key = res;
                        enc_text = ciph(aesKey, txt);
                        
                        if (is_file) {
                            
                            console.log("is file...");
                            
                            var reader = new FileReader()
                            , files = document.getElementById('up-file-files').files
                            , filename = document.getElementById('up-file-files').value
                            , file_binary = {}
                            ;

                            if(!files[0]) {
                                alert("no file selected!")
                                return false;
                            }
                            
                            reader.onloadend = function() {
                                console.log("reader.onloadend...");
                               // var b64str = reader.result.split(",")[1];
                               
                               console.log(reader);
                               console.log(reader.result);
                               
                               //var b64str = Crypto.charenc.Binary.bytesToString(reader.result);
                               
                               var b64str = Crypto.util.bytesToBase64(reader.result);
                               
                               console.log("b64str");
                               console.log(b64str);
                                
                                $("#up-file-status").html("encrypting file ...");
                                
                                var crypt = _UpCrypt.Base64Crypt(b64str, aesKey);
                                $("#up-file-status").html("uploading ...");
                                
                                var content_type = $('input[type="file"]').prop('files')[0].type;
                                
                                file_binary = {d: crypt, c: content_type, n: filename.replace("C:\\fakepath\\", "")};
                                
                                $.post("/chat/ajax/convo.php?cid=" + cid, {is_file: 1, fb: file_binary, t: enc_text, k: enc_key}, function(r) {
                                    cb(r);
                                }, "json");
                                
                            };
                            
                            console.log("readAsArrayBuffer...");
                            //reader.readAsDataURL(files[0]);
                            reader.readAsBinaryString(files[0])
                        } else {
                            
                            $.post("/chat/ajax/convo.php?cid=" + cid, {is_file: 0, t: enc_text, k: enc_key}, function(r) {
                                cb(r);
                            }, "json");
                            
                        }
                        
                        return true;
                    });
                },
                loadConversation: function(c, load_new, cb) {
                    var last_id_str = "";
                    if (!load_new) {
                        last_id_str = "&since="+last_msg_id;
                    }
                    $.getJSON("/chat/ajax/convo.php?cid="+c+last_id_str, function(r) {
                        cb(r);
                    });
                },
                rejectContactRequest: function(c, u, cb) {
                    $.post("/chat/ajax/contacts.php", {uid: u, cid: c, action: "reject"}, function(r) {
                        cb(r);
                    }, "json");
                },
                removeContact: function(c, cb) {
                    $.post("/chat/ajax/contacts.php", {cid: c, action: "remove"}, function(r) {
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
                        
                        list_html.empty();
                        req_html.empty();
                        sent_html.empty();
                        
                        var contacts = r.contacts.list,
                            sent = r.contacts.sent,
                            req = r.contacts.requests,
                            contact,
                            unread_msg,
                            contact_obj,
                            c_req,
                            contact_item,
                            sent_item;
                        
                        if (contacts.length == 0) {
                            $("<span>")
                                .addClass("contact-item")
                                .addClass("list-empty")
                                .html("No contacts.")
                                .appendTo(list_html);
                        }
                        
                        for (var i=0; i<contacts.length; i++) {
                            contact = contacts[i];
                            unread_msg = contact.contact_conversation.unread;
                            
                            contact_obj = $("<span>")
                                .addClass("btn-clear")
                                .addClass("contact-item")
                                .addClass("contact-approved")
                                .attr("data-cid", contact.contact_data.cid)
                                .html(contact.contact_user.e)
                                .appendTo(list_html);
                                
                            var contact_actions = $("<div>")
                                .addClass("hide")
                                .addClass("contact-action")
                                .attr("id", "remove-"+contact.contact_data.cid+"-action")
                                .appendTo(list_html);
                                
                            var contact_rem_confirm = $("<span>")
                                .addClass("btn")
                                .addClass("btn-green")
                                .addClass("btn-small")
                                .addClass("contact-remove-confirm")
                                .attr("data-cid", contact.contact_data.cid)
                                .html("Remove Contact")
                                .appendTo(contact_actions);
                                
                            var contact_rem_cancel = $("<span>")
                                .addClass("btn")
                                .addClass("btn-transparent")
                                .addClass("btn-small")
                                .addClass("contact-remove-cancel")
                                .attr("data-cid", contact.contact_data.cid)
                                .html("Cancel")
                                .appendTo(contact_actions);
                                
                            $("<span>")
                                .addClass("contact-remove")
                                .attr("id", "remove_" + contact.contact_data.cid)
                                .html("X")
                                .appendTo(contact_obj);
                            
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
                            c_req = req[i];
                            contact_item = $("<span>")
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
                            sent_item = $("<span>")
                                .addClass("btn-clear")
                                .addClass("contact-item")
                                .addClass("contact-sent")
                                .attr("data-cid", c_sent.contact_data.cid)
                                .html(c_sent.contact_user.e)
                                .appendTo(sent_html);
                                
                            $("<span>")
                                .addClass("contact-remove")
                                .addClass("contact-remove-confirm")
                                .attr("id", "remove_" + c_sent.contact_data.cid)
                                .attr("data-cid", c_sent.contact_data.cid)
                                .html("X")
                                .appendTo(sent_item);
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
                    
                    _priv.displayMessage(enc_wait_text);
                    
                    window.openpgp.initWorker('/openpgp.worker.js');
                    window.openpgp.generateKeyPair(1, key_size, l+" <"+e+">", e+p, function(err, res){
                        if (err) {
                            _priv.blinkErrWithDelay("Error creating key.", 2500);
                            console.log(err);
                            return false;
                        }
                        
                        var
                            new_key_pair = res
                            , priv = new_key_pair.privateKeyArmored
                            , pub = new_key_pair.publicKeyArmored
                            , raw_key = JSON.stringify(new_key_pair.key)
                            , key_arr = [priv, pub, raw_key]
                            , keys_joined = key_arr.join(key_splitter)
                            , enc_key_str;
                        
                        try {
                            enc_key_str = ciph(e+p, keys_joined);
                        } catch(_e) {
                            console.log(_e);
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
                        
                        return true;
                    });
                    
                    return;
                },
                loadUserKeypair: function() {
                    $.getJSON("/keys/ajax/keys.php?chat", function(r) {
                        var keys = r.keys,
                            kp = false,
                            voluntary_logout = false,
                            will_try_again,
                            key,
                            privKey_aromor,
                            priv_key;
                        
                        if ("undefined" == typeof keys) {
                            return false;
                        }
                        
                        for (var i=0; i<keys.length; i++) {
                            key = keys[i];
                            kp = _priv.unlockKeypair(key.key_data);
                            
                            while (kp == false) {
                                window.user_pass = prompt("Enter your password to unlock your private key:");
                                kp = _priv.unlockKeypair(key.key_data);
        
                                if (!kp) {
                                    will_try_again = confirm("INCORRECT PASSWORD!\n\nWould you like to try again? If you choose not to, you will be logged out because we will not be able to secure your session.\n\nIf you have repeat problems with your password, you will need to create a new account but this email address will not be usable.");
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
                            
                            privKey_aromor = window.openpgp.key.readArmored(window.user_privkey);
                            priv_key = privKey_aromor.keys[0];
                            
                            window.user_privkey_unlock_pass = priv_key.decrypt(window.user_email+window.user_pass);
                            
                            if (window.user_privkey_unlock_pass) {
                                window.user_privkey_unlocked = priv_key;
                            }
                        }
                        
                        return true;
                    });
                },
                unlockKeypair: function(data) {
                    var ep = window.user_email+window.user_pass,
                        key_unlocked = _priv.dcKey(data, ep);
                    
                    return key_unlocked;
                },
                initUser: function (e, p) {
                    window.user_pass = p;
                    loadUserPage(e);
                },
                reloadConversation: function(cid, $this, start_new) {
                    if (start_new) {
                        $(".conversation-output-stream").empty();
                    }
                    
                    $this.find(".unread-badge").remove();
                    
                    $(".conversation-output").show();
                    $(".welcome-screen").hide();
                    
                    _priv.loadConversation(cid, start_new, function(_r){
                        if (_r.err) {
                            $(".needs-active-chat").hide();
                            alert(_r.m);
                            return;
                        }
                        
                        var
                            user = _r.conversation_data.user
                            , m = _r.messages;
                        
                        if (start_new) {
                            $(".conversation-output").show();
                            
                            _UpCrypt.init();
                            
                            curr_cid = cid;
                            curr_active_cid = $this;
                            curr_active_cid.addClass("box-dark-open");
                            curr_active_cid.addClass("active-chat");
                            
                            $("#conversation-header").html("Conversation with "+user.user_email);
                            window.localStorage.setItem("chat_"+window.user_email+"_"+cid, user.user_chat_public_key);
                            
                            $("#curr_chat_pub_key").val(user.user_chat_public_key);
                            $(".needs-active-chat").show();
                        }
                        
                        if (m.length > 0) {
                            m.reverse();
                        }
                        
                        var other_pub_txt = window.localStorage.getItem("chat_"+window.user_email+"_"+cid),
                            other_pub_obj = window.openpgp.key.readArmored(other_pub_txt),
                            pub_key_obj = window.openpgp.key.readArmored(window.user_pubkey),
                            priv_key_obj = window.user_privkey_unlocked;
                        
                        for(var i=0; i<m.length; i++) {
                            var
                                msg = m[i]
                                , msg_obj = msg.data
                                , msg_k_enc = msg_obj.k
                                , msg_t_enc = msg_obj.t
                                , msg_id = msg.id
                                , msg_key_obj = window.openpgp.message.readArmored(msg_k_enc)
                                , pub_arr = [pub_key_obj.keys[0], other_pub_obj.keys[0]]
                                , dec_msg_key
                                , dec_msg_text
                                , email_display = "You"
                                , msg_class = "msg-me"
                                , msg_date
                                , new_msg
                                , dl_link = ""
                                , sig_key_hex
                                , file_msg = "";
                                
                            dec_msg_key = window.openpgp.decryptAndVerifyMessage(priv_key_obj, pub_arr, msg_key_obj);
                            
                            if ("undefined" !== typeof dec_msg_key.signatures && "undefined" !== typeof dec_msg_key.signatures[0]) {
                                if (dec_msg_key.signatures[0].hasOwnProperty("keyid")) {
                                    sig_key_hex = dec_msg_key.signatures[0].keyid.toHex();
                                }
                            }
                            
                            if (msg.is_file) {
                                var filename = msg.f.n;
                                var filedata = msg.f.d;
                                var filetype = msg.f.c;
                                
                                var dec_file_data = _UpCrypt.Base64Decrypt(filedata, dec_msg_key.text);
                                var b64_to_blob = _UpCrypt.b64toBlob(dec_file_data, filetype);
                                var blob_btn = _UpCrypt.blobToUrl(b64_to_blob, filename, "msg_file_" + msg_id);
                                                                
                                file_msg = "<br><span class='chat-file-dl'>&mdash; File Attached: " + blob_btn + "</span>";
                            }
                            
                            dec_msg_text = unciph(dec_msg_key.text, msg_t_enc);
                            dec_msg_text = "<p>" + _priv.htmlEncode(dec_msg_text).replace("\n", "</p><p>") + file_msg + "</p>";
                                
                            if (msg_id > last_msg_id) {
                                last_msg_id = msg_id;
                            }
                            
                            if (msg.user_email !== window.user_email) {
                                email_display = msg.user_email;
                                msg_class = "msg-them";
                                if (msg.is_new) {
                                    msg_class = "msg-new";
                                }
                            }
                            
                            dl_link = "<span style='display:none;'> - <a target='_blank' href='/chat/dl.php?m="+msg_id+"&k="+dec_msg_key.text+"'>View</a></span>";
                            
                            msg_date = "<span class='msg-ts'>"+msg.sent_ts.date+dl_link+"</span>";
                            
                            email_display = "<span class='msg-name'>"+email_display+"</span>";
                            email_display = email_display+msg_date;
                            
                            new_msg = $("<div>")
                                .addClass("msg-text-entry")
                                .addClass("hide")
                                .addClass(msg_class)
                                .attr("data-m-id", msg_id)
                                .attr("data-signing-keyid", sig_key_hex)
                                .html(email_display+"<br>"+dec_msg_text)
                                .appendTo(conversation_stream);
                                
                            if (!start_new) {
                                new_msg.fadeIn();
                            } else {
                                new_msg.show();
                            }                        
                            conversation_stream.scrollTop(conversation_stream.prop('scrollHeight'));
                        }
                        
                        _priv.stopRefreshInterval();
                        _priv.setOffRefreshInterval();
                    });
                },
                setOffRefreshInterval: function() {
                    curr_interval = setInterval(function(){
                        _priv.reloadConversation(curr_cid, curr_active_cid, false);
                    }, lazy_reload_ms);
                },
                stopRefreshInterval: function() {
                    if ("undefined" !== typeof curr_interval) {
                        window.clearInterval(curr_interval);
                    }
                    _UpCrypt.tearDown();
                }
            },
            loadUserPage = function(em) {
                window.user_email = em;
                _priv.loadUserKeypair();
                login_page.hide();
                $(".needs-logged-in").show();
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
        
        $("#login_p").pwstrength(); 
        
        $(".contact-search-text").on("keyup", function() {
            var search_text = $(this).val();
            search_res_display.removeClass("box-shape").html(" . . . ");
            
            if (search_text.length == 0) {
                search_res_display.removeClass("box-shape").html("");
                return;
            }
            
            _priv.searchForContacts(search_text, function(_r){
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
        
        $(".contacts-list").on("click", ".contact-remove", function(e) {
            e.stopPropagation();
            var action_item = $(this).parent(".contact-approved");
            action_item.toggleClass("box-dark-open").toggleClass("remove-active");
            var cid = action_item.attr("data-cid");
            var rem_action = $("#remove-"+cid+"-action");
            rem_action.toggle();
            rem_action.toggleClass("remove-active");
        });
        
        $(".contacts-list").on("click", ".contact-remove-cancel", function(e) {
            var cid = $(this).attr("data-cid");
            var close_id = $("#remove_"+cid);
            close_id.trigger("click");
        });
        
        $(".contacts-list").on("click", ".contact-remove-confirm", function(e) {
            var remove_confirm = $(this);
            var cid = remove_confirm.attr("data-cid");

            _priv.removeContact(cid, function(_r){
                if (!_r.err) {
                    _priv.loadUserContacts();
                } else {
                    alert(_r.m);
                }
            });
        });
        
        $(".contacts-list").on("click", ".add-contact-action", function() {
            _priv.sendContactRequest($(this).attr("data-uid"), function(_r){
                $(".contact-search-close").click();
                $(".contact-search-text").val();
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
        
        $(".contacts-list").on("click", ".req-approve", function(e) {
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
                $(".conversation-text-input").val("").blur();
                _UpCrypt.setFileNameDisplay("encrypting file ...");
                _priv.sendMessageToActiveChatSession(msg, file_send, function(_r){
                    if (!_r.err) {
                        $("#up-file-status").html("");
                        _priv.stopRefreshInterval();
                        _priv.reloadConversation(curr_active_cid.attr("data-cid"), curr_active_cid, false);
                    } else {
                        alert("Error sending message. "+_r.m);
                        $(".conversation-text-input").val(msg);
                    }
                });
                return false;
            }
            return true;
        });
        
        $(".contacts-list").on("click", ".contact-approved", function(e) {
            var $this = $(this);
            var cid = $this.attr("data-cid");
            var this_active = $this.hasClass("active-chat");
            var this_removing = $this.hasClass("remove-active");
            
            if (this_removing) {
                e.stopPropagation();
                return;
            }
            
            file_send = 0;
            last_msg_id = 0;
            _UpCrypt.setFileNameDisplay("");
            
            _priv.stopRefreshInterval();
            
            $(".conversation-output").hide();
            $(".welcome-screen").hide();
            
            if ("object" == typeof curr_active_cid) {
                curr_active_cid.removeClass("box-dark-open").removeClass("active-chat");
                if (this_active) {
                    curr_active_cid = undefined;
                    curr_cid = undefined;
                    curr_interval = undefined;
                    $(".welcome-screen").show();
                    return;
                }
            }
            
            _priv.reloadConversation(cid, $this, true);
        });
        
        $(".contact-search").on("click", function(){
            $(".contact-search-form").toggle();
            $(".contact-search-text").focus();
        });
        
        $(".close-btn").on("click", function() {
            $(this).closest(".form-group").toggle();
        });
        
        $("#upload_file_crypt").on("submit", function(e) {
            file_send_event = e;
            file_send_event.preventDefault();
            $("#up-file-files").simulate("click");
            return false;
        });
        
        $("#up-file-files").on("change", function() {
            if ($(this).val().length > 0) {
                file_send = true;
                _UpCrypt.setFileNameDisplay($(this).val().replace("C:\\fakepath\\", ""));
                _UpCrypt.setAesKey(random_string(32));
            } else {
                _UpCrypt.setFileNameDisplay("No file selected.");
                file_send = false;
                $("#up-file-files").val("")
            }
        });
        
        $("#user_form").submit(function(e){
            e.preventDefault();
            
            var email = $("#login_e").val(),
                pass = $("#login_p").val(),
                pass_strength = $.pwstrength(pass);
            
            if (!_priv.isValidAddr(email)) {
                    alert("Please provide a valid email address.");
                    $("#login_e").focus();
                    return false;
            }
            
            if (pass.length == 0) {
                    alert("Please provide a password.");
                    $("#login_p").focus();
                    return false;
            }
            
            $.post("/keys/ajax/lookup.php", {em:email, pw:pass}, function(R) {
                
                if (R.id == 0) {
                    alert("Error logging in or creating account.");
                    return;
                }
                
                if (R.is_new == true) {
                    _priv.generateKey(email, pass, "Chat", function(e, p){
                        _priv.initUser(e, p);
                        _priv.hideMessage();
                    });
                } else {
                    _priv.initUser(email, pass);
                }
                
            }, "json")
            .fail(function(d) {
            });
            
            return false;
        });
    
        _priv.accessCheck();
    
    });
})(jQuery);