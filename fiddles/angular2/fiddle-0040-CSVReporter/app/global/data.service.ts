import {Observable} from 'rxjs/Observable';
import {Observer} from 'rxjs/Observer';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/share';
import 'jquery';
import 'jquery-csv';

declare let jQuery:any;

export class DataService {

    public responseChange$:Observable<any>;
    public errorChange$:Observable<any>;

    private _response:any;
    private _responseObserver:Observer<any>;

    private _error:any;
    private _errorObserver:Observer<any>;

    private  _json:any = {
        cols: [],
        data: {}
    };


    set response(resp:any) {
        this._response = resp;
        if (this._responseObserver) {
            this._responseObserver.next(resp);
        }
    }

    get response():any {
        return this._response;
    }

    set error(err:any) {
        this._error = err;
        if (this._errorObserver) {
            this._errorObserver.next(err);
        }
    }

    get error():any {
        return this._error;
    }

    constructor() {
        this.responseChange$ = new Observable(
            (observer:any) => this._responseObserver = observer
        ).share();

        this.errorChange$ = new Observable(
            (observer:any) => this._errorObserver = observer
        ).share();
    }


    request(url) {
        let self:DataService = this,
            req:any = new XMLHttpRequest(),
            data:any;


        req.open('GET', url);

        req.onload = () => {
            if (req.status == 200) {
                window.setTimeout(() => {
                    data = self.addFieldHeader(self, req.responseText.trimLeft().trimRight());
                    self._json.data = jQuery.csv.toObjects(data);
                    self.response = self._json;
                }, 1000);
            } else {
                self.error = req.statusText;
            }
        }
        req.onerror = () => {
            self.error = "Unknown Error";
        }
        window.setTimeout(() => {
            req.send();
        }, 1000);

    }

    parseFieldCount(csv:any):number {
        let lines:Array<string> = csv.split('\n'),
            longestLine:string = lines.reduce(function(lineA, lineB){
                if (lineB.split(',').length > lineA.split(',').length) {
                    return lineB;
                }
                return lineA;
            }),
            fields:Array<string> = longestLine ? longestLine.split(',') : [];
        return fields.length;
    }

    addFieldHeader(self:any, csv:any):any {
        let cnt:number = this.parseFieldCount(csv),
            alphabet:string = 'A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z',
            fields:Array<string> = alphabet.split(','),
            fieldQuotient:number,
            fieldRemainder:number,
            cols:Array<any> = [],
            i:number = 0,
            header:any;

        if (cnt <= fields.length) {
            cols = fields.slice(0, cnt);
        }
        if (cnt > fields.length) {
            fieldQuotient = (Math.floor(cnt / fields.length)) -1;
            fieldRemainder = cnt % fields.length;
            cols = alphabet.split(',');
            if(fieldQuotient > 0) {
                for (; i < fieldQuotient; i++) {
                    fields.map(function(field) {
                        cols.push(field + (i+1));
                    });
                }
            }
            fields.slice(0, fieldRemainder).map(function(field) {
                cols.push(field + (i+1));
            });
        }
        cols.map(function(col, index) {
            if (index == 0) {
                header = col;
            } else {
                header += ',' + col;
            }
        });

        self._json.cols = cols;
        return header + '\n' + csv;
    }

}
