fiddle-0038-ZmqReqRep
======

### Title <a name="title"></a>

ZeroMq ~ Request / Reply Pattern


### Author <a name="author"></a>

bradyhouse@gmail.com


### Creation Date <a name="creation-date"></a>

10-06-19


### Location <a name="location"></a>

Chicago, IL


### Issue <a name="issue"></a>

[Issue 301](https://github.com/bradyhouse/house/issues/301)


### Description <a name="description"></a>

What are the building blocks of a node networking `MicroService` module?  [Fiddle #37](../fiddle-0037-ZmqReqRep) demonstrates how to implement a simple pub/sub design pattern using [0MQ](https://www.npmjs.com/package/zeromq).  Another important pattern to know when building a node based networking `MicroService` is the `Request & Reply` pattern. This fiddle demonstrates how this can be implemented using [0MQ](https://www.npmjs.com/package/zeromq).

__Note, this fiddle adapted from the example given in Chapter 4 of Jim Wilson's book, [Node.js 8 the Right Way](http://www.pragmaticprogrammer.com/titles/jwnode2).__


### Use Case<a name="use-case"></a>

1.  Open a console and navigate to the fiddle's root directory
2.  Enter the command `npm install`
3.  Enter the command `node rep.js`
4.  Open a second console and navigate to the fiddle's root directory
5.  Enter the command `node req.js`

![Screenshot](screenshot.png)


### Tags <a name="tags"></a>

node.js, hamony, process, argv, fs, zeromq, req/rep


### Forked From

[fiddle-0037-MicroService](../fiddle-0037-MicroService)
