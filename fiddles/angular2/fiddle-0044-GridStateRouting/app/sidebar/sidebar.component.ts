import { Component, OnDestroy }                 from '@angular/core';
import { Router, ActivatedRoute, RouteSegment } from '@angular/router';
import { DataService }                          from '../global/data.service';
import { Observable }                           from 'rxjs/Observable';
import { Base }                                 from '../components/base';


@Component({
    selector: 'sidebar',
    templateUrl: './app/sidebar/sidebar.component.html',
    styleUrls: ['./app/sidebar/sidebar.component.css'],
    providers: []

})
export class SidebarComponent extends Base {

    fields:Array<any>;
    rows:Array<any>;
    isLoaded:boolean = false;

    private _filter:any;
    private _selectedFieldValues:Array<string>;
    private _selectedReportName:string;
    private _selectedReportUrl:string;
    private _reports:Array<{url:string, name:string}>;
    private _responseChangeSubscr:any;

    get selectedValues():Array<string> {
        return this._selectedFieldValues && this._selectedFieldValues.length ? this._selectedFieldValues : [];
    }

    get selectedReportName():string {
        return this._selectedReportName ? this._selectedReportName : '0';
    }

    get reports():Array<{url:string, name:string}> {
        return this._reports && this._reports.length ? this._reports : [];
    }

    get height():number {
        return window.innerHeight - 40;
    }

    constructor(private _dataService:DataService,
                private _route:ActivatedRoute,
                private _router:Router) {
        super();
        console.log('sidebar.component > constructor');

        this.subscriptions.push(_dataService.selectedReportIdChange$
            .subscribe(
                (name:any) => this.onSelectedReportChange(name)
            ));


        /*this.subscriptions.push(
            this._router
                .routerState
                .queryParams
                .subscribe(params => this.onRouteQueryParamsChange(params)
                )); */

        this.subscriptions.push(
            this._route
                .params
                .subscribe(params => this.onRouteChange(params)
                ));

        this.subscribeToDataResponse(true);
    }

    ngOnDestroy() {
        if (this._responseChangeSubscr) {
            this._responseChangeSubscr.unsubscribe();
        }
    }

    onUserSelectReport($event) {
        console.log('sidebar.component > onUserSelectReport');
        this.subscribeToDataResponse(true);
        if (this._selectedReportUrl !== $event.target.value) {
            this._selectedReportUrl = $event.target.value;
            this._router.navigate([''], <RouteSegment>{queryParams: {
            }});
            this._router.navigate([''], <RouteSegment>{queryParams: {
                r: $event.target.value
            }});
        }
    }

    onRouteQueryParamsChange(params:any) {
        let field:string = params && params.hasOwnProperty("field") ? params["field"] : <string>null,
            values:string = field && params.hasOwnProperty("values") ? params["values"] : <string>null;
        console.log('sidebar.component > onRouteQueryParamsChange');
        if (field && values) {
            console.log("field = " + field);
            console.log("values = " + values);
            if(this._selectedFieldValues) {
                this._selectedFieldValues.push(values);
            } else {
                this._selectedFieldValues = [values];
            }
            this._filter = {field: field, values: [values]};
            if (this._selectedReportUrl && this.isLoaded) {
                this._dataService.request(this._selectedReportUrl, this._filter);
            }
        }
    }

    onRouteChange(params:any) {
        let id = params['r'],
            report = id === "0" ? this._dataService.reports[0] : this._dataService.reports.filter((report:any) => {
                return report.id === id;
            }).pop();
        console.log('sidebar.component > onRouteChange');
        if (report) {
            this._selectedReportName = report.name;
            this._selectedReportUrl = this._dataService.reportNametoUrl(report.name);
        }
    }

    onResponseChange(response:any) {
        console.log('sidebar.component > onResponseChange');
        this.fields = response.cols;
        this.rows = response.data;
        this._reports = this._dataService.reports;
        this.subscribeToDataResponse(false);
        this.isLoaded = true;
    }

    onSelectedReportChange(name:string) {
        console.log('sidebar.component > onSelectedReportChange');
        let reportUrl:string = this._dataService.reportNametoUrl(name);
        console.log('reportUrl = ' + reportUrl);
        if (reportUrl !== '') {
            this._selectedReportUrl = reportUrl;
            this._selectedReportName = name;
            this._dataService.request(reportUrl, this._filter);
        }
    }

    isSelected(name:string):boolean {
        return this.selectedReportName && this.selectedReportName === name ? true : false;
    }

    onClearClick($event) {
        console.log('sidebar.component > onClearClick');
        window.setTimeout(() => {
            this.rows = this._dataService.response.data;
            this._router.navigate([''], <RouteSegment>{queryParams: {
            }});
            this._router.navigate([''], <RouteSegment>{queryParams: {
                r: this._selectedReportUrl
            }});
        }, 500);
    }

    onExportClick() {
        console.log('sidebar.component > onExportClick');
        this._dataService.export();
    }

    private subscribeToDataResponse(state:boolean = false) {
        if (state) {
            this._responseChangeSubscr = this._dataService.responseChange$
                .subscribe(
                    (response:any) => this.onResponseChange(response)
                );
        } else {
            this._responseChangeSubscr.unsubscribe();
        }
    }

}
