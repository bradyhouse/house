fiddle-0015-RESTService
======

### Title

REST Service


### Creation Date

06-22-16


### Location

Chicago, IL


### Issue

[Issue 37](https://github.com/bradyhouse/house/issues/37)


### Description

This POC explores how to create a REST Service using [express](https://www.npmjs.com/package/express) and [couchDB](https://couchdb.apache.org/). 
The scripts developed in this POC are based on the web-service examples presented in chapter 5 of [Node.js the Right Way](https://pragprog.com/book/jwnode/node-js-the-right-way).


### Procedure

1.  Complete the steps outlined in node [fiddle #13](../fiddle-0013-CouchDB)
2.  Using a secondary terminal startup couchdb `couchdb`
    
        {error_logger,{{2016,6,21},{10,15,20}},std_error,"File operation error: eacces. Target: /.MacOSX/ebin. Function: read_file_info. Process: code_server."}
        
        =ERROR REPORT==== 21-Jun-2016::05:15:20 ===
        File operation error: eacces. Target: /.MacOSX/ebin. Function: read_file_info. Process: code_server.
        Apache CouchDB 1.6.1 (LogLevel=info) is starting.
        Apache CouchDB has started. Time to relax.
        [info] [<0.31.0>] Apache CouchDB has started on http://127.0.0.1:5984/
    
3.  Install project dependencies `npm install`
4.  Using another secondary terminal startup the rest service `npm start`
        
        ➜  fiddle-0015-RESTService git:(master) ✗ npm start
        
        > fiddle-0015-RESTService@0.0.0 start /Users/e13542/github/house/fiddles/node/fiddle-0015-RESTService
        > node --harmony server.js
        
        waiting for an '/api/:' request ...
        
5.  Use `curl` to create a new bundle called "War Books"

        curl -X POST http://localhost:3000/api/bundle?name=War%20Books
        
        {
          "ok": true,
          "id": "200082517926f53ca3a1f5f96e0005e7",
          "rev": "1-d90a9d2a08880d9f29e6fa4515702d50"
        }

6.  Use `curl` to add a book to the bundle. Substitute the id from above (5)

        curl -X PUT http://localhost:3000/api/bundle/200082517926f53ca3a1f5f96e0005e7/book/132
        
        {
          "ok": true,
          "id": "200082517926f53ca3a1f5f96e0005e7",
          "rev": "2-58aad9ea25605877e3f4dc562a368fce"
        }

7.  Use `curl` to view the contents of the bundle. Again, substitute the id from above (5,6)

        curl http://localhost:3000/api/bundle/200082517926f53ca3a1f5f96e0005e7
        
        {
          "_id": "200082517926f53ca3a1f5f96e0005e7",
          "_rev": "2-58aad9ea25605877e3f4dc562a368fce",
          "type": "bundle",
          "name": "War Books",
          "books": {
            "132": "The Art of War"
          }
        }

        
### Published Version Link

N/A


### Tags

node.js, hamony, [nodemon](https://www.npmjs.com/package/nodemon), [express](https://www.npmjs.com/package/express), [request](https://www.npmjs.com/package/request), [q](https://www.npmjs.com/package/q)
