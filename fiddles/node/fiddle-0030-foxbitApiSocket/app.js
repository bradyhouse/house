const fileSystem = require('fs'),
  WebSocket = require('ws'),
  wsAddress = 'wss://api.foxbitapi.com.br/WSGateway/',
  dateFormatter = require('moment'),
  socket = new WebSocket(wsAddress),
  message = {
    "m":0,
    "i":0,
    "n":"SubscribeLevel1",
    "o": JSON.stringify({
      "OMSId": 1, // BRL
      "InstrumentId": 1 // BRL
    })},
  fileName = 'data.json';


socket.on('message', (data) => {
  let response = data ? JSON.parse(data) : null,
      json = response && response.o ? response.o : null;
  if (json) {
    console.log(dateFormatter(new Date()).format('HH:mm:ss') + '\tmessage received.');
    console.dir(json);
    fileSystem.writeFile(fileName, json.toString(), (err) => {
      if(err) {
        return console.log(err);
      }
      console.log(dateFormatter(new Date()).format('HH:mm:ss') + '\tdata.json updated.');
    });
  }
});

socket.on('open', () => {
  console.log(dateFormatter(new Date()).format('HH:mm:ss') + '\tConnected');
  console.log(dateFormatter(new Date()).format('HH:mm:ss') + '\tSending request ...');
  socket.send(JSON.stringify(message), (err) => {
    if (err) {
      console.dir(err);
    }
  });
});





