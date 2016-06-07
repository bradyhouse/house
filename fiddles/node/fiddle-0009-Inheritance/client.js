#!/usr/bin/env node --harmony

"use strict";

const net = require('net'),
    clientBuffer = require('./client-buffer.js'),
    netClient = net.connect({port: 5432}),
    client = clientBuffer.connect(netClient);

client.on('message', function(data) {
    let message = data;
    if (message.type === 'watching') {
        console.log("Now watching: " + message.file);
    } else if (message.type === 'changed') {
        console.log("File '" + message.file + "' changed at " + new Date(message.timestamp));
    } else {
        throw Error("Unrecognized message type: " + message.type);
    }
});
