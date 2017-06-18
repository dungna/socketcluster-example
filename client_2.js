const socketCluster = require('socketcluster-client');

const options = {
  hostname: 'localhost',
  port: 8000
};

const socket = socketCluster.connect(options);
socket.on('simple_event2', num => {
  console.log('RANDOM: ' + num);
});

socket.emit('simple_event2', {message: 'Client 2'});

// ---------------- Channel ---------------- //
// Channel 1
const channel1 = socket.subscribe('channel_1');
channel1.watch((count) => {
  console.log('Client received data from pong channel:', count);
});

// Push a message to a channel1
channel1.publish('This PONG event comes from a client 2');

// Channel 2
const channel2 = socket.subscribe('channle_2');
channel2.watch((data) => {
  console.log(data);
})

// Push a message to a channel2
channel2.publish('Broadcast is sent from client 2 to channel_2 channel');
