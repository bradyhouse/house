#!/usr/bin/env node --harmony
'use strict';

const fs = require('fs');
const zmq = require('zeromq');
const filename = process.argv[2];

const responder = zmq.socket('rep');

// Handle incoming requests
responder.on('message', data => {
  
  // Parse the incoming message
  const request = JSON.parse(data);
  console.log('Received a request to get: ${request.path}');
  
  // Read the file and reply with content
  fs.readFile(request.path, (err, content) => {
    console.log('Sending response content');
    responder.send(JSON.stringify({
      content: content.toString(),
      timestamp: Date.now(),
      pid: process.pid
    }));
  });

  // Listen on TCP port 60401
  responder.bind('tcp://127.0.0.1:60401', err => {
    console.log('Listening for zmq requesters ...');
  });

  // Close the responder when the Node process ends
  process.on('SIGINT', () => {
    console.log('Shutting down...');
    responder.close();
  });

});