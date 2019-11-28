#!/usr/bin/env node --harmony

"use strict";

const spawn = require('child_process').spawn,
  clear = spawn('clear'),
  reflect = spawn('cat',['app.js']);

clear.stdout.pipe(process.stdout);
reflect.stdout.pipe(process.stdout);
