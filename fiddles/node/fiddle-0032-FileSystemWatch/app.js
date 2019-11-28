#!/usr/bin/env node --harmony

"use strict";

let fileName = 'file.txt';

// region Process

if (process.argv[2]) {
  fileName = process.argv[2];
}

// endregion

// region Child Process

const spawn = require('child_process').spawn,
  touch = spawn('touch',[fileName]);

touch.stdout.pipe(process.stdout);

// endregion

// region File System

const fs = require('fs');

fs.watch(fileName, () => {

  const ls = spawn('ls', ['-l','-h']);

  let output = '';

 ls.stdout.on('data', chunk => output += chunk);

 ls.on('close', () => {
   console.log(output);
 });

});

console.log('Now watching ' + fileName + ' for changes ...');

// endregion





