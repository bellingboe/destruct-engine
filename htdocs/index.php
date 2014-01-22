<?php
require_once '../inc/Functions.php';

$engine = DestructEngine::factory();

// stop those stupid URL grabbers (ex: facebook) that tries to grab the title,
// and thus delete the message before the user sees it
$engine->stopLinkGrabbing();

// MAGIC!
$engine->run();

$message = $engine->message();
$url	 = $engine->url();

$url_return_html = "\"<div style='word-wrap: break-word; padding:5px; font-size: 16pt;background: #ECF2FF;' id='newMurl'><input id='shareAnchor' type='text' class='clearInput' value='%s'></div>\"";

$message_return_html = "<div id='mdisplay'>%s </div><input type='hidden' id='msgenc' value='%s'>";

if ($url !== null) {
    echo sprintf($url_return_html, $url);
    exit;
}
?>
<!DOCTYPE html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js"> <!--<![endif]-->
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <title>Destruct.co | Private, secure, destructable messages.</title>
    <meta name="description" content="">
    <meta name="viewport" content="width=device-width">
    <link rel="stylesheet" href="/css/normalize.css">
    <link rel="stylesheet" href="/css/main.css">
    <link rel="stylesheet" href="/css/style.css">
    <script src="/js/vendor/modernizr-2.6.2.min.js"></script>
    <script src="/epiceditor.min.js"></script>
    <script src="/js/vendor/markdown/markdown.min.js"></script>
</head>
    <body>
	<div id="wrapper">
        <!--[if lt IE 7]>
            <p class="chromeframe">You are using an <strong>outdated</strong> browser. Please <a href="//browsehappy.com/">upgrade your browser</a> or <a href="//www.google.com/chromeframe/?redirect=true">activate Google Chrome Frame</a> to improve your experience.</p>
        <![endif]-->

	    <h1 class="site-head">Destruct.co</h1>
            
            <a href="#" id="show_intro_msg" class="info-toggle">What is this?</a> <a class="gh-link" href="https://github.com/bellingboe/destruct-engine" title=""><span>View Source</span><img src="/img/gh.png" alt="View on GitHub"></a>
            <div class="intro-msg">
		Destruct.co is an <a href="https://github.com/bellingboe/destruct-engine">open-source web project</a> for sending/receiving encrypted, secure messages.
            </div>
		
            <?php
            if ($message !== null) {
                    echo sprintf($message_return_html, $message, $message);
                    echo "<hr><p><b>Message has been destroyed.</b> <a href='/'>Create New Message</a></p>";
            } else if($message==null && isset($_GET['key'])) {
                    echo $engine->errorGone();
            }
            ?>

            <form id="msgForm" action="" method="post">
                    <textarea id="msgContent" style="display:none; width:100%; height: 400px;max-width: 500px;border: 1px solid #ccc;border-radius: 3px;"></textarea>
                    <div id="epiceditor"></div>
    
                    <input type="submit" name="postEncrypted" value="Create" class="submit">
                    <br style="clear:both">
            </form>
    
            <div id="msgResp"></div>
            
            <p id="new_btn" style="display:none;">
                <a href='/'>Create New Message</a>
            </p>
    
            <p class="authorline">
                    Created by <a href="//twitter.com/NerdWhoCodes">@NerdWhoCodes</a>.
	    </p>
            <p class="authorline">
                    Made pretty by <a href='//twitter.com/oscargodson'>@oscargodson</a> and <a href='http://epiceditor.com'>EpicEditor</a>.
            </p>
            <p class="authorline">
                    Huge thanks to the creators of <a href='//github.com/mdp/gibberish-aes'>Gibberish AES</a> - the core Destruct.co relies on.
            </p>
            <p class="authorline">
                    Donate BTC: <strong><?php echo DestructEngine::btc();?></strong>
            </p>
            <p class="authorline">
                    Donate LTC: <strong><?php echo DestructEngine::ltc();?></strong>
            </p>
	</div>
        
        <script src="//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
        <script>window.jQuery || document.write('<script src="/js/vendor/jquery-1.9.1.min.js"><\/script>')</script>
        <script src="/js/plugins.js"></script>
        <script src="/js/main.js"></script>
        <script>
                (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
                (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
                m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
                })(window,document,'script','//www.google-analytics.com/analytics.js','ga');
                
                ga('create', 'UA-27412705-2', 'destruct.co');
                ga('send', 'pageview');
        </script>
    </body>
</html>