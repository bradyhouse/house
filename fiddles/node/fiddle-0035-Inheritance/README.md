fiddle-0035-Inheritance
======

### Title<a name="title"></a>

Inheritance


### Author <a name="author"></a>

bradyhouse@gmail.com


### Creation Date<a name="creation-date"></a>

09-29-2019


### Location<a name="location"></a>

Chicago, IL


### Issue<a name="issue"></a>

[Issue 301](https://github.com/bradyhouse/house/issues/301)


### Description<a name="description"></a>

How do you extend an existing node.js module? For instance, say I wanted to change how the [EventEmitter](https://nodejs.org/api/events.html#events_class_eventemitter) class works. This fiddle extends the [socket client fiddle](https://github.com/bradyhouse/house/tree/master/fiddles/node/fiddle-0034-TcpSocketClient).  Specifically, it introduces an extended version of the EventEmitter class to prevent broken messages from the [server.js](server.js) script. To test the new client logic, the [test-server.js](test-server.js) script is added. This script sends
a broken json message to subscribers upon connection.


### Use Case<a name="use-case"></a>

1.  Open a console and navigate to the fiddle's root directory
2.  Enter the command `npm start.server`
3.  Open a second console and navigate to the fiddle's root directory
4.  Enter the command `npm start.client`
5.  Open a third console and navigate to the fiddle's root directory
6.  Enter the command `echo "ping" >> file.txt`
3.  This should produce the following output in the second console (upper right)

![Screenshot](screenshot.png)
    

### Tags<a name="tags"></a>

node.js, hamony, process, argv, fs, child_process, spawn, net, createServer, connect, events,
super


### Forked From

[fiddle-0034-TcpSocketClient](../fiddle-0034-TcpSocketClient)
