const
  JFile = require('jfile');

exports.grep = function(filePath, criteria) {
  let txtFile = new JFile(filePath),
      criteriaPieces = criteria.split('\n'),
      cleanCriteria = criteriaPieces[0],
      grepResult = txtFile.grep(cleanCriteria, false);
  return grepResult && grepResult.length > 0 ? true : false;
}
