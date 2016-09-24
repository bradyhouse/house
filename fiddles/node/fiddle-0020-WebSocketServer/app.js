#!/usr/bin/env node --harmony


// Our Requires
var http = require('http');
var WebSocketServer = require('ws').Server;
var fs = require('fs');
var path = require('path');


// Settings
var port = 3000;                // What port to run on
var keepMessages = 10;          // How many old messages do we want queued
var keepHTTPSessions = 5000;    // How many ms to keep the HTTP session alive
var debugMode = false;          // Debug Mode will automagiclly randomly disconnect or terminate http sessions.


// Global Variables
var clientId = 0;
var httpClients = [];
var msgStack = [];

// Used in debugMode === true
var msgCount = 0;
var terminate = false;


// Startup and read the Error 404 Page...
var error404 = fs.readFileSync("./public/404.htm");
function send404(response) {
  response.writeHead(404, {'Content-Length': error404.length, 'Content-Type': 'text/html'});
  response.write(error404);
  response.end();
}

// Send any important settings to the client; this is actually not very important as the client already know the port; but this shows how to do it
function sendSettings(response) {
  var js = "var settings = {port: " + port + "};";
  response.writeHead(200, {'Content-Length': js.length, 'Content-Type': 'text/javascript'});
  response.write(js);
  response.end();
}

// We scan the http client list for any clients that are old and delete them.  No reason to keep any clients around if they are gone...+
function cleanupHTTPClients() {
  i = httpClients.length - 1;
  while (i >= 0) {
    if (httpClients[i].timeStamp < (Date.now() - keepHTTPSessions)) {
      httpClients.splice(i, 1);
    }
    i--;
  }
}
setInterval(cleanupHTTPClients, 1000);


/**
 * Create a new HTTP Server to handle the requests
 */
var server = http.createServer(function (req, resp) {
  if (req.url === "/" || req.url === "") {
    req.url = "/index.htm";
  }

  if (req.url === "/settings.js") {
    sendSettings(resp);
    return;
  }

  if (req.url.indexOf("/direct/") === 0) {
    var cId = getClientId(req.url);
    if (req.url.indexOf("/direct/get/") === 0) {
      sendClientInfo(cId, resp);
      return;
    } else {
      var data = "";
      req.on('data', function (chunk) {
        data += chunk;
      });
      req.on('end', function () {
        if (data.length > 0) {
          var ndata = {};
          try {
            ndata = JSON.parse(decodeURI(data));
          }
          catch (err) {
            console.error(err);
          }
          if (ndata.from && ndata.message) {
            if (ndata.from.toUpperCase() === "SERVER" || ndata.from.toUpperCase() === "ME") {
              ndata.from = "A Silly User!";
            }
            broadcast(cId, ndata);
          }
        }
        sendClientInfo(cId, resp);
      });
    }
    return;
  }

  if (req.method === 'GET') {
    var np = path.resolve("./public" + req.url);
    if (np.indexOf(__dirname) !== 0) {
      send404(resp);
      return;
    }
    fs.exists("./public" + req.url, function (exists) {
      if (!exists) {
        send404(resp);
      } else {
        fs.readFile("./public" + req.url, function (err, buffer) {
          if (err) {
            console.log("Error", err);
            send404(resp);
            return;
          }
          var ct = "text/plain";
          var lastIndex = req.url.lastIndexOf(".");
          if (lastIndex) {
            var last = req.url.substring(lastIndex);

            if (last === ".css") {
              ct = "text/css";
            } else if (last === ".htm") {
              ct = "text/html";
            } else if (last === ".js") {
              ct = "text/javascript";
            } else if (last === '.pdf') {
              ct = 'application/octet-stream';
            } else if (last === '.jpg') {
              ct = "image/jpeg";
            } else if (last === ".png") {
              ct = "image/png";
            }
          }

          resp.writeHead(200, {"Content-Length": buffer.length, 'Content-Type': ct});
          resp.write(buffer);
          resp.end();
        });
      }
    });
  } else {
    send404(resp);
  }
});

server.listen(port, function () {

  var os = require('os');
  var ifaces = os.networkInterfaces();

  Object.keys(ifaces).forEach(function (ifname) {
    var alias = 0;

    ifaces[ifname].forEach(function (iface) {
      if ('IPv4' !== iface.family) {
        return;
      }

      if (alias >= 1) {
        // this single interface has multiple ipv4 addresses
        console.log(ifname + ':' + alias, iface.address);
      } else {
        // this interface has only one ipv4 adress
        console.log(ifname, iface.address);
      }
    });
  });
  console.log("Listening on port", port);
});

server.broadcast = function (clientId, data) {
  for (var i = 0; i < httpClients.length; i++) {
    if (httpClients[i].clientId === clientId) {
      var nm = {from: "ME", message: data.message};
      httpClients[i].messages.push(nm);
    } else {
      httpClients[i].messages.push(data);
    }
  }

};

function getClientId(req) {
  var cId = null;
  var rId = req.indexOf("?clientId=");
  if (rId > 0) {
    cId = parseInt(req.substring(rId + 10), 10);
    if (isNaN(cId)) cId = null;
  }
  return cId;
}

function sendClientInfo(currentClientId, response) {
  if (!currentClientId) {
    currentClientId = (++clientId);
  }
  for (var i = 0; i < httpClients.length; i++) {
    if (httpClients[i].clientId === currentClientId) {
      httpClients[i].timeStamp = Date.now();
      handleClient(httpClients[i], response);
      return;
    }
  }
  var data = {clientId: currentClientId, messages: msgStack.slice(), timeStamp: Date.now()};
  data.messages.unshift({from: "SERVER", message: "Welcome to NativeScript CC Server"});
  httpClients.push(data);
  handleClient(data, response);
}

function handleClient(data, response) {
  var messages = JSON.stringify(data);
  messages = messages.replace(/[\u0080-\uFFFF]/g, '');
  data.messages = [];
  response.writeHead(200, {'Content-Length': messages.length, 'Content-Type': 'application/json'});
  response.write(messages);
  response.end();
}

function broadcast(clientId, data) {
  msgStack.push(data);
  wss.broadcast(clientId, data);
  server.broadcast(clientId, data);
  if (msgStack.length > keepMessages) {
    msgStack.shift();
  }
}

var wss = new WebSocketServer({
  server: server,
  perMessageDeflate: false,
  handleProtocols: function (list, done) {
    if (list.length === 1 && list[0].indexOf(' ') > 0) {
      var spaceList = list[0].split(' ');
      if (spaceList.length > 0) {
        list = spaceList;
      }
    }

    console.log("Got Protocols", list, "returning", list[1] || list[0]);
    if (list.length === 0 || (list.length === 1 && list[0] === '')) {
      done(true);
    } else {
      done(true, list[1] || list[0]);
    }
  }
});

wss.broadcast = function broadcast(clientId, data) {
  wss.clients.forEach(function each(client) {
    if (clientId === client.clientId) {
      var meMsg = {from: "ME", message: data.message};
      client.send(JSON.stringify(meMsg));
    } else {
      client.send(JSON.stringify(data));
    }
  });
};

if (debugMode === true) {
  var buffer = new ArrayBuffer(10000);
  var int8View = new Uint8Array(buffer);
  console.log("Buffer size: ", int8View.length, buffer.byteLength);
  for (var i = 0; i < int8View.length; i++) {
    int8View[i] = (i % 127) * 2;
  }
}


wss.on('connection', function (ws) {
  clientId++;
  ws.clientId = clientId;
  ws.send(JSON.stringify({command: 'setClient', clientId: clientId}));

  ws.on('message', function incoming(message, flags) {
    if (flags.binary) {
      console.log("Got Binary Payload", message.length, Array.isArray(message));

      var bad = 0;
      for (var i = 0; i < int8View.length; i++) {
        if (int8View[i] !== message[i]) {
          console.log("MisMatch at ", i, int8View[i], '!=', message[i]);
          bad++;
        }
      }
      if (bad === 0) {
        console.log("Buffer Matches");
      } else {
        console.log("Buffer doesn't match by", bad);
      }
    } else {
      try {
        var msg = JSON.parse(message);
      } catch (Err) {
        console.error("Unable to parse", message);
      }
      if (!msg || !(msg.command || msg.from)) {
        console.log("Bad Message", message);
        return;
      }

      if (msg && msg.command) {
        if (msg.command === "setClient") {
          ws.clientId = msg.clientId;
        }
      } else {
        if (msg.from.toUpperCase() === "SERVER" || msg.from.toUpperCase() === "ME") {
          msg.from = "A Silly User";
        }
        msg.from = msg.from + " " + ws.clientId;
        broadcast(ws.clientId, msg);
      }
    }

    msgCount++;
    if (msgCount >= 5 && debugMode === true) {
      msgCount = 0;
      terminate = !terminate;
      if (terminate) {
        console.log("Terminating Client", ws.clientId);
        ws.terminate();
      } else {
        console.log("Closing Client", ws.clientId);
        ws.close();
      }
    }
  });

  ws.on('close', function close() {
    console.log('disconnected from ', this.clientId);
  });

  console.log("Sending Greeting");
  ws.send(JSON.stringify({from: "SERVER", message: "Welcome to Android/IOS Chatter"}));

  if (debugMode === true) {
    console.log("Sending Binary Buffer");
    ws.send(buffer);
  }

  console.log("Sending ", msgStack.length, "older messages");
  for (var i = 0; i < msgStack.length; i++) {
    ws.send(JSON.stringify(msgStack[i]));
  }
});

