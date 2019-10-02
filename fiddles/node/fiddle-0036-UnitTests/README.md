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


### Use Case<a name="use-case"></a>

1.  Open a console and navigate to the fiddle's root directory
2.  Enter the command `npm install`
3.  Enter the command `npm test`

        ➜  fiddle-0036-UnitTests git:(313_node_31to40) ✗ npm test

        > inheritance@0.0.0 test /Users/bradyhouse/github/house_301/fiddles/node/fiddle-0036-UnitTests
        > mocha

        data-adapter
            ✓ should emit a message event from a single data event
            ✓ should emit a message event from split data events


        2 passing (13ms)


### Tags<a name="tags"></a>

node.js, hamony, process, argv, fs, child_process, spawn, net, createServer, connect, events,
super, mocha, assert, it, assert.deepEqual


### Forked From

[fiddle-0035-Inheritance](../fiddle-0035-Inheritance)
