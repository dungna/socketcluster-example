const esClient = require('./libs/elasticsearch');

module.exports.run = function (worker) {
  console.log('   >> Worker PID:', process.pid);
  var scServer = worker.scServer;
  var count = 0;

  /*
    In here we handle our incoming realtime connections and listen for events.
  */
  scServer.on('connection', function (socket) {
    // simple_event1
    socket.on('simple_event1', function (data) {
      count++;
      console.log(data);
      scServer.exchange.publish('channel_1', `msg: Server ${count}`);
    });

    // simple_event2
    socket.on('simple_event2', (data) => {
      console.log(data);
      socket.emit('simple_event2', 'msg: Server sent simple_event2 data');
      scServer.exchange.publish('channel_2', 'msg: Server sent data to channel_2');
    });

    // elasticsearch event
    socket.on('elasticsearch', () => {
      const esData = esClient.searchDocument('pmd_api', 'set_event', '');

      // Push es data for client
      socket.emit('elasticsearch', esData.hits.hits);
    });

    var interval = setInterval(function () {
      socket.emit('rand', {
        rand: Math.floor(Math.random() * 5)
      });
    }, 1000);

    socket.on('disconnect', function () {
      clearInterval(interval);
    });
  });
};
