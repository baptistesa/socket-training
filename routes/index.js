var express = require('express'),
  http = require('http');
var router = express.Router();
var app = express();
var server = http.createServer(app);
var io = require('socket.io').listen(server);

server.listen(3001);


io.on('connection', (socket) => {

  socket.on('send-message', (message) => {
    io.sockets.in(message.id_room).emit('message',
      {
        message: message.text,
        room: message.id_room,
        nickname: message.nickname
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
      nickname: data.nickname
    })
  })

  socket.on("nowriting", data => {
    io.sockets.in(data.id_room).emit("nowriting", {
      status: false,
      nickname: data.nickname
    })
  })
})


/* GET home page */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});


module.exports = router;