<?php
require_once '../inc/Functions.php';

// ================== MAIN ================== //
// Yes, this page is gross. It'll be prettier. In time.

$engine = DestructEngine::factory();

// stop those stupid URL grabbers (ex: facebook) that tries to grab the title,
// and thus delete the message before the user sees it
$engine->stopLinkGrabbing();

// MAGIC!
$engine->run();

$message = $engine->message();
$url	 = $engine->url();

$url_return_html = "\"<div style='word-wrap: break-word; padding:5px; font-size: 16pt;background: #ECF2FF;' id='newMurl'><input id='shareAnchor' type='text' class='clearInput' value='%s'></div>\"";

$message_return_html = "<h3>Markdown</h3><div id='mdisplay'>%s </div><input type='hidden' id='msgenc' value='%s'><br><br><h3>Raw Output</h3><div id='rawdisplay'></div>";

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
    <title>Private, secure, destructable messages with Destruct.co</title>
    <meta name="blitz" content="mu-eadc3b3f-8c5dfdb5-a84bd1bb-03a24e26">
    <meta name="description" content="Share a confidential note via a web link that will self-destruct after it is read by your intended recipient.">
    <meta name="viewport" content="width=device-width">
    <link rel="stylesheet" href="/css/normalize.css">
    <link rel="stylesheet" href="/css/main.css">
    <link rel="stylesheet" href="/css/style.css">
    <!--
    <script src="/js/vendor/modernizr.js"></script>
    <script src="/js/vendor/epiceditor.js"></script>
    <script src="/js/vendor/markdown.js"></script>
    -->
    <meta property="twitter:account_id" content="4503599627845130" />
    <meta name="twitter:card" content="summary">
    <meta name="twitter:site" content="@NerdWhoCodes">
    <meta name="twitter:title" content="Secure PGP Encryption">
    <meta name="twitter:description" content="Everything is encrypted in 256-bit AES">
    <meta name="twitter:creator" content="@NerdWhoCodes">
    <meta name="twitter:image:src" content="">
    <meta name="twitter:domain" content="destruct.co">
    <meta name="twitter:app:name:iphone" content="">
    <meta name="twitter:app:name:ipad" content="">
    <meta name="twitter:app:name:googleplay" content="">
    <meta name="twitter:app:url:iphone" content="">
    <meta name="twitter:app:url:ipad" content="">
    <meta name="twitter:app:url:googleplay" content="">
    <meta name="twitter:app:id:iphone" content="">
    <meta name="twitter:app:id:ipad" content="">
    <meta name="twitter:app:id:googleplay" content="">
	
    <script>
      (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
      (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
      m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
      })(window,document,'script','//www.google-analytics.com/analytics.js','ga');
    
      ga('create', 'UA-27412705-2', 'destruct.co');
      ga('send', 'pageview');
    
    </script>
</head>
    <body class="main">
	
	<!-- Google Tag Manager -->
	<noscript><iframe src="//www.googletagmanager.com/ns.html?id=GTM-MLWVL6"
	height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
	<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
	new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
	j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
	'//www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
	})(window,document,'script','dataLayer','GTM-MLWVL6');</script>
	<!-- End Google Tag Manager -->
	
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
                    echo "<div id='errmsg'>" . $engine->errorGone() . "</div>";
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
    
            <p class="authorline hotline">
                     New! <a href="/chat/">Chat with end-to-end encryption</a> - meaning nobody (not even I) can read your messages except you and your recipient.
	    </p>
            <p class="authorline hotline">
		<a href="https://twitter.com/NerdWhoCodes" class="twitter-follow-button" data-show-count="false">Follow @NerdWhoCodes</a>
		<script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+'://platform.twitter.com/widgets.js';fjs.parentNode.insertBefore(js,fjs);}}(document, 'script', 'twitter-wjs');</script>
		<a href="https://twitter.com/share" class="twitter-share-button" data-via="NerdWhoCodes">Tweet</a>
		<script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+'://platform.twitter.com/widgets.js';fjs.parentNode.insertBefore(js,fjs);}}(document, 'script', 'twitter-wjs');</script>
	    </p>
            <p class="authorline">
                    Created by <a href="//twitter.com/NerdWhoCodes">@NerdWhoCodes</a>.
	    </p>
            <p class="authorline">
                    Donate DOGE: <strong><?php echo DestructEngine::doge();?></strong>
            </p>
            <p class="authorline">
                    Donate LTC: <strong><?php echo DestructEngine::ltc();?></strong>
            </p>
            <p class="authorline">
                    Huge thanks to the creators of <a href='//github.com/mdp/gibberish-aes'>Gibberish AES</a>, <a href='//twitter.com/oscargodson'>@oscargodson</a> and <a href='http://epiceditor.com'>EpicEditor</a>.
            </p>
	</div>
        
	<!--
	<script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>
	<script>window.jQuery || document.write('<script src="/js/jquery.js"><\/script>')</script>
	<script src="/js/core/plugins.js"></script>
	<script src="/js/core/aes.js"></script>
	<script src="/js/core/main.js"></script>
	-->
	
	<script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>
	<script src="/combined.js"></script>
	
	<script src="//platform.twitter.com/oct.js" type="text/javascript"></script>
	<script type="text/javascript">
	     twttr.conversion.trackPid('l4bnc');
	</script>
	<noscript>
	     <img height="1" width="1" style="display:none;" alt="" src="https://analytics.twitter.com/i/adsct?txn_id=l4bnc&p_id=Twitter" />
	</noscript>
    </body>
</html>