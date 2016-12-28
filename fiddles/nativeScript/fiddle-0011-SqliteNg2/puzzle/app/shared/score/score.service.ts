const Sqlite = require("nativescript-sqlite"),
    frame = require("ui/frame"),
    dbFile = "highscore.sqlite",
    dbName = "highscore.sqlite";

import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Rx";
import "rxjs/add/operator/do";
import "rxjs/add/operator/map";

import { Score } from "./score";

@Injectable()
export class ScoreService {

    sql: Object = {
        insertHighScore: "insert into high_scores(id, user, time, moves, level) values(?,?,?,?,?)",
        nextIdHighScore: "select seq from sqlite_sequence where name='high_scores'",
        selectHighScore: "select * from (select id, user, time, moves, level, (moves/level) * -1 as rank from high_scores) order by rank desc",
        selectMinHighScore: "select min(moves) as moves from high_scores where level = ",
        dropHighScore: "drop table 'main'.'high_scores';",
        createHighScore: "create table 'high_scores' ('id' integer primary key  autoincrement  not null  unique , 'user' text not null , 'time' text, 'moves' text, 'level' integer not null  default 1)",
        createConfig: "create table 'config' ('id' integer primary key  autoincrement  not null  unique , 'key' text not null , 'value' text not null)"
    };

    constructor() {}

    create(score: Score) {

    }

    handleErrors(error: any) {
        console.log(JSON.stringify(error.json()));
        return Observable.throw(error);
    }

    register(user: User) {
        let headers = new Headers();
        headers.append("Content-Type", "application/json");

        return this.http.post(
            Config.apiUrl + "Users",
            JSON.stringify({
                Username: user.email,
                Email: user.email,
                Password: user.password
            }),
            { headers: headers }
        )
            .catch(this.handleErrors);
    }

    handleErrors(error: Response) {
        console.log(JSON.stringify(error.json()));
        return Observable.throw(error);
    }

    login(user: User) {
        let headers = new Headers();
        headers.append("Content-Type", "application/json");

        return this.http.post(
            Config.apiUrl + "oauth/token",
            JSON.stringify({
                username: user.email,
                password: user.password,
                grant_type: "password"
            }),
            { headers: headers }
        )
            .map(response => response.json())
            .do(data => {
                Config.token = data.Result.access_token;
            })
            .catch(this.handleErrors);
    }
}