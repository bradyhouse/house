const
  http = require('http'),
  fs = require('fs'),
  path = require('path'),
  contentTypes = require('../../config/content-types'),
  endPoints = require('../../config/end-points'),
  request = require('request'),
  log = require('../../utils/log'),
  endPointerConverter = require('../../utils/converters/to-end-point'),
  response = require('./on-response'),
  queryString = require("querystring"),
  env = process.env;

exports.trigger = function (req, res, body) {
  log.info('app > onRouteCall');
  log.info('body: ');
  log.info(body);
  var urlObj = require("url").parse(req.url, true);
  var params = urlObj.query;
  var endPoint = endPointerConverter.convert(req.url);
  var bodyParams = body && typeof body === 'string' ? JSON.parse(body) : {};

  log.info('bodyParams:');
  log.info(bodyParams);

  for (var p in bodyParams) {
    log.info('app > onRouteCall > ' + p + ' = ' + bodyParams[p]);
    params[p] = bodyParams[p];
  }

  params["path"] = urlObj.pathname.split("/");

  if (typeof params._method === "undefined") {
    params._method = req.method;
  }

  if (!endPoint || endPoint === "undefined" || !endPoint.dispatch) {
    return response.trigger(res, params, 404, "SERVICE NOT FOUND");
  }

  if (endPoint["dispatch"][params._method] === "undefined") {
    return response.trigger(res, params, 400, "WRONG METHOD " + params._method);
  }

  return endPoint["dispatch"][params._method](params,
    function (status, statusText, headers, result) {
      response.trigger(res, params, status, statusText, headers, result);
    });
};
