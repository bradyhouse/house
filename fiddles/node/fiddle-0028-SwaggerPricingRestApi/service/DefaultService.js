'use strict';


/**
 * Intraday time series
 * Get the intraday stock price time series data.
 *
 * no response value expected for this operation
 **/
exports.intradayGET = function() {
  return new Promise(function(resolve, reject) {
    var response = {};
    response['application/json'] = [ {
    } ];
    if (Object.keys(examples).length > 0) {
      resolve(response[Object.keys(response)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Current price
 * Get the current stock price.
 *
 * no response value expected for this operation
 **/
exports.quoteGET = function() {
  return new Promise(function(resolve, reject) {
    var response = {};
    response['application/json'] = [ {
    } ];
    if (Object.keys(examples).length > 0) {
      resolve(response[Object.keys(response)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Market volume
 * Get the latest market volume.
 *
 * no response value expected for this operation
 **/
exports.volumeGET = function() {
  return new Promise(function(resolve, reject) {
    var response = {};
    response['application/json'] = [ {
    } ];
    if (Object.keys(examples).length > 0) {
      resolve(response[Object.keys(response)[0]]);
    } else {
      resolve();
    }
  });
}

