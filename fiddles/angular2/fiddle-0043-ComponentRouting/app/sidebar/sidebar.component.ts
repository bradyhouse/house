import { Component } from '@angular/core';
import { Router, RouteSegment } from '@angular/router';
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
                private _router:Router) {
        super();
        this.subscriptions.push( _dataService.selectedReportIdChange$
            .subscribe(
                (id:any) => this.onSelectedReportIdChange(id)
            ));
        this._reports = this._dataService.reports;
    }

    isSelected(id:string):boolean {
        return this.selectedReportId === id ? true : false;
    }

    onSelectChange($event) {
        console.log('sidebar.component > onSelectChange');
        this._dataService.selectedReportId = $event.target.value;
    }

    onSelectedReportIdChange(id:string) {
        console.log('sidebar.component > onSelectedReportIdChange');
        this._selectedReportId = id;
        this._router.navigate(['']);
        this._router.navigate([''], <RouteSegment>{
            queryParams: {
                id: id
            }
        });
    }

}
