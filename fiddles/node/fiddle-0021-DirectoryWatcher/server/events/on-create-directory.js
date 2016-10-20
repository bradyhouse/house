const
  fs = require('fs'),
  log = require('../../util/log'),
  createDirectory = function (directory, callback) {
    log.info('events > on-create-directory ( ' + directory + ' )');
    fs.stat(directory, function(err, stats) {
      if (err) {
        fs.mkdir(directory, callback);
      } else {
        callback(err);
      }
    });
  }

exports.trigger = function(directory, callback) {
  createDirectory(directory, callback);
};