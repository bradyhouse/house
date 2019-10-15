fiddle-0036-UnitTests
======

### Title<a name="title"></a>

Unit Tests


### Author <a name="author"></a>

bradyhouse@gmail.com


### Creation Date<a name="creation-date"></a>

09-29-2019


### Location<a name="location"></a>

Chicago, IL


### Issue<a name="issue"></a>

[Issue 301](https://github.com/bradyhouse/house/issues/301)


### Description<a name="description"></a>

Okay how do you add Behaivor Driven Development (BDD) Unit Tests-- aka Got mocha? Extend
fiddle 36 by adding some basic unit tests using mocha. Include a unit test for the DataAdapter
class that insures broken messages are re-assembled into complete JSON objects.

__Note, this fiddle adapted from the example given in Chapter 3 of Jim Wilson's book, [Node.js 8 the Right Way](http://www.pragmaticprogrammer.com/titles/jwnode2).__


### Use Case<a name="use-case"></a>

1.  Open a console and navigate to the fiddle's root directory
2.  Enter the command `npm install`
3.  Enter the command `npm test`
        
        > inheritance@0.0.0 test /Users/bradyhouse/github/house/fiddles/node/fiddle-0036-UnitTests
        > mocha

        data-adapter
            ✓ should emit a message event from a single data event
            ✓ should emit a message event from split data events
            ✓ should finish within 5 seconds (4507ms)


### Tags<a name="tags"></a>

node.js, hamony, process, argv, fs, child_process, spawn, net, createServer, connect, events,
super, mocha, assert, it, assert.deepEqual


### Forked From

[fiddle-0035-Inheritance](../fiddle-0035-Inheritance)
