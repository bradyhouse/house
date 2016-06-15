import {Component, OnDestroy} from '@angular/core';
import {DataService} from '../global/data.service';
import {SelectComponent} from '../components/select/select.component';

@Component({
    selector: 'sidebar',
    templateUrl: './app/sidebar/sidebar.component.html',
    styleUrls: ['./app/sidebar/sidebar.component.css'],
    directives: [[SelectComponent]],
    providers: []

})
export class SidebarComponent implements OnDestroy {

    fields:Array<any>;
    rows:Array<any>;
    isLoaded:boolean = false;

    private _reports:Array<{url:string, name:string}>;
    private _responseChangeSubscr:any;

    get reports():Array<{url:string, name:string}> {
        return this._reports && this._reports.length ? this._reports : [];
    }

    get height():number {
        return window.innerHeight;
    }

    constructor(private _dataService:DataService) {
        console.log('sidebar constructor');
        this.subscribeToDataResponse(true);
    }

    ngOnDestroy() {
        if (this._responseChangeSubscr) {
            this._responseChangeSubscr.unsubscribe();
        }
    }

    onReportSelectChange($event) {
        console.log('sidebar - onReportSelectChange');
        this.subscribeToDataResponse(true);
        this._dataService.request($event.target.value);
    }

    onResponseChange(response:any) {
        console.log('sidebar - onResponseChange');
        this.fields = response.cols;
        this.rows = response.data;
        this._reports = this._dataService.reports;
        this.subscribeToDataResponse(false);
        this.isLoaded = true;
    }

    onSelectChange($event) {
        if ($event.field && $event.value) {
            this._dataService.addFilter({field: $event.field, values: [$event.value]});
        }
    }

    onClearClick($event) {
        this._dataService.clearFilter();
        this.rows = [];
        window.setTimeout(() => {
            this.rows = this._dataService.response.data;
        }, 500);

    }

    onExportClick() {
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
