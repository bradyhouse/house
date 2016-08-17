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

        npm WARN package.json fiddle@0.1.0 No repository field.
        npm WARN package.json fiddle@0.1.0 No license field.
        q@0.9.7 node_modules/q

        npmlog@0.0.4 node_modules/npmlog
        └── ansi@0.1.2

        passport@0.1.18 node_modules/passport
        ├── pause@0.0.1
        └── pkginfo@0.2.3

        redis@0.8.6 node_modules/redis

        connect-redis@1.4.7 node_modules/connect-redis
        ├── debug@2.2.0 (ms@0.7.1)
        └── redis@0.10.3

        passport-google-oauth20@1.0.0 node_modules/passport-google-oauth20
        └── passport-oauth2@1.3.0 (uid2@0.0.3, passport-strategy@1.0.0, oauth@0.9.14)

        request@2.27.0 node_modules/request
        ├── aws-sign@0.3.0
        ├── tunnel-agent@0.3.0
        ├── forever-agent@0.5.2
        ├── qs@0.6.6
        ├── oauth-sign@0.3.0
        ├── mime@1.2.11
        ├── cookie-jar@0.3.0
        ├── json-stringify-safe@5.0.1
        ├── node-uuid@1.4.7
        ├── http-signature@0.10.1 (assert-plus@0.1.5, ctype@0.5.3, asn1@0.1.11)
        ├── form-data@0.1.4 (async@0.9.2, combined-stream@0.0.7)
        └── hawk@1.0.0 (cryptiles@0.2.2, boom@0.4.2, sntp@0.2.4, hoek@0.9.1)

        express@3.3.8 node_modules/express
        ├── methods@0.0.1
        ├── fresh@0.2.0
        ├── range-parser@0.0.4
        ├── cookie-signature@1.0.1
        ├── buffer-crc32@0.2.1
        ├── cookie@0.1.0
        ├── commander@1.2.0 (keypress@0.1.0)
        ├── mkdirp@0.3.5
        ├── send@0.1.4 (mime@1.2.11)
        ├── debug@2.2.0 (ms@0.7.1)
        └── connect@2.8.8 (uid2@0.0.2, qs@0.6.5, pause@0.0.1, bytes@0.2.0, formidable@1.0.14)

2.  Install bower dependencies `bower install`

        bower not-cached    https://github.com/jharding/typeahead.js-bootstrap.css.git#*
        bower resolve       https://github.com/jharding/typeahead.js-bootstrap.css.git#*
        bower cached        https://github.com/twbs/bootstrap.git#3.0.3
        bower validate      3.0.3 against https://github.com/twbs/bootstrap.git#~3.0.0
        bower cached        https://github.com/components/handlebars.js.git#1.0.0
        bower validate      1.0.0 against https://github.com/components/handlebars.js.git#~1.0.0
        bower cached        https://github.com/jquery/jquery-dist.git#1.9.1
        bower validate      1.9.1 against https://github.com/jquery/jquery-dist.git#~1.9.0
        bower cached        https://github.com/twitter/typeahead.js.git#0.9.3
        bower validate      0.9.3 against https://github.com/twitter/typeahead.js.git#~0.9.3
        bower checkout      typeahead.js-bootstrap.css#master
        bower invalid-meta  typeahead.js-bootstrap.css is missing "main" entry in bower.json
        bower invalid-meta  typeahead.js-bootstrap.css is missing "ignore" entry in bower.json
        bower resolved      https://github.com/jharding/typeahead.js-bootstrap.css.git#048ea47176
        bower install       handlebars#1.0.0
        bower install       jquery#1.9.1
        bower install       typeahead.js#0.9.3
        bower install       typeahead.js-bootstrap.css#048ea47176
        bower install       bootstrap#3.0.3

        handlebars#1.0.0 bower_components/handlebars

        jquery#1.9.1 bower_components/jquery

        typeahead.js#0.9.3 bower_components/typeahead.js
        └── jquery#1.9.1

        typeahead.js-bootstrap.css#048ea47176 bower_components/typeahead.js-bootstrap.css

        bootstrap#3.0.3 bower_components/bootstrap
        └── jquery#1.9.1


        ┌──────────────────────────────────────────┐
        │ Update available: 1.7.9 (current: 1.7.7) │
        │ Run npm install -g bower to update.      │
        └──────────────────────────────────────────┘

3.  Update the top of the [server.js](server.js) with the `{google client id}` and `{google secret key}`
4.  Startup the app `npm start`
5.  Open a browser and navigate to http://localhost:3000


### DISCLAIMER

This fiddle is incomplete. I spent 2-3 weekends playing with this thing and could not get all the pieces to work
correctly based on the steps outlined in [Node.js the Right Way](https://pragprog.com/book/jwnode/node-js-the-right-way).
The actual example is out of date. Google no-longer supports OpenID 2. The [passport-google](https://www.npmjs.com/package/passport-google) express plugin
is no longer functional. I attempted to rewrite the example using [passport-google-oauth](https://www.npmjs.com/package/passport-google-oauth) instead.  However, this
was not a simple fit. That said, I am keeping this POC in my collection because I learned some stuff along the
way.

### Published Version Link

N/A


### Tags

node.js, bower, hamony, jquery, bootstrap, typeahead, handlebars, passport-google-oauth
