const
  http = require('http'),
  fs = require('fs'),
  path = require('path'),
  contentTypes = require('../../config/content-types'),
  endPoints = require('../../config/end-points'),
  request = require('request'),
  convert = require('xml-to-json-promise'),
  nb = require('node-beautify'),
  log = require('../../utils/log'),
  env = process.env;

exports.trigger = function (res, params, status, statusText, headers, result) {
  log.info('app > onSendResults');
  log.info('app > onSendResults > status = ' + status);
  if (typeof result === "undefined") {
    res.end();
  } else {
    if (typeof headers === "undefined") {
      log.info('app > onSendResults > headers is undefined');
      headers = {};
    } else {
      log.info('app > onSendResults > headers:');
      log.console(headers);
    }
    headers["Connection"] = "close";
    headers["Content-Type"] = "application/json";
    res.writeHead(status, statusText, headers);

    if (typeof params["callback"] !== "undefined") {
      res.end(params["callback"] + "(" + JSON.stringify(result) + ");");
    } else {
      res.end(JSON.stringify(result));
    }
  }
};
