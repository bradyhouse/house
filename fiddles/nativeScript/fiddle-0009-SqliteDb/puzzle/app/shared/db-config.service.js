const Sqlite = require("nativescript-sqlite"),
  ObservableArray = require("data/observable-array").ObservableArray,
  Observable = require("data/observable").Observable,
  util = require("./util"),
  frame = require("ui/frame");

var data = [],
  observable = new Observable(),
  configRecord = {
    id: null,
    key: null,
    value: null,
    cssClass: null
  },
  sql = {
    insert: "insert into config(id, key, value) values(?,?,?)",
    selectNextId: "select seq from sqlite_sequence where name='config'",
    selectLevel: "select value as 'level' from config where key = 'level';",
    updateLevel: "update 'main'.'config' set value = ? where key = 'level'",
    dropTable: "drop table 'main'.'config';",
    createTable: "create table 'config' ('id' integer primary key  autoincrement  not null  unique , 'key' text not null , 'value' text not null)"
  };

function consoleLogRecord(i, model) {
  //console.log("config #" + i + " = { id: " + model.id + ", key: " + model.key + ", value: " + model.value + " }");
}

function consoleLogMsg(tag, msg) {
  //console.log(tag + ": " + msg);
}

function createConfigRecord(data) {
  consoleLogMsg("db-config.service", "createConfigRecord");
  var newModel = Object.assign({}, configRecord),
    id = data.hasOwnProperty("id") ? +(data.id) : 1;
  newModel.id = id;
  newModel.key = data.hasOwnProperty("key") ? data.key : null;
  newModel.value = data.hasOwnProperty("value") ? data.value : null;
  newModel.cssClass = id % 2 === 0 ? "configEven" : "configOdd";
  return newModel;
}

function onDbCallback(args, fn, scope) {
  consoleLogMsg("db-config.service", "onDbCallback");
  for(var x in args) {
    consoleLogMsg(x, args[0]);
  }
  util.callBack(args, fn, scope);
}

function onTruncateTable(db, fn, scope) {
  consoleLogMsg("db-config.service", "onTruncateTable");
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
  consoleLogMsg("db-config.service", "onCreateTable");
  if (db) {
    db.execSQL(sql.createConfig, function (err) {
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
  consoleLogMsg("db-config.service", "onDropTable");
  if (db) {
    db.execSQL(sql.dropTable, function (err) {
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

function onSelectLevel(db, fn, scope) {
  consoleLogMsg("db-config.service", "onSelectLevel");
  data.length = 0;
  if (db) {
    db.resultType(Sqlite.RESULTSASOBJECT);
    db.valueType(Sqlite.VALUESARENATIVE);
    db.all(sql.selectLevel, function (err, items) {
      if (err) {
        onDbCallback([err], fn, scope);
      } else {
        if (items && items.length) {
          items.forEach(function (item, index) {
            var record = {
              level: item.level
            };
            data.push(record);
          });
        }
        onDbCallback([data], fn, scope);
      }
    });
  } else {
    onDbCallback([data], fn, scope);
  }
}

function onUpdateLevel(db, level, fn, scope) {
  consoleLogMsg("db-config.service", "onUpdateLevel");
  var rs = null;
  if (db) {
    db.execSQL(sql.updateLevel, [level], function (err, rs) {
      if (err) {
        console.error(err);
        onDbCallback([err], fn, scope);
      } else {
        onDbCallback([level], fn, scope);
      }
    });
  } else {
    onDbCallback([null], fn, scope);
  }
}



exports.updateLevel = onUpdateLevel;
exports.selectLevel = onSelectLevel;
exports.echo = consoleLogRecord;