const cluster = require('cluster'),
      stopSignals = [
        'SIGHUP', 'SIGINT', 'SIGQUIT', 'SIGILL', 'SIGTRAP', 'SIGABRT',
        'SIGBUS', 'SIGFPE', 'SIGUSR1', 'SIGSEGV', 'SIGUSR2', 'SIGTERM'
      ],
      production = process.env.NODE_ENV == 'production',
      log = require('./utils/log');


let stopping = false;

cluster.on('disconnect', function(worker) {
  if (production) {
    if (!stopping) {
      cluster.fork();
    }
  } else {
    process.exit(1);
  }
});

if (cluster.isMaster) {
  const workerCount = process.env.NODE_CLUSTER_WORKERS || 4;

  let timeout = 100;
  log.info(`Starting ${workerCount} workers...`);
  for (let i = 0; i < workerCount; i++) {
    setTimeout(function() {
      timeout += 350;
      cluster.fork();
    }, timeout);
  }
  if (production) {
    stopSignals.forEach(function (signal) {
      process.on(signal, function () {
        log.info(`Got ${signal}, stopping workers...`);
        stopping = true;
        cluster.disconnect(function () {
          log.info('All workers stopped, exiting.');
          process.exit(0);
        });
      });
    });
  }
} else {
  require('./server/server.js');
}
