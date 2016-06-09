#!/usr/bin/env node --harmony

'use strict';

const zmq=require('zmq'),
    filename = process.argv[2],
    requester = zmq.socket('req');

if (!filename) {
    throw Error('No request filename was specified');
}

requester.on('message', function(data) {
    console.log('Received response: ' + data);
});

requester.connect('tcp://localhost:5433');


for(let i=1; i<=3; i++) {
    console.log('Sending request #' + i + ' for ' + filename);
    requester.send(JSON.stringify({
        path: filename
    }));
}




