import io from 'socket.io-client';

// const socket = io('http://localhost:8003/');
// const socket = io('http://lean-story.surge.sh:8003/');
const socket = io('https://todo-manager-develop.herokuapp.com:8003/');

const configureSocket = cb => {
  socket.on('connect', () => {
    console.log('connected');
  });
  socket.on('onSayHello', name => {
    cb(name);
  });
};

export const sayHello = name => {
  socket.emit('emitSayHello', name);
};

export default configureSocket;
