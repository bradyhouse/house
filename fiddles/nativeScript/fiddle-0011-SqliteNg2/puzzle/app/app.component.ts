import { Component } from "@angular/core";
var Sqlite = require("nativescript-sqlite");

@Component({
    selector: "main",
    template: "<page-router-outlet></page-router-outlet>"
})
export class AppComponent {
    private database: any;

    public constructor() {
        if (!Sqlite.exists("highscore.db")) {
            Sqlite.copyDatabase("highscore.db");
        }
    }

}