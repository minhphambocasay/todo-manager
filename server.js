const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const cors = require('cors');

server.listen(8000, () => console.log('connected to port 8000'));

app.use(cors());
// console.log(io.on)
io.on('connection', socket => {
  console.log(socket, 11);
  socket.on('disconnect', () => {
    console.log('disconenct');
  });

  socket.on('GET_CURRENT_USERS', () => {
    console.log(16);
    socket.emit('CURRENT_USERS', 123);
  });
});
