

<!DOCTYPE html>

<html>
<head>
    <script src="/js/dropzone.js"></script>
    <link href="/css/dropzone.css" rel="stylesheet">
    <title>Quick File Sharing</title>
    
    <style> 
        @import url('https://fonts.googleapis.com/css?family=Baloo+Bhaijaan');
        
        body {
            font-family: 'Baloo Bhaijaan', cursive;
            text-transform: uppercase;
            background-color: #292E30;
            background: #292E30;
        }
        
        .dropzone {
            margin-top:200px;
        }

    </style>
    
</head>

<body>


    
    <form action="/files/proccess" method="post" class="dropzone" id="my-awesome-dropzone" enctype="multipart/form-data">
        <div class="dz-message needsclick">
        Drop files here or click to upload.
        </div>
    </form>

    <script src="https://use.fontawesome.com/49e4fad6c7.js"></script>
    <script>
    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
  
    ga('create', 'UA-105320948-1', 'auto');
    ga('send', 'pageview');
  
  </script>
</body>
</html>
