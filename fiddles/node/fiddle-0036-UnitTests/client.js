'use strict';
const net = require('net').connect({port: 1841});
const dataAdapter = require('./data-adapter').connect(net);

let lastMessage = null;

dataAdapter.on('message', message => {
  if (lastMessage !== JSON.stringify(message)) {
    lastMessage = JSON.stringify(message);
    if (message.type === 'watching') {
      console.log(`Now watching: ${message.file}`);
    } else if (message.type === 'changed') {
      const date = new Date(message.timestamp);
      console.log(`File changed: ${date}`);
    } else {
      console.log(`Unrecognized message type: ${message.type}`);
    }
  }
});