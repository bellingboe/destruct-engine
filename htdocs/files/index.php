

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
            background-color: #577088;
            background: #577088;
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
</body>
</html>
