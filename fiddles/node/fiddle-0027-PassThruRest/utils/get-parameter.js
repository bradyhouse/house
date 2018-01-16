
exports.get = function (params, name) {
  return (name in params) ? params[name] : null;
};