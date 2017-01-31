"use strict";
exports.StateSql = {
    insert: "insert into config(id, key, value) values(?,?,?)",
    selectAll: "select id, key, value from config",
    selectNextId: "select seq from sqlite_sequence where name='config'",
    selectLevel: "select value as 'level' from config where key = 'level';",
    updateLevel: "update 'main'.'config' set value = ? where key = 'level'",
    dropTable: "drop table 'main'.'config';",
    createTable: "create table 'config' ('id' integer primary key  autoincrement  not null  unique , 'key' text not null , 'value' text not null)"
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhdGUuc3FsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic3RhdGUuc3FsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBYSxRQUFBLFFBQVEsR0FBRztJQUN0QixNQUFNLEVBQUUsa0RBQWtEO0lBQzFELFNBQVMsRUFBRSxtQ0FBbUM7SUFDOUMsWUFBWSxFQUFFLHFEQUFxRDtJQUNuRSxXQUFXLEVBQUUsMERBQTBEO0lBQ3ZFLFdBQVcsRUFBRSwwREFBMEQ7SUFDdkUsU0FBUyxFQUFFLDZCQUE2QjtJQUN4QyxXQUFXLEVBQUUsaUlBQWlJO0NBQy9JLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY29uc3QgU3RhdGVTcWwgPSB7XG4gIGluc2VydDogXCJpbnNlcnQgaW50byBjb25maWcoaWQsIGtleSwgdmFsdWUpIHZhbHVlcyg/LD8sPylcIixcbiAgc2VsZWN0QWxsOiBcInNlbGVjdCBpZCwga2V5LCB2YWx1ZSBmcm9tIGNvbmZpZ1wiLFxuICBzZWxlY3ROZXh0SWQ6IFwic2VsZWN0IHNlcSBmcm9tIHNxbGl0ZV9zZXF1ZW5jZSB3aGVyZSBuYW1lPSdjb25maWcnXCIsXG4gIHNlbGVjdExldmVsOiBcInNlbGVjdCB2YWx1ZSBhcyAnbGV2ZWwnIGZyb20gY29uZmlnIHdoZXJlIGtleSA9ICdsZXZlbCc7XCIsXG4gIHVwZGF0ZUxldmVsOiBcInVwZGF0ZSAnbWFpbicuJ2NvbmZpZycgc2V0IHZhbHVlID0gPyB3aGVyZSBrZXkgPSAnbGV2ZWwnXCIsXG4gIGRyb3BUYWJsZTogXCJkcm9wIHRhYmxlICdtYWluJy4nY29uZmlnJztcIixcbiAgY3JlYXRlVGFibGU6IFwiY3JlYXRlIHRhYmxlICdjb25maWcnICgnaWQnIGludGVnZXIgcHJpbWFyeSBrZXkgIGF1dG9pbmNyZW1lbnQgIG5vdCBudWxsICB1bmlxdWUgLCAna2V5JyB0ZXh0IG5vdCBudWxsICwgJ3ZhbHVlJyB0ZXh0IG5vdCBudWxsKVwiXG59XG4iXX0=