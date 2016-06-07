#!/usr/bin/env node --harmony

"use strict";

const net = require('net'),
    server = net.createServer(function(connection) {
        console.log('Subscriber connected');
        // send chunk 1
        connection.write('{"type": "changed", "file": "file');
        // wait a second and send the rest
        let timer = setTimeout(function() {
            connection.write('.txt", "timestamp": 1358175758495 }' + "\n");
            connection.end();
        }, 1000);
        connection.on('end', function() {
            clearTimeout(timer);
            console.log('Subscriber disconnected');
        });
    });

server.listen(5432, function() {
    console.log('server.js: listening for subscribers...');
});