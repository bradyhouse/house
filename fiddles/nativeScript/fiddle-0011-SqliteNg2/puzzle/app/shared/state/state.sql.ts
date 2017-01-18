export const StateSql = {
  insert: "insert into config(id, key, value) values(?,?,?)",
  selectAll: "select id, key, value from config",
  selectNextId: "select seq from sqlite_sequence where name='config'",
  selectLevel: "select value as 'level' from config where key = 'level';",
  updateLevel: "update 'main'.'config' set value = ? where key = 'level'",
  dropTable: "drop table 'main'.'config';",
  createTable: "create table 'config' ('id' integer primary key  autoincrement  not null  unique , 'key' text not null , 'value' text not null)"
}
