import io from 'socket.io-client';

const socket = io('http://localhost:8001/note');

const configureSocket = () => {
  socket.on('connect', () => {
    console.log('connected');
  });
};

export const getCurrentUsers = () => {
  console.log(12);
  console.log(socket);
  socket.emit('GET_CURRENT_USERS');
};

export default configureSocket;
