var app = require('express')()
  , fs = require('fs')
//, http = require('http').Server(app)
  , https = require('https').Server({
      key: fs.readFileSync('/etc/ssl/www_destruct_co.key'),
      cert: fs.readFileSync('/etc/ssl/www_destruct_co.crt'),
      ca: fs.readFileSync('/etc/ssl/www_destruct_co.ca-bundle') 
    }, app)
  , io = require('socket.io')(https);

io.set('transports', ['websocket', 
                      'flashsocket', 
                      'htmlfile', 
                      'xhr-polling', 
                      'jsonp-polling', 
                      'polling']);

var users = [];

app.get('/', function(req, res){
  //res.send('<h1>Hello world</h1>');
});

io.on('connection', function(socket){
	socket.on('id-with-key', function(id, key){
		users[socket.id] = {k: key, i: id};
		io.emit('socket-from-key', id, socket.id);
	});
	socket.on("disconnect", function(){
		try {
			var id = users[socket.id].i;
			io.emit('idDisconn', id, socket.id);
			delete users[socket.id];
		} catch (e){}
 	});
});

https.listen(3000, function(){
  console.log('listening on *:3000');
});

