"use strict";

var WS = require('nativescript-websockets');
var WebSocketHarness = function () {
  this._host = null;
  this._backoff = 100;
  this._timeoutId = null;
  this._clientId = null;
  this._from = "Unknown_" + Math.floor(Math.random() * 100000);
  this._messageHandler = [];
  this._websocket = null;
  this._errorCount = 0;
};

WebSocketHarness.prototype.setHost = function (host) {
  this._host = "ws://" + host;
  if (this._websocket && this._websocket.isOpen()) {
    this._websocket.close();
  }
  this._openSocket();
};

WebSocketHarness.prototype.getHost = function () {
  return this._host.substr(5);
};

WebSocketHarness.prototype.setName = function (name) {
  this._from = name;
};

WebSocketHarness.prototype.getName = function () {
  return this._from;
};

WebSocketHarness.prototype.send = function (msg) {
  if (!this._websocket) {
    return;
  }
  var message = {from: this._from, message: msg};

  if (this._clientId) {
    message.clientId = this._clientId;
  }
  this._websocket.send(JSON.stringify(message));
};

WebSocketHarness.prototype.on = function (eventName, fun) {
  this._messageHandler.push(fun);
};

WebSocketHarness.prototype._openSocket = function () {
  var self = this;

  var retryConnection = function () {
    if (self._timeoutId) {
      return;
    }

    self._timeoutId = setTimeout(function () {
      self._timeoutId = null;
      self._websocket.open();
    }, self._backoff);

    self._backoff += Math.floor(Math.random() * 1000);

    if (self._backoff > 10000) {
      self._backoff = 10000;
    }
  };

  this._websocket = new WS(this._host);

  this._websocket.on('message', function (socket, msg) {
    self._handler(msg);
  });

  this._websocket.on('open', function () {
    self._errorCount = 0;
    self._backoff = 100;
  });

  this._websocket.on('error', function (socket, msg) {
    console.log("**** ERROR", msg);
    self._errorCount++;
    if (self._errorCount === 1) {
      self._handleMessages({from: 2, data: msg});
    }
  });

  this._websocket.on('close', function (socket, code) {
    if (self._websocket === socket && code !== 1000) {
      retryConnection();
    }
  });

  this._websocket.open();
};

WebSocketHarness.prototype._handler = function (result) {
  if (!result || !result.length) {
    return;
  }

  var data = {};
  if (result.length > 0) {
    try {
      data = JSON.parse(result);
    }
    catch (e) {
    }
  }

  if (data && data.command) {
    switch (data.command) {
      case "setClient":
        this._clientId = data.clientId;
        break;
    }
    return;
  }

  if (data.from === "ME") {
    return;
  }

  var from = 3;
  if (data.from === "SERVER") {
    from = 2;
  } else {
    data.message = data.from + ": " + data.message;
  }

  this._handleMessages({from: from, data: data.message});
};

WebSocketHarness.prototype._handleMessages = function (msg) {
  for (var i = 0; i < this._messageHandler.length; i++) {
    this._messageHandler[i](msg);
  }
};

module.exports = WebSocketHarness;
