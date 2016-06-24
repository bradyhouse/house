import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from '../global/data.service';
import { Observable } from 'rxjs/Observable';
import { Base } from '../base';



@Component({
    selector: 'sidebar',
    templateUrl: './app/sidebar/sidebar.component.html',
    styleUrls: ['./app/sidebar/sidebar.component.css'],
    providers: []
})
export class SidebarComponent extends Base {

    private _selectedReportId:string;
    private _reports:Array<{id:string, text:string}>;

    get selectedReportId():string {
        return this._selectedReportId ? this._selectedReportId : 'green';
    }

    get reports():Array<{id:string, text:string}> {
        return this._reports && this._reports.length ? this._reports : [];
    }

    get height():number {
        return window.innerHeight;
    }

    constructor(private _dataService:DataService,
                private _route:ActivatedRoute,
                private _router:Router) {
        super();
        this.subscriptions.push( _dataService.selectedReportIdChange$
            .subscribe(
                (id:any) => this.onSelectedReportIdChange(id)
            ));

        this.subscriptions.push(
            this._route
                .params
                .subscribe(params => {
                    let id = params['id'],
                        report = this._dataService.reports.filter((report:any) => {
                            return report.id === id;
                        }).pop();

                    if (report) {
                        this._selectedReportId = report.id;
                    }
                })
        );
        this._reports = this._dataService.reports;
    }


    isSelected(id:string):boolean {
        return this._selectedReportId === id ? true : false;
    }

    onReportSelectChange($event) {
        this._router.navigate(['/content', $event.target.value]);

    }
    onSelectedReportIdChange(id:string) {
        this._selectedReportId = id;
    }

}
