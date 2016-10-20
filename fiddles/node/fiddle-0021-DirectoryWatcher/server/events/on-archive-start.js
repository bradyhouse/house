const
  fs = require('fs'),
  contentTypes = require('../../config/content-types'),
  createDirectory = require('./on-create-directory'),
  log = require('../../util/log');

exports.trigger = function(archiveRoot, archiveSub, callback) {
  log.info('events > on-archive-start');
  createDirectory.trigger(archiveRoot, function() {
    createDirectory.trigger(archiveSub, callback);
  });
};