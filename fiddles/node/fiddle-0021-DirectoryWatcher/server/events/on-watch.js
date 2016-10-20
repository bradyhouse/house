const
  watchDirectory = require('watchdirectory'),
  archiveFile = require('./on-archive-file'),
  path = require('path'),
  index = require('./on-index-file'),
  directories = require('../../config/directories'),
  contentTypes = require('../../config/content-types'),
  indexFileConfig = require('../../config/index-file'),
  log = require('../../util/log'),
  moment = require('moment'),
  date = new Date(),
  format = 'HH:mm:ss',
  timestamp = moment(date).format(format),
  hyperlink = require('../../util/hyperlink-create'),
  archive = function(root, dir, ext, filename, header) {
    archiveFile.trigger(dir, ext, filename, function(err) {
      if (err) {
        log.error(err);
      } else {
        let link = hyperlink['create'][indexFileConfig.type](dir, ext, filename),
            linkText = timestamp + ', ' + ext +', ' + link + '\n';
        index.trigger(root, linkText, function(err) {
          if (err) {
            log.error(err);
          }
        });
      }
    });
  };

exports.trigger = function(archiveRoot, archiveDir) {
  log.info('events > on-watch');
  watchDirectory.watchDirectory(directories.watchDir, {
      recursive: false
    }, function (filename, curr, prev, change) {
    let ext = path.extname(filename).slice(1);
    if (contentTypes[ext]) {
      if (change === 'initial') {
        archive(archiveRoot, archiveDir, ext, filename);
      }
      else if (change === 'created') {
        archive(archiveRoot, archiveDir, ext, filename);
      }
      else if (change === 'deleted') {
        log.info(filename + ' deleted');
      }
      else if (change === 'modified') {
        log.info(filename + ' modified');
      }
    }
  });
};
