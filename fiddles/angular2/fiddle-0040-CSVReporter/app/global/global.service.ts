import {Observable} from 'rxjs/Observable';
import {Observer} from 'rxjs/Observer';
import 'rxjs/add/operator/share';

export class GlobalService {

    public columnsChange$: Observable<Array<Object>>;

    private _columns: Array<Object>;
    private _columnsObserver: Observer<any>;

    set columns(cols:Array<Object>) {
        this._columns = cols;
        if (this._columnsObserver) {
            this._columnsObserver.next(cols);
        }
    }

    get columns():Array<Object> {
        return this._columns;
    }

    constructor() {
        this.columnsChange$ = new Observable(
            (observer: any) => this._columnsObserver = observer
        ).share();
    }

}
