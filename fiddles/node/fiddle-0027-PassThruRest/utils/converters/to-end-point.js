const
  http = require('http'),
  fs = require('fs'),
  path = require('path'),
  endPoints = require('../../config/end-points'),
  request = require('request'),
  log = require('../log'),
  env = process.env;

exports.convert = function (path) {

  log.info('app > toEndPoint');

  var steps = path.split("/"),
    endPoint = null;

  if (steps.length > 1) {
    steps.map(function (step, index) {
      if (index < steps.length) {
        if (!endPoint) {
          if (step in endPoints) {
            endPoint = endPoints[step];
          }
        } else {
          if (step in endPoint) {
            endPoint = endPoint[step];
          }
        }
      }
    });
  } else {
    if (steps in endPoints) {
      endPoint = endPoints[steps];
    }
  }
  return endPoint;
};