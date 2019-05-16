const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const cors = require('cors');

server.listen(8000, () => console.log('connected to port 8000'));

app.use(cors());

// let names = []
let serverNames = [];

io.on('connection', socket => {
  socket.on('disconnect', () => {
    console.log('disconenct', socket.id);
  });

  socket.on('emitSayHello', name => {
    serverNames = [...serverNames, { socketId: socket.id, name }];
    socket.broadcast.emit('onSayHello', name);
  });
});
