import io from 'socket.io-client';

const socket = {
  current: io.connect('/'),
};

export default socket;
