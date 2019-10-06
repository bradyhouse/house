#!/usr/bin/env node --harmony
'use strict';

const zmq = require('zeromq');

// Create the subscriber endpoint
const subscriber = zmq.socket('sub');

// Subscriber to all messages
subscriber.subscribe('');

// Handle messages from the publisher
subscriber.on('message', data => {
    const message = JSON.parse(data);
    const date = new Date(message.timestamp);
    console.log(`File "${message.file}" changed at ${date}`);    
});

//Connect to the publisher
subscriber.connect('tcp://localhost:60400');