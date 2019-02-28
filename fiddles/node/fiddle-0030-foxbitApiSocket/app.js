const fileSystem = require('fs'),
  WebSocket = require('ws'),
  log = require('npmlog'),
  wsAddress = 'wss://api.foxbitapi.com.br/WSGateway/',
  dateFormatter = require('moment'),
  socket = new WebSocket(wsAddress),
  request = fileSystem.readFileSync('level1-request.json', 'utf8'),
  response = 'level1-response.json';


//region event handlers

function onOpen() {
  log.info(dateFormatter(new Date()).format('HH:mm:ss'),'connected to:\t' + wsAddress);
  log.info(dateFormatter(new Date()).format('HH:mm:ss'),'sending request:\t' + request.trim());
  socket.send(request, (err) => {
    if (err) {
      throw err;
    }
  });
}

function onMessage(data) {
  let dataObj = data ? JSON.parse(data) : null,
    json = dataObj && dataObj.o ? dataObj.o : null;
  if (json) {
    log.info(dateFormatter(new Date()).format('HH:mm:ss'),'message received:\t' + json.slice(0, 100).trim() + ' ...');
    fileSystem.writeFile(response, json, (err) => {
      if(err) {
        throw err;
      }
    });
  }
}

//endregion

// region main block

try {
  console.clear();
  log.info(dateFormatter(new Date()).format('HH:mm:ss'), '{{ ʕ・ɭ・ʔ }} - node fiddle #30');
  socket.on('open', () => onOpen());
  socket.on('message', (data) => onMessage(data));

}
catch(err) {
  log.error(dateFormatter(new Date()).format('HH:mm:ss'), err.toString());
}

// endregion










