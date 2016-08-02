#!/usr/bin/env node --harmony

"use strict";

var xml2json = require('xml-to-json')

xml2json({
  input: './storm-clouds.xml',
  output: './storm-clouds.json'
}, function(err, result) {

  if(err) {
    console.error(err);
  } else {
    console.log(result);
  }

});
