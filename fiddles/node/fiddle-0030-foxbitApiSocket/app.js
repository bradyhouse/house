const fileSystem = require('fs'),
  WebSocket = require('ws'),
  jsonFormatter = require('prettify-js'),
  wsAddress = 'wss://api.foxbitapi.com.br/WSGateway/',
  dateFormatter = require('moment'),
  socket = new WebSocket(wsAddress),
  request = JSON.parse(fileSystem.readFileSync('level1-request.json', 'utf8')),
  response = 'level1-response.json';


//region On Socket Open
socket.on('open', () => {
  console.log(dateFormatter(new Date()).format('HH:mm:ss') + '\tConnected');
  console.log(dateFormatter(new Date()).format('HH:mm:ss') + '\tSending request ...');
  console.dir(request);
  socket.send(jsonFormatter(JSON.stringify(request)), (err) => {
    if (err) {
      console.dir(err);
    }
  });
});
//endregion

//region On Socket Response
socket.on('message', (data) => {
  let dataObj = data ? JSON.parse(data) : null,
      json = dataObj && dataObj.o ? dataObj.o : null;
  if (json) {
    console.log(dateFormatter(new Date()).format('HH:mm:ss') + '\tmessage received.');
    console.dir(json);
    fileSystem.writeFile(response, json.toString(), (err) => {
      if(err) {
        return console.log(err);
      }
      console.log(dateFormatter(new Date()).format('HH:mm:ss') + '\t' + response + ' updated.');
    });
  }
});
//endregion





