import {Injectable} from '@angular/core';
import {Observable, Injectable} from 'rxjs/Observable';
import {Observer} from 'rxjs/Observer';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/share';
import 'jquery';

declare let jQuery:any;


@Injectable()
export class DataService {

    public reports:Array<{url:string, name:string}> = [
        {
            id: 'red',
            color: 'red',
            text: 'RED'
        }, {
            id: 'orange',
            color: 'orange',
            text: 'ORANGE'
        }, {
            id: 'green',
            color: 'green',
            text: 'GREEN'
        }, {
            id: 'blue',
            color: 'blue',
            text: 'BLUE'
        }, {
            id: 'purple',
            color: 'purple',
            text: 'PURPLE'
        }
    ];

    private _selectedReportId:string;

    set selectedReportId(id:string) {
        if (id != this._selectedReportId) {
            this._selectedReportId = id;
            this.triggerReportIdObserver();
        }
    }

    private _selectedReportIdObserver:Observer<any>;

    private triggerReportIdObserver() {
        console.log('triggerReportIdObserver');
        if (this._selectedReportIdObserver) {
            this._selectedReportIdObserver.next(this._selectedReportId);
        }
    }

    public selectedReportIdChange$:Observable<any>;


    constructor() {
        this.selectedReportIdChange$ = new Observable(
            (observer:any) => this._selectedReportIdObserver = observer
        ).share();
    }

}
