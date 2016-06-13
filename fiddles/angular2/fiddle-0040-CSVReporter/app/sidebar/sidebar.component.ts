import {Component, OnDestroy} from '@angular/core';
import {DataService} from '../global/data.service';

@Component({
    selector: 'sidebar',
    templateUrl: './app/sidebar/sidebar.component.html',
    styleUrls: ['./app/sidebar/sidebar.component.css'],
    providers: [DataService]
})
export class SidebarComponent implements OnDestroy {

    private _responseChangeSubscr:any;

    fields:Array<any>;

    constructor(private _dataService: DataService) {
        this._responseChangeSubscr = _dataService.responseChange$
            .subscribe(
                (response:any) => this.onResponseChange(response)
            );

    }

    ngOnDestroy() {
        this._responseChangeSubscr.unsubscribe();
    }

    onResponseChange(response:any) {
       console.log(response);
       this.fields = response.cols;
    }



}
