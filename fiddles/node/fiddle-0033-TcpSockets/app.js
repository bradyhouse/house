#!/usr/bin/env node --harmony

"use strict";

const fs = require('fs');
const net = require('net');
const spawn = require('child_process').spawn;
const fileName = process.argv[2] || 'file.txt';
const touch = spawn('touch', [fileName]);

// region Create Watch File

touch.stdout.pipe(process.stdout);

// endregion

// region Create TCP Socket Server

net.createServer(connection => {

  // region Reporting

  console.log('subscriber connected');
  connection.write('Now watching "'+ fileName +'" for changes...\n');

  // endregion

  // region Watcher setup

  const watcher =
    fs.watch(fileName, () => connection.write(
      'file changed: ' + new Date() + '\n'));

  // endregion

  // region Cleanup

  connection.on('close', () => {
    console.log('subscriber disconnected.');
    watcher.close();
  });

  // endregion

}).listen(1841, () => {
  console.log('TCP server started');
});

// endregion

