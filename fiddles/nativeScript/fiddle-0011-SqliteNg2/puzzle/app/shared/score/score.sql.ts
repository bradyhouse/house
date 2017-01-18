export const ScoreSql = {
  insertHighScore: "insert into high_scores(id, user, time, moves, level) values(?,?,?,?,?)",
  nextIdHighScore: "select seq from sqlite_sequence where name='high_scores'",
  selectHighScore: "select * from (select id, user, time, moves, level, (moves/level) * -1 as rank from high_scores) order by rank desc",
  selectMinHighScore: "select min(moves) as moves from high_scores where level = ",
  dropHighScore: "drop table 'main'.'high_scores';",
  createHighScore: "create table 'high_scores' ('id' integer primary key  autoincrement  not null  unique , 'user' text not null , 'time' text, 'moves' text, 'level' integer not null  default 1)",
  createConfig: "create table 'config' ('id' integer primary key  autoincrement  not null  unique , 'key' text not null , 'value' text not null)"
}
