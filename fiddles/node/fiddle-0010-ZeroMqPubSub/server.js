#!/usr/bin/env node --harmony

"use strict";

const fs = require('fs'),
    zmq = require('zmq'),
    publisher = zmq.socket('pub'),
    filename = process.argv[2];

if (!filename) {
    throw Error('No target filename was specified');
}

fs.watch(filename, function() {
    publisher.send(JSON.stringify({
        type: 'changed',
        file: filename,
        timestamp: Date.now()
    }));
});

publisher.bind('tcp://*:5432', function(err) {
    console.log('listening for zmq subscribers...');
});

