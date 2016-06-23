fiddle-0013-CouchDB
======

### Title

CouchDB ~ _Hello world_


### Creation Date

06-19-16


### Location

Chicago, IL


### Issue

[Issue 34](https://github.com/bradyhouse/house/issues/34)


### Description

_Where in the world does all the npm metadata reside???_  [couchDB](https://couchdb.apache.org/).  This POC explores 
how to create, populate and query an instance of couchDB. The scripts developed in this POC are based on the couchDB 
scripts presented in chapter 5 of [Node.js the Right Way](https://pragprog.com/book/jwnode/node-js-the-right-way).


### Procedure

1.  Install couchDb using `brew install couchdb`
2.  Using a secondary terminal startup couchdb `couchdb`
    
        {error_logger,{{2016,6,21},{10,15,20}},std_error,"File operation error: eacces. Target: /.MacOSX/ebin. Function: read_file_info. Process: code_server."}
        
        =ERROR REPORT==== 21-Jun-2016::05:15:20 ===
        File operation error: eacces. Target: /.MacOSX/ebin. Function: read_file_info. Process: code_server.
        Apache CouchDB 1.6.1 (LogLevel=info) is starting.
        Apache CouchDB has started. Time to relax.
        [info] [<0.31.0>] Apache CouchDB has started on http://127.0.0.1:5984/
    
3.  Install node dependencies `npm install`
4.  Download Project Gutenberg Data `curl -O http://www.gutenberg.org/cache/epub/feeds/rdf-files.tar.bz2`
5.  Untar the file `tar -xvjf rdf-files.tar.bz2`
6.  Create books table `./create-db.js 'books'`
7.  Add views `./make-views.js`
8.  Import the gutenberg data `./import-books.js`
9.  Query the books table directly `./db-cli.js GET books/1`
10. Get a list of all authors `./db-cli.js GET books/_design/books/_view/authors`
11. Get a list of all subjects `./db-cli.js GET books/_design/books/_view/subjects`


### Published Version Link

N/A


### Tags

node.js, hamony, process, argv, [request](https://www.npmjs.com/package/request), curl, tar, [cheerio](https://www.npmjs.com/package/cheerio), fs, module, exports, [file](https://www.npmjs.com/package/file), [async](https://www.npmjs.com/package/async)
