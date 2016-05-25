import {Observable} from 'rxjs/Observable';
import {Observer} from 'rxjs/Observer';
import 'rxjs/add/operator/share';

export class GlobalService {

    _selectedRows:Array<any>;
    modalFormVisiblityChange$: Observable<boolean>;

    private _modalFormVisiblity: boolean = false;
    private _modalFormVisiblityObserver: Observer<any>;

    set modalFormVisiblity(newValue:boolean) {
        this._modalFormVisiblity = newValue;
        if (this._modalFormVisiblityObserver) {
            this._modalFormVisiblityObserver.next(newValue);
        }
    }

    get modalFormVisibility():boolean {
        return this._modalFormVisiblity;
    }

    get selectedRows():Array<any> {
        return this._selectedRows;
    }

    addRow(data:any):void {
        let id=data.id,
            existingRows = this.selectedRows.filter((selectedRow:any) => {
                return selectedRow.id === id;
            });
        if (existingRows && !existingRows.length) {
            this._selectedRows.push(data);
        }
    }

    removeRow(data:any):void {
        let id=data.id;
        this._selectedRows = this.selectedRows.filter((selectedRow:any) => {
            return selectedRow.id !== id;
        });
    }

    constructor() {
        this._selectedRows = [];
        //noinspection TypeScriptUnresolvedFunction
        this.modalFormVisiblityChange$ = new Observable(
            (observer: any) => this._modalFormVisiblityObserver = observer
        ).share();
    }

    clearSettings() {
        this._modalFormVisiblity = false;
    }

}
