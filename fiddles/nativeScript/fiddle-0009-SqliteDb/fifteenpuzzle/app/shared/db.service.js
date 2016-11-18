const Sqlite = require("nativescript-sqlite"),
  ObservableArray = require("data/observable-array").ObservableArray,
  Observable = require("data/observable").Observable,
  onSelectLevel = require("./db-config.service").selectLevel,
  onUpdateLevel = require("./db-config.service").updateLevel,
  util = require("./util"),
  frame = require("ui/frame"),
  dbFile = "highscore.sqlite",
  dbName = "highscore.sqlite";

var data = new ObservableArray(),
  observable = new Observable(),
  dbPromise = null,
  highScoreRecord = {
    id: null,
    user: null,
    time: null,
    moves: null,
    level: null,
    cssClass: null
  },
  sql = {
    insertHighScore: "insert into high_scores(id, user, time, moves, level) values(?,?,?,?,?)",
    nextIdHighScore: "select seq from sqlite_sequence where name='high_scores'",
    selectHighScore: "select * from (select id, user, time, moves, level, (moves/level) * -1 as rank from high_scores) order by rank desc",
    selectMinHighScore: "select min(moves) as moves from high_scores where level = ",
    dropHighScore: "drop table 'main'.'high_scores';",
    createHighScore: "create table 'high_scores' ('id' integer primary key  autoincrement  not null  unique , 'user' text not null , 'time' text, 'moves' text, 'level' integer not null  default 1)",
    createConfig: "create table 'config' ('id' integer primary key  autoincrement  not null  unique , 'key' text not null , 'value' text not null)"
  };

function consoleLogRecord(i, model) {
  console.log("high score #" + i + " = { id: " + model.id + ", user: " + model.user + ", time: " + model.time + ", moves: " + model.moves + ", level: " + model.level + " }");
}

function consoleLogMsg(tag, msg) {
  console.log(tag + ": " + msg);
}

function createHighScoreRecord(data) {
  consoleLogMsg("db.service", "createHighScoreRecord");
  var newModel = Object.assign({}, highScoreRecord),
      id = data.hasOwnProperty("id") ? +(data.id) : 1;

  newModel.id = id;
  newModel.user = data.hasOwnProperty("user") ? data.user : null;
  newModel.time = data.hasOwnProperty("time") ? data.time : null;
  newModel.moves = data.hasOwnProperty("moves") ? data.moves : null;
  newModel.level = data.hasOwnProperty("level") ? data.level : null;
  newModel.cssClass = id % 2 === 0 ? "highScoreEven" : "highScoreOdd";

  return newModel;
}

function onDbCallback(args, fn, scope) {
  util.callBack(args, fn, scope);
}

function onTruncateTable(db, fn, scope) {
  consoleLogMsg("db.service", "onTruncateTable");
  onDropTable(db, function (dropped) {
    if (dropped) {
      onCreateTable(db, function (created) {
        onDbCallback([created], fn, scope);
      }, null);
    } else {
      onDbCallback([dropped], fn, scope);
    }
  }, null);
}

function onCreateTable(db, fn, scope) {
  consoleLogMsg("db.service", "onCreateTable");
  if (db) {
    db.execSQL(sql.createHighScore, function (err) {
      if (err) {
        console.error(err);
        onDbCallback([false], fn, scope);
      } else {
        onDbCallback([true], fn, scope);
      }
    });
  } else {
    onDbCallback([null], fn, scope);
  }
}

function onDropTable(db, fn, scope) {
  consoleLogMsg("db.service", "onTruncateTable");
  if (db) {
    db.execSQL(sql.dropHighScore, function (err) {
      if (err) {
        console.error(err);
        onDbCallback([err], fn, scope);
      } else {
        onDbCallback([true], fn, scope);
      }
    });
  } else {
    onDbCallback([null], fn, scope);
  }
}

