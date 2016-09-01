const
  log = require('npmlog'),
  isDev = require('../config/state').isDev,
  env = process.env;

exports.info = function(msg) {
  if (isDev) {
    setTimeout(() => {
      log.info(new Date(), msg);
    }, 200);
  }
};

exports.error = function(err) {
  if('message' in err) {
    log.error(new Date(), err.message);
  } else {
    log.error(new Date(), err);
  }
};

exports.console = function(msg) {
  if (isDev) {
    console.log(msg);
  }
}




