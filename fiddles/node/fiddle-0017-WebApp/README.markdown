fiddle-0017-WebApp
======

### Title

Node Single Page App


### Creation Date

07-16-16


### Location

Chicago, IL


### Issue

[Issue 46](https://github.com/bradyhouse/house/issues/46)


### Description

This POC explores how to build a single page app using node. It based on the `b4` example
discussed at the end of [Node.js the Right Way](https://pragprog.com/book/jwnode/node-js-the-right-way).  Alternately for more info regarding this book,
checkout [http://www.pragmaticprogrammer.com/titles/jwnode](http://www.pragmaticprogrammer.com/titles/jwnode).

### Pre-Requisite Procedure

1.  Install/setup couchdb and create and populate the books table (See [Node Fiddles > #13](../fiddle-0013-CouchDB))
2.  Startup couchdb using a secondary thread `nohup couchdb &`
3.  Install redis (See [Node Fiddle #16](../fiddle-0016-Redis))
4.  To add redis-server and redis-cli to your PATH, append the following entries to your .bashrc and .bash_profile files:

              # redis-server
              export REDIS_SERVER=/usr/local/Cellar/redis/3.2.0/bin/redis-server
              export PATH=$REDIS_SERVER:$PATH
              # redis-cli
              export REDIS_CLI=/usr/local/Cellar/redis/3.2.0/bin/redis-cli
              export PATH=$REDIS_CLI:$PATH

5.  Startup redis-server using a secondary thread `nohup redis-server &`

### Procedure

1.  Install node dependencies `npm install`
2.  Install bower dependencies `bower install`
3.  Startup the app `npm start`
4.  Open a browser and navigate to http://localhost:3000

### Published Version Link

N/A


### Tags

node.js, hamony, jquery, bootstrap, typeahead, handlebars
