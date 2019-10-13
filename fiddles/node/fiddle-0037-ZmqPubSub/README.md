fiddle-0037-ZmqPubSub
======

### Title <a name="title"></a>

ZeroMq ~ Pub/Sub Pattern


### Author <a name="author"></a>

bradyhouse@gmail.com


### Creation Date <a name="creation-date"></a>

10-03-19


### Location <a name="location"></a>

Chicago, IL


### Issue <a name="issue"></a>

[Issue 301](https://github.com/bradyhouse/house/issues/301)


### Description <a name="description"></a>

What are the building blocks of a node networking `MicroService` module? First ingredient, messaging. Time to revisit [0MQ](https://www.npmjs.com/package/zeromq). Specifically, a refresher in the pub/sub pattern is a good starting point. [Fiddle #34](../fiddle-0034-TcpSocketClient) can be rewritten (or simplified) using 0MQ to implement a pub/sub design pattern.


### Use Case<a name="use-case"></a>

1.  Open a console and navigate to the fiddle's root directory
2.  Enter the command `npm install`
3.  Enter the command `node pub.js target.txt`
4.  Open a second console and navigate to the fiddle's root directory
5.  Enter the command `node sub.js`
6.  Open a third console and navigate to the fiddle's root directory
7.  Enter the command `echo "hi mom" >> target.txt"`

![Screenshot](screenshot.png)


### Tags <a name="tags"></a>

node.js, hamony, process, argv, fs, zeromq, pub/sub
