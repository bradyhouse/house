var appSettings = require('application-settings');
var ObservableArray = require('data/observable-array').ObservableArray;
var Socket = require('WebSocketHarness');
var vibrate = require('nativescript-vibrate');
var messageIcons = [
  '',
  String.fromCharCode(0xE0C9),
  String.fromCharCode(0xE85A),
  String.fromCharCode(0xE0B9)
];
var messages = new ObservableArray();
var socket = new Socket();
var entry, scrollView, page;
var trackerCounter = null;

messages.on('change', trackMessages);
messages.push({from: 0, message: 'Welcome to Chat'});

socket.on('message', function (evt) {
  newMessage({from: evt.from, message: evt.data});
});


function trackMessages(evt) {
  if (evt && evt.action && evt.action !== 'add') {
    return;
  }
  while (messages.length > 40) {
    messages.shift();
  }
  if (trackerCounter || !scrollView) {
    return;
  }
  trackerCounter = setTimeout(resetMessageDisplay, 1);
}

function resetMessageDisplay() {
  trackerCounter = null;
  var offset = scrollView.scrollableHeight;
  scrollView.scrollToVerticalOffset(offset, false);
}

function showDialog(force) {
  if (!appSettings.getBoolean('setup', false) || force === true) {
    page.showModal('settings', '', function () {
      socket.setHost(appSettings.getString('server'));
      socket.setName(appSettings.getString('name'));
    })
  } else {
    socket.setHost(appSettings.getString('server'));
    socket.setName(appSettings.getString('name'));
  }
}

function newMessage(msg) {
  if (msg.from < 3) {
    msg.iconLeft = messageIcons[msg.from];
  } else {
    msg.iconRight = messageIcons[msg.from];
  }
  messages.push(msg);
  if (msg.from !== 1) {
    vibrate.vibration(100);
  }
}

function sendMessage(m) {
  socket.send(m);
}

exports.pageLoaded = function (args) {
  page = args.object;
  entry = page.getViewById('entry');
  scrollView = page.getViewById('scroller');
  page.bindingContext = {messages: messages};
};

exports.navigatedTo = function (args) {
  if (!page) {
    page = args.object;
  }
  showDialog();
  trackerCounter = setTimeout(resetMessageDisplay, 1);
};

exports.settingsTap = function () {
  showDialog(true);
};

exports.goTap = function () {
  if (entry.text.length > 0) {
    var data = {from: 1, message: entry.text};
    entry.text = '';
    newMessage(data);
    sendMessage(data.message);
  }
};
