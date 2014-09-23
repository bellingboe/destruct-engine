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
		
		console.log(users);
	});
	socket.on("disconnect", function(s, t, u){
	  
	  console.log("disocnn arg")
	  console.log(s);
	  console.log(t);
	  console.log(u);
	  
		var id = users[s].i;
		io.emit('idDisconn', id, socket.id);
		delete users[socket.id];
		
		console.log(users);
	})
});

https.listen(3000, function(){
  console.log('listening on *:3000');
});

