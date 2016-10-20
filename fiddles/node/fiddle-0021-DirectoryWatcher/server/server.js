const watch = require('./events/on-watch'),
  archiveStart = require('./events/on-archive-start'),
  createIndex = require('./events/on-create-index'),
  directories = require('../config/directories'),
  file = require('../util/file-grep'),
  indexFileConfig = require('../config/index-file'),
  index = require('./events/on-index-file'),
  log = require('../util/log'),
  moment = require('moment'),
  date = new Date(),
  format = 'YYYY-MM-DD',
  formattedDate =  moment(date).format(format),
  header = formattedDate + ',\n',
  archiveRoot = directories.archiveDir,
  archiveToday = archiveRoot + '/' + formattedDate,
  addIndexHeader = function(root, text, callback) {
    let indexFile = root + '/' + indexFileConfig.filename,
      containsHeader = file.grep(indexFile, text);
    if (!containsHeader) {
      index.trigger(root, header, callback);
    } else {
      callback(null);
    }
  };

archiveStart.trigger(archiveRoot, archiveToday, function (err) {
  if (err) {
    log.error(err);
  } else {
    createIndex.trigger(archiveRoot, function(err) {
      addIndexHeader(archiveRoot, header, function(err) {
        if (err) {
          log.error(err);
        } else {
          watch.trigger(archiveRoot, archiveToday);
        }
      });
    });
  }
});





