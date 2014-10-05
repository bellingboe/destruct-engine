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
                      'xhr-polling',
                      'flashsocket', 
                      'htmlfile', 
                      'jsonp-polling', 
                      'polling']);

var user_socks 	= [] 	// [name] = socket.id;
  , users 		= [] 	// [socket.id] = name;
  , pubs 		= []; 	// [name] = key;

var getUserByName = function(n) {
  var user_sock = user_socks[n] || null;
  var user_name = users[user_sock] || null;
  
  if (n == user_name) {
	 var user_pub = pubs[user_name];
  } else {
	 return false;
  }
  
  return {sock: user_sock,
		  name: user_name,
		  pub: user_pub};
};

app.get('/', function(req, res){
  res.send('Hello World');
});

io.on('connection', function(socket){

  console.log(" ---------------- socket connected ---------------- ");

  socket.on('id-with-key', function(name, key){
      users[socket.id] = name;
      pubs[name] = key;
      user_socks[name] = socket.id;
  });
  
  socket.on('send-encrypted-message', function(p){
	var to = p.to; // array
	var pgp_msg = p.ek // PGP-encrypted AES key
	var enc_text = p.et; // AES-encrypted text
	var msg_from = p.f; // username message is from
	
	for (var i=0; i<p.to.length; i++) {
	  var u = getUserByName(p.to[i]);
	  try {
		io.to(u.sock).emit("rec-encrypted-message", p);
	  } catch (e) {
		console.log("err:");
		console.log(e);
	  }
	}
  });

  socket.on('socket-test', function(name){
    var c = getUserByName(name);
    try {
      io.to(c.sock).emit("socket-test-msg", {"msg": "self test success!"});
    } catch (e) {
      console.log("err:");
      console.log(e);
    }
  });

	socket.on('verify-name', function(name){
	  if ("undefined" !== typeof user_socks[name]) {
		  var user_pub = pubs[name];
		  socket.emit("verify-true", {name: name, key: user_pub});
	  } else {
		  socket.emit("verify-false", {name: name});
	  }
	});

  socket.on("send-user-verify", function (user, contact) {
    var c = getUserByName(contact);
    try {
      io.to(c.sock).emit("added-by-user", {"name": user});
    } catch (e) {
      console.log("err:");
      console.log(e);
    }
  });

  socket.on("disconnect", function(){
      try {
      //var id = users[socket.id];
      //io.emit('idDisconn', id, socket.id);
        var name = users[socket.id];
        delete pubs[name];
        delete users[socket.id];
       delete user_socks[name];
      } catch (e){}
  });

});

https.listen(8080, function(){
  console.log('listening on *:8080');
});