function onSelectMinHighScore(db, level, fn, scope) {
  consoleLogMsg("db.service", "onSelectMinHighScore");
  var query = sql.selectMinHighScore + level;
  consoleLogMsg("sql", query);
  if (db) {
    db.resultType(Sqlite.RESULTSASOBJECT);
    db.valueType(Sqlite.VALUESARENATIVE);
    db.all(query, function (err, items) {
      var data = [];
      if (err) {
        console.error(err);
      } else {
        if (items && items.length) {
          items.forEach(function (item) {
            console.log("moves: " + item.moves);
            var record = {
              moves: item.moves ? item.moves : 0
            }
            data.push(record);
          });
        }
        if (typeof fn === "function") {
          if (scope) {
            fn.apply(scope, data);
          } else {
            fn(data);
          }
        }
      }
    });
  } else {
    if (typeof fn === "function") {
      if (scope) {
        fn.apply(scope, [null]);
      } else {
        fn(null);
      }
    }
  }
}

function onSelectHighScores(db, fn, scope) {
  consoleLogMsg("db.service", "onSelectHighScore");
  if (db) {
    db.resultType(Sqlite.RESULTSASOBJECT);
    db.valueType(Sqlite.VALUESARENATIVE);
    db.all(sql.selectHighScore, function (err, items) {
      data.length = 0;
      if (err) {
        console.error(err);
      } else {
        if (items && items.length) {
          items.forEach(function (item, index) {
            var record = createHighScoreRecord(item);
            consoleLogRecord(index, record);
            data.push(record);
          });
        }
        if (typeof fn === "function") {
          if (scope) {
            fn.apply(scope, [data]);
          } else {
            fn(data);
          }
        }
      }
    });
  } else {
    if (typeof fn === "function") {
      if (scope) {
        fn.apply(scope, [null]);
      } else {
        fn(null);
      }
    }
  }
}

function onInsertHighScore(db, record, fn, scope) {
  consoleLogMsg("db.service", "onInsertHighScore");
  var rs = null;
  if (db) {
    db.execSQL(sql.insertHighScore, [record.id, record.user, record.time, record.moves, record.level], function (err, rs) {
      if (err) {
        console.error(err);
      } else {
        consoleLogRecord(record.id, record);
        if (typeof fn === 'function') {
          if (scope) {
            fn.apply(scope, [record]);
          } else {
            fn(record);
          }
        }

      }
    });
  } else {
    if (typeof fn === 'function') {
      if (scope) {
        fn.apply(scope, [null]);
      } else {
        fn(null);
      }
    }
  }
}

function onSelectNextHighScoreId(db, fn, scope) {
  consoleLogMsg("db.service", "onSelectNextHighScoreId");
  var id = 1;
  if (db) {
    db.all(sql.nextIdHighScore, function (err, rs) {
      if (err) {
        console.error(err);
      } else {
        for (var i = 0; i < rs.length; i++) {
          for (property in rs[i]) {
            console.log(property + ' = ' + rs[i][property]);
          }
          id = (+(rs[i]['seq']) + 1 );
        }
        if (typeof fn === "function") {
          if (scope) {
            fn.apply(scope, [id]);
          } else {
            fn(id);
          }
        }
      }
    });
  }
}

function onCreateConnection(fn, scope) {
  consoleLogMsg("db.service", "createConnection");
  if (!Sqlite.exists(dbFile)) {
    Sqlite.copyDatabase(dbFile);
  }
  dbPromise = new Sqlite(dbName, function (err, dbConnection) {
    console.log("dbConnection.isOpen() = " + dbConnection.isOpen());
    if (err) {
      console.error(err);
    } else {
      dbConnection.resultType(Sqlite.RESULTSASOBJECT);
      if (typeof fn === "function") {
        if (scope) {
          fn.apply(scope, [dbConnection]);
        } else {
          fn(dbConnection);
        }
      }
      dbConnection.close();
    }
  });

}


exports.open = onCreateConnection;
exports.insert = onInsertHighScore;
exports.select = onSelectHighScores;
exports.selectLevel = onSelectLevel;
exports.updateLevel = onUpdateLevel;
exports.selectMin = onSelectMinHighScore;
exports.nextId = onSelectNextHighScoreId;
exports.delete = onTruncateTable;
exports.echo = consoleLogRecord;
