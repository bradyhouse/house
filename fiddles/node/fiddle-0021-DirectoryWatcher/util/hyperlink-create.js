const
  fileNameParser = require('./filename-parser'),
  createAdocLink = function(dir, ext, filename) {
    let newFileName = fileNameParser.parse(filename),
      url = dir + '/' + ext + '/' + newFileName,
      text = newFileName;
    return 'link:' + url + '[' + text + ']';
  },
  createCsvLink = function(dir, ext, filename) {
    let newFileName = fileNameParser.parse(filename);
    return  dir + '/' + ext + '/' + newFileName;
  };

exports.create = {
  adoc: createAdocLink,
  csv: createCsvLink
};

