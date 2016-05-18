import {Observable} from 'rxjs/Observable';
import {Observer} from 'rxjs/Observer';
import 'rxjs/add/operator/share';

export class GlobalService {


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


    constructor() {

        this.modalFormVisiblityChange$ = new Observable(
            (observer: any) => this._modalFormVisiblityObserver = observer
        ).share();

    }

    clearSettings() {
        this._modalFormVisiblity = false;
    }

}
