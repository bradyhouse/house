#!/usr/bin/env node --harmony

"use strict";

let sqlite3 = require('sqlite3').verbose(),
    db = new sqlite3.Database(':memory:'),
    sqlStatements = {
      createTable: 'CREATE TABLE lorem (info TEXT)',
      insert: 'INSERT INTO lorem VALUES (?)',
      select: 'SELECT rowid AS id, info FROM lorem',
      count: 'SELECT COUNT(*) as count FROM LOREM'
    }

db.serialize(() => {

  console.log(sqlStatements.createTable.toUpperCase());

  db.run(sqlStatements.createTable);

  console.log('');
  console.log(sqlStatements.insert.toUpperCase());
  var stmt = db.prepare(sqlStatements.insert);
  for (var i = 0; i < 10; i++) {
    stmt.run("Ipsum " + i);
  }
  stmt.finalize();

  console.log('');
  console.log(sqlStatements.select.toUpperCase());
  db.each(sqlStatements.select, (err, row) => {
    console.log(row.id + ": " + row.info);
  });

  console.log('');
  console.log(sqlStatements.count.toUpperCase());
  db.each(sqlStatements.count, (err, row) => {
    for(var x in row) {
      console.log(x + ' : ' + row[x]);
    }
  });

});

db.close();
