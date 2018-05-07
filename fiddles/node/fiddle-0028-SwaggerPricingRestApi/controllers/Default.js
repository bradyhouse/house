'use strict';

var utils = require('../utils/writer.js');
var Default = require('../service/DefaultService');

module.exports.intradayGET = function intradayGET (req, res, next) {
  Default.intradayGET()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.quoteGET = function quoteGET (req, res, next) {
  Default.quoteGET()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.volumeGET = function volumeGET (req, res, next) {
  Default.volumeGET()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
