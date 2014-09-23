var app = require('express')()
  , fs = require('fs')
//, http = require('http').Server(app)
  , https = require('https').Server({
      key: fs.readFileSync('/etc/ssl/www_destruct_co.key'),
      cert: fs.readFileSync('/etc/ssl/www_destruct_co.crt'),
      ca: fs.readFileSync('/etc/ssl/www_destruct_co.ca-bundle') 
    }, app)
  , io = require('socket.io')(https);
  
io.enable('browser client minification');  // send minified client
io.enable('browser client etag');          // apply etag caching logic based on version number
io.enable('browser client gzip');          // gzip the file
io.set('log level', 1);                    // reduce logging

// enable all transports (optional if you want flashsocket support, please note that some hosting
// providers do not allow you to create servers that listen on a port different than 80 or their
// default port)
io.set('transports', [
    'websocket'
  , 'flashsocket'
  , 'htmlfile'
  , 'xhr-polling'
  , 'jsonp-polling'
]);

app.get('/', function(req, res){
  res.send('<h1>Hello world</h1>');
});

io.on('connection', function(socket){
  console.log('a user connected');
});

https.listen(3000, function(){
  console.log('listening on *:3000');
});

