#!/usr/bin/env node --harmony

"use strict";

var xml2json = require('xml-to-json')

xml2json({
  input: './input.xml',
  output: './output.json'
}, function (err, result) {
  if (err) {
    console.error(err);
  } else {
    console.log('output.json generated.');
  }
});
