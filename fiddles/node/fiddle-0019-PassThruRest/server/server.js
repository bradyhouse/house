const
  http = require('http'),
  log = require('../utils/log'),
  requestEvent = require('./events/on-request'),
  env = process.env;


let server = http.createServer(function (req, res) {
  log.info('server > createServer');
  log.info('req: ');
  log.info(req);
  log.info('res:');
  log.info(res);
  requestEvent.trigger(req, res);
});

server.listen(env.NODE_PORT || 3000, env.NODE_IP || 'localhost', function () {
  console.log(`worker ${process.pid} started...`);
});