import { Component } from '@angular/core';
import { ActivatedRoute }       from '@angular/router';
import { Observable }                   from 'rxjs/Observable';
import { DataService } from '../../global/data.service';
import { Base } from '../../base';
import 'jquery';

declare let jQuery:any;


@Component({
  selector: 'content-router',
    templateUrl: './app/content/content-router/content-router.component.html',
    styleUrls: ['./app/content/content-router/content-router.component.css']
    providers: []
})
export class ContentRouterComponent extends Base {
    text: string;
    color: string;

    private _width:number;
    private _height:number;


    constructor(
        private _route: ActivatedRoute,
        private _dataService: DataService
    ) {
        super();

        this.subscriptions.push(
            this._route
                .params
                .subscribe(params => {
                    let id = params['id'],
                        report = this._dataService.reports.filter((report:any) => {
                            return report.id === id;
                        }).pop();
                    if (report) {
                        console.log('report.id = ' + report.id);
                        this.text = report.text;
                        this.color = report.color;
                        this._dataService.selectedReportId = report.id;
                    }
                })
        );
    }

    onWindowResize() {
        this._width = jQuery('.content-component').width();
        this._height = jQuery('.sidebar-component').height();
    }

    get width() {
        if (!this._width) {
            this._width = jQuery('.content-component').width();
        }
        return this._width;
    }

    get height() {
        if (!this._height) {
            this._height = jQuery('.sidebar-component').height();

        }
        return this._height;
    }

}
