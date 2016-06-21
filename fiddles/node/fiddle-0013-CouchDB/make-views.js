#!/usr/bin/env node --harmony

'use strict';
const
  async = require('async'),
  request = require('request'),
  views = require('./views.js');
async.waterfall([

  function (next) {
    request.get('http://localhost:5984/books/_design/books', next);
  },

  function (res, body, next) {
    if (res.statusCode === 200) {
      next(null, JSON.parse(body));
    } else if (res.statusCode === 404) {
      next(null, {views: {}});
    }
  },

  function (doc, next) {
    Object.keys(views).forEach(function (name) {
      doc.views[name] = views[name];
    });
    request({
      method: 'PUT',
      url: 'http://localhost:5984/books/_design/books',
      json: doc
    }, next);
  }
], function (err, res, body) {
  if (err) {
    throw err;
  }
  console.log(res.statusCode, body);
});

