const socketCluster = require('socketcluster-client');

const options = {
  hostname: 'localhost',
  port: 8000
};

const socket = socketCluster.connect(options);
socket.on('simple_event1', num => {
  console.log('RANDOM: ' + num);
});

socket.emit('simple_event1', {message: 'Client 1'});

// Channel
socket.subscribe('channel_1');

// ---------------- Channel ---------------- //
const channel1 = socket.subscribe('channel_1');
channel1.watch((count) => {
  console.log('Client received data from pong channel:', count);
});

// Push a message to a channel
channel1.publish('This PONG event comes from a client 1');