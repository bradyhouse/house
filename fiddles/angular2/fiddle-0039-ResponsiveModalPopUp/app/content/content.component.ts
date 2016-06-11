import {Component, OnDestroy, ViewChild, ViewContainerRef, ComponentResolver, ElementRef, Inject} from '@angular/core';
import {Http, Headers, HTTP_PROVIDERS} from '@angular/http';
import {GlobalService} from '../global/global.service';
import {ModalFormInterface} from '../components/modal-form/modal-form.interface';
import {GridComponent} from '../components/grid/grid.component';
import {DataService} from '../global/data.service';
import {ContentPopupComponent} from "./content-popup/content-popup.component";


@Component({
    selector: 'content',
    templateUrl: './app/content/content.component.html',
    styleUrls: ['./app/content/content.component.css'],
    directives: [[ContentPopupComponent, GridComponent]],
    providers: [HTTP_PROVIDERS, DataService]
})
export class ContentComponent implements OnDestroy {

    rowData:Array<any>;
    columnDefs:Array<any>;

    private _popupRows:Array<any>;
    private _canShowPopup:boolean = false;


    /*formOptions:ModalFormInterface = <ModalFormInterface> {
     title: 'Selected Accounts',
     visible: true,
     left: 100,
     top: 100,
     width: 800,
     height: 500
     };*/

    get formOptions():ModalFormInterface {

        let _left:number = this.left,
            _top:number = this.top,
            _width:number = (800 / window.innerWidth) * 100,
            _height:number = (300 / window.innerHeight) * 100;
        return {
            title: 'Selected Accounts',
            visible: true,
            width: _width
        }
    }


    private _modalFormVisibilitySubscription:any;

    constructor(private _globalService:GlobalService,
                private _dataService:DataService) {

        this._modalFormVisibilitySubscription = this._globalService.modalFormVisiblityChange$
            .subscribe(
                (modalFormVisibility:any) => this.changeModalFormVisibility(modalFormVisibility)
            );
        this._dataService.request().subscribe((res:any) => {
            this.total = res.total;
            if (res.data) {
                this.columnDefs = this.parseColumns(res.data[0]);
                this.rowData = res.data;
            }
        });
    }

    ngOnDestroy() {
        this._modalFormVisibilitySubscription.unsubscribe();
    }

    private onRowSelected(rowNode) {
        if (rowNode.selected) {
            this._globalService.addRow(rowNode.data);
        } else {
            this._globalService.removeRow(rowNode.data);
        }
    }

    private changeModalFormVisibility(newValue:boolean) {
        let selectedRows = this._globalService._selectedRows;
        if (selectedRows && selectedRows.length) {
            this.showPopUp(selectedRows);
        }
    }

    private showPopUp(rows:Array<any>):void {
        this._popupRows = rows ? rows : [];
        if (this._popupRows.length) {
            this._canShowPopup = true;
        } else {
            this._canShowPopup = false;
        }
    }


    onPopupDownload(event:Event):void {
        // ToDo: Remove ~ debug logic
        console.log(event);
    }

    onPopupSubmit(event:Event):void {
        this._canShowPopup = false;
    }

    onPopupClose(event:Event):void {
        this._canShowPopup = false;
    }


    private get width() {
        return window.innerWidth;
    }

    private get height() {
        return window.innerHeight;
    }

    private get left() {
        return (100 / this.width) * 100;
    }

    private get top() {
        return (100 / this.height) * 100;
    }

    private parseColumns(rec:any):Array<any> {
        let columns:Array<any> = [];
        columns.push({headerName: '#', width: 30, checkboxSelection: true});
        if (rec) {
            Object.keys(rec).map(function (key:any) {
                columns.push(
                    {headerName: key, field: key}
                );
            });
        }
        return columns;
    }

    private get popupVisible() {
        return this._canShowPopup && this._popupRows && this._popupRows.length;
    }

    private get popupRows():Array<any> {
        if (this._popupRows && this._popupRows.length) {
            return this._popupRows;
        }
        return [];
    }

    private get popUpColumns():Array<any> {
        return [
            {headerName: 'Name', field: 'name'},
            {headerName: 'Checking', field: 'checking'},
            {headerName: 'Savings', field: 'savings'}
        ]
    }

}
