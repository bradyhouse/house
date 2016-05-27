import {Component, OnDestroy, ViewChild, ViewContainerRef, ComponentResolver, ElementRef, Inject} from '@angular/core';
import {Http, Headers, HTTP_PROVIDERS} from '@angular/http';
import {GlobalService} from '../global/global.service';
import {ModalFormComponent} from '../components/modal-form/modal-form.component';
import {ModalFormInterface} from '../components/modal-form/modal-form.interface';
import {GridComponent} from '../components/grid/grid.component';
import {DataService} from '../global/data.service';

@Component({
    selector: 'content',
    templateUrl: './app/content/content.component.html',
    styleUrls: ['./app/content/content.component.css'],
    directives: [[ModalFormComponent, GridComponent]],
    providers: [HTTP_PROVIDERS, DataService]
})
export class ContentComponent implements OnDestroy {

    @ViewChild('popup', {read: ViewContainerRef}) popUp;

    rowData:Array<any> = [];
    columnDefs:Array<any> = [];

    formOptions:ModalFormInterface = <ModalFormInterface> {
        title: 'Selected Accounts',
        visible: true,
        left: 100,
        top: 100,
        width: 800,
        height: 500
    };


    private _modalFormVisibilitySubscription:any;

    constructor(private _globalService:GlobalService,
                private _dataService:DataService,
                private _compResolver:ComponentResolver) {

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

    private showPopUp(rows):void {
        this.popUp.clear();
        this._compResolver.resolveComponent(this.popUpBuilder(rows,
            this.popUpGridColumns, this.formOptions))
            .then(factory => {
                this.popUp.createComponent(factory);
            });
    }

    private popUpBuilder(rows:Array<any>, columns:Array<any>, form:ModalFormInterface) {
        @Component({
            selector: 'popup',
            template: `
            <modal-form [options]="formOptions">
                <div content>
                    <grid-component [rowData]="rowData" [columnDefs]="columnDefs" (submit)="onSubmit($event)" (close)="onClose($event)"></grid-component>
                </div>
            </modal-form>`,
            directives: [[ModalFormComponent, GridComponent]]
        })
        class PopUp {
            rowData:Array<any> = rows;
            columnDefs:Array<any> = columns;
            formOptions:ModalFormInterface = form;
            private _el:any;

            constructor(@Inject(ElementRef) elementRef:any) {
                this._el = elementRef.nativeElement;
            }

            ngOnDestroy() {
                this._el.innerHTML = '';
            }

            onSubmit() {
                this._el.remove();
            }

            onClose() {
                this._el.remove();
            }

        }

        return PopUp;
    }


    private get width() {
        return window.innerWidth - 256 - 40;
    }

    private get height() {
        return window.innerHeight - 40;
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

    private get popUpGridColumns():Array<any> {
        return [
            {headerName: 'Name', field: 'name'},
            {headerName: 'Checking', field: 'checking'},
            {headerName: 'Savings', field: 'savings'}
        ]
    }

}
