const os = require('os'),
  exec = require('child_process').execSync,
  env = process.env,
  log = require('../../../utils/log');

var getGen = function (params, callBack) {
  log.info('services > info > gen > getGen');
  var result = [{
    name: 'Node.js Version',
    value: process.version.replace('v', '')
  }, {
    name: 'NPM Version',
    value: exec('npm --version').toString().replace(os.EOL, '')
  }, {
    name: 'OS Type',
    value: os.type()
  }, {
    name: 'OS Platform',
    value: os.platform()
  }, {
    name: 'OS Architecture',
    value: os.arch()
  }, {
    name: 'OS Release',
    value: os.release()
  }, {
    name: 'CPU Cores',
    value: os.cpus().length
  }, {
    name: 'Gear Memory',
    value: `${env.OPENSHIFT_GEAR_MEMORY_MB}MB`
  }, {
    name: 'NODE_ENV',
    value: env.NODE_ENV
  }];

  return callBack(200, "OK", {}, result);

};

exports.dispatch = {
  GET: getGen
};

