import { Component }                from '@angular/core';
import { ActivatedRoute, Router }   from '@angular/router';
import { Observable }               from 'rxjs/Observable';
import { DataService }              from '../../global/data.service';
import { Base }                     from '../../base';
import 'jquery';

declare let jQuery:any;


@Component({
    selector: 'content-router',
    templateUrl: './app/content/content-router/content-router.component.html',
    styleUrls: ['./app/content/content-router/content-router.component.css'],
    providers: []
})
export class ContentRouterComponent extends Base {
    text:string;
    color:string;
    url:string;
    private _width:number;
    private _height:number;
    private _defaultReportId:string = 'green';


    constructor(private _router:Router,
                private _dataService:DataService) {
        super();

        this.subscriptions.push(
            this._router
                .routerState
                .queryParams
                .subscribe(params => this.onRouteQueryParamsChange(params)
                ));
    }

    onRouteQueryParamsChange(params:any):void {
        console.log('content-router.component > onRouteQueryParamsChange');
        console.log(params);

        let id = params['id'],
            report = this._dataService.reports.filter((report:any) => {
                return report.id === id;
            }).pop();
        if (report) {
            console.log('report.id = ' + report.id);
            this.text = report.text;
            this.color = report.color;
            this.url = window.location;
            this._dataService.selectedReportId = report.id;
        } else {
            this._dataService.selectedReportId = this._defaultReportId;
        }
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
