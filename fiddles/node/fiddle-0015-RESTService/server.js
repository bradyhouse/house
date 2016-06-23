#!/usr/bin/env node --harmony

'use strict';
const
  express = require('express'),
  app = express();

app.use(express.logger('dev'));

const config = {
  bookdb: 'http://localhost:5984/books/',
  b4db: 'http://localhost:5984/b4/'
};

require('./bin/book-search.js')(config, app);
require('./bin/field-search.js')(config, app);
require('./bin/bundle.js')(config, app);

app.listen(3000, function () {
  console.log("waiting for an '/api/:' request ...");
});
