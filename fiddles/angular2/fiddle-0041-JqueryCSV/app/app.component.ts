import { Component, OnDestroy } from '@angular/core';
import {DataService} from './data.service';



@Component({
    selector: 'app',
    templateUrl: './app/app.component.html',
    providers: [DataService]
})
export class AppComponent implements OnDestroy {

    data:any;

    private _responseChangeObserver:any;

    constructor(private _dataService:DataService) {
        this._responseChangeObserver = _dataService.responseChange$
            .subscribe(
                (response:any) => this.onResponseChange(response)
            );

    }

    ngOnDestroy() {
        this._responseChangeObserver.unsubscribe();
    }

    onResponseChange(response:any) {
        this.data = response;
    }

    makeRequest(): void {
        this.data = [];
        window.setTimeout(() => {
            this._dataService.request('data.csv');
        }, 500);

    }

}