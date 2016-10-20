const
  createFile = require('create-file'),
  log = require('../../util/log'),
  indexFileConfig = require('../../config/index-file');

exports.trigger = function(archiveRoot, callback) {
  log.info('events > on-create-index');
  let indexFile = archiveRoot + '/' + indexFileConfig.filename;
  createFile(indexFile, indexFileConfig.header, callback);
};