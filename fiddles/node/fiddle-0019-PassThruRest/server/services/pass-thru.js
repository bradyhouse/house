const
  request = require('request'),
  parameter = require('../../utils/get-parameter.js'),
  log = require('../../utils/log'),
  jsonConverter = require('xml-to-json-promise');


var post = function (params, callback) {
    log.info('services > passthru > post');
    log.info('params:');
    log.console(params);

    var url = parameter.get(params, 'url'),
      allowOrigin = parameter.get(params, 'allowOrigin'),
      allowCredentials = parameter.get(params, 'allowCredentials'),
      allowMethods = parameter.get(params, 'allowMethods'),
      allowHeaders = parameter.get(params, 'allowHeaders'),
      convertToJson = parameter.get(params, 'convertToJson'),
      headers = {};

    log.info('url: ' + url);

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
      log.info('services > passthru > post > Access-Control-Allow-Credentials = ' + allowCredentials);
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
      log.info('pass-thru > request > body:');
      if (!error && response.statusCode == 200) {
        if (convertToJson) {
          jsonConverter.xmlDataToJSON(body).then(json => {
            return callback(200, "OK", headers, json);
          });
        } else {
          if (typeof body == 'string') {
            return callback(200, "OK", headers, JSON.parse(body));
          } else {
            return callback(200, "OK", headers, body);
          }
        }
      }
    })
  },
  options = function (params, callback) {
    log.info('services > passthru > options');
    let originUrl = parameter.get(params, 'requestOrigin') ? parameter.get(params, 'requestOrigin') : '*';
    /*
     header('Access-Control-Allow-Origin: *');
     header('Access-Control-Allow-Methods: POST,GET,OPTIONS');
     header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');
     */
    var headers = {
      'Access-Control-Allow-Origin': originUrl,
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
      'Access-Control-Allow-Methods': 'POST,GET,OPTIONS',
      'Access-Control-Allow-Credentials': true
    };
    // status, statusText, headers, result
    // res, params, status, statusText, headers, result
    return callback(200, "OK", headers, {});
  };

exports.dispatch = {
  POST: post,
  OPTIONS: options
};
