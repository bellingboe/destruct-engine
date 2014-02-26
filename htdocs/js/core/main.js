/*!
 * main.js
 * https://destruct.co
 *
 * Copyright 2014 Brenden Ellingboe (brenden@brenden.me)
 *
 */
var _Main = (function($) {

    $(function(){
        
        if (!$("body").hasClass("main")) {
            return;
        }
    
            function nl2br (str, is_xhtml) {
                    var breakTag = (is_xhtml || typeof is_xhtml === 'undefined') ? '<br />' : '<br>';
                    return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + breakTag + '$2');
            }
            
            var opts = {
                    textarea: 'msgContent',
                    clientSideStorage: false,
                    focusOnLoad: true,
                    autogrow: true,
                    button: {
                            preview: true,
                            fullscreen: false,
                    },
            };
            var editor = new EpicEditor(opts).load();

            if ($("#errmsg").html()) {
                try {
                    window.history.pushState('decrypted', 'Destruct.co', '/');
                } catch(err) { }
            }
            
            if (location.hash && $("#mdisplay").html()) {
                    var A = location.hash;
                    var uc;
                    A = A.substring(1, A.length);
                    
                    try {
                            uc = unciph(A, $("#msgenc").val());
                            $("#msgForm").hide();
                    } catch(err) {
                            uc = err;
                            $("#msgForm").show();
                    }
                    
                    uc_clear = nl2br(uc, false);
                    uc = markdown.toHTML(uc);
                    
                    $("#mdisplay").show().html(uc);
                    $("#rawdisplay").show().html(uc_clear);
                    location.hash = "";
                    
                    ga('send', 'event', 'message', 'decrypt', 'links');
                    
                    try {
                        window.history.pushState('decrypted', 'Destruct.co', '/');
                    } catch(err) { }
            }
            
            $("#msgResp").on("click", "#shareAnchor", function(e){
                    e.preventDefault();
                    $(this).focus().select();
            });
    
            $("#msgForm").submit(function(){
                    ga('send', 'event', 'message', 'encrypt', 'links');
                    var p = random_string(null);
                    var mt = $("#msgContent").val();
                    var em = ciph(p, mt);
                    $.post("/index.php", {m: em}, function(R) {
                            $("#msgForm").hide();
                            $("#msgResp").show().html(R);
                            var link_href = $("#shareAnchor").attr("value");
                            $("#shareAnchor").attr("value",link_href + "#" + p);
                            $("#new_btn").show();
                    }, "json")
                    .fail(function(d) {
                            console.log('failed');
                            console.log(d);
                    });
                    
                    return false;
            });
            
            $("#show_intro_msg").on("click", function(e){
                e.preventDefault();
                $(".intro-msg").toggle();
                
                return false;
            });
    });
})(jQuery);