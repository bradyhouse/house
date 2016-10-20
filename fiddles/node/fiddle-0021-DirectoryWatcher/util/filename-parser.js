
exports.parse = function(filename) {
  var pieces = filename.split('/');
  return pieces.length ? pieces[pieces.length - 1] : filename;
}