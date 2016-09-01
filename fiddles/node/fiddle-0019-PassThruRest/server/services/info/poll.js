const os = require('os'),
  log = require('../../../utils/log');


var getPoll = function (params, callBack) {
  log.info('services > info > poll > getPoll');
  var result = [{
    name: 'Free Memory',
    value: `${Math.round(os.freemem() / 1048576)}MB`
  }, {
    name: 'Uptime',
    value: `${os.uptime()}s`
  }];
  return callBack(200, "OK", {}, result);
};

exports.dispatch = {
  GET: getPoll
};
