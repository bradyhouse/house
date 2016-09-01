const
  request = require('request'),
  parameter = require('../../utils/get-parameter.js'),
  log = require('../../utils/log');



var post = function (params, callback) {
  log.info('services > passthru > post');
  var url = parameter.get(params, 'url'),
      allowOrigin = parameter.get(params, 'allowOrigin'),
      allowCredentials = parameter.get(params, 'allowCredentials'),
      allowMethods = parameter.get(params, 'allowMethods'),
      allowHeaders = parameter.get(params, 'allowHeaders'),
      headers = {};

  if (!url) {
    return callback(403, 'MUST SPECIFY A "URL"', {}, {
      status: 403,
      message: 'MUST SPECIFY A "URL"'
    });
  }

  if (allowOrigin) {
    log.info('services > passthru > post > Access-Control-Allow-Origin = ' + allowOrigin);
    headers['Access-Control-Allow-Origin'] = allowOrigin;
  }

  if (allowCredentials) {
    log.info('services > passthru > post > Access-Control-Allow-Origin = ' + allowCredentials);
    headers['Access-Control-Allow-Credentials'] = allowCredentials;
  }

  if (allowMethods) {
    log.info('services > passthru > post > Access-Control-Allow-Methods = ' + allowMethods);
    headers['Access-Control-Allow-Methods'] = allowMethods;
  }

  if (allowHeaders) {
    log.info('services > passthru > post > Access-Control-Allow-Headers = ' + allowHeaders);
    headers['Access-Control-Allow-Headers'] = allowHeaders;
  }

  request(url, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      return callback(200, "OK", headers, body);
    }
  })


};


exports.dispatch = {
  POST:   post
};
