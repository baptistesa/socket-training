var express = require('express'),
  http = require('http');
var router = express.Router();
var app = express();
var server = http.createServer(app);
var io = require('socket.io').listen(server);

server.listen(3001);


io.on('connection', (socket) => {

  socket.on('send-user', (message) => {
    io.sockets.in(message.id_room).emit('message',
      {
        message: message.text,
        id_exp: message.id_exp,
        id_dest: message.id_dest,
        room: message.id_room
      });
      // INSERER ICI LE MESSAGE DANS LA BDD
  })

  socket.on('join', (data) => {
    socket.join(data.id_room);
    socket.nickname = data.nickname;
  });

  socket.on("writing", data => {
    io.sockets.in(data.id_room).emit("writing", {
      status: true,
      id: data.id
    })
  })

  socket.on("nowriting", data => {
    io.sockets.in(data.id_room).emit("nowriting", {
      status: false,
      id: data.id
    })
  })
})


/* GET home page. DO NOT TOUCH*/
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});


module.exports = router;