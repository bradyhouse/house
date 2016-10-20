const
  move = require('file-move'),
  log = require('../../util/log'),
  createDirectory = require('./on-create-directory'),
  fileNameParser = require('../../util/filename-parser');

exports.trigger = function(archiveDir, ext, filename, callback) {
  log.info('events > on-archive-file > moving ' + filename + ' to ' + archiveDir + '...');
  let typeArchiveDir = archiveDir + '/' + ext,
      archivedFilename = typeArchiveDir + '/' + fileNameParser.parse(filename);
  createDirectory.trigger(typeArchiveDir, function (err) {
    if (err) {
      callback(err);
    } else {
      move(filename, archivedFilename, callback);
    }
  });
};