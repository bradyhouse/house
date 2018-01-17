const
  log = require('../../utils/log');


var getHealth = function (params, callback) {
  log.info('services > health > getHealth');
  return callback(200, "OK");
};

exports.dispatch = {
  GET: getHealth
};