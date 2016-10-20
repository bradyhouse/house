const
  log = require('../../util/log'),
  indexFileConfig = require('../../config/index-file'),
  fs = require('fs');

exports.trigger = function(dir, text, callback) {
  log.info('events > on-append-index');
  let indexFile = dir + '/' + indexFileConfig.filename;
  fs.appendFile(indexFile, text, callback);
};