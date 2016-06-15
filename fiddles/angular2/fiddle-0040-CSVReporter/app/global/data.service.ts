import {Injectable} from '@angular/core';
import {Observable, Injectable} from 'rxjs/Observable';
import {Observer} from 'rxjs/Observer';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/share';
import 'jquery';
import 'jquery-csv';

declare let jQuery:any;

@Injectable()
export class DataService {


    public responseChange$:Observable<any>;
    public errorChange$:Observable<any>;
    public rowFiltersChange$:Observable<any>;

    public reports:Array<{url:string, name:string}> = [
        {
            url: 'report-a.csv',
            name: 'report-a'
        }, {
            url: 'report-b.csv',
            name: 'report-b'
        }
    ];

    private _rowFilters:Array<any>;
    private _rowFiltersObserver:Observer<any>;

    private _response:any;
    private _responseObserver:Observer<any>;

    private _error:any;
    private _errorObserver:Observer<any>;

    private _gridApi:any;

    private  _json:any = {
        cols: [],
        data: []
    };

    private _filteredJson:any = {
        cols: [],
        data: []
    }

    set gridApi(api:any) {
        this._gridApi = api;
    }

    get gridApi():any {
        return this._gridApi;
    }

    set rowFitlers(filters:Array<any>) {
        this._rowFilters = filters;
        if (this._rowFiltersObserver) {
            this._rowFiltersObserver.next(filters);
        }
    }

    get rowFilters:Array<any> {
        return this._rowFilters;
    }

    set response(resp:any) {
        this._response = resp;
        if (this._responseObserver) {
            this._responseObserver.next(resp);
            if (this._gridApi) {
                this._gridApi.showLoadingOverlay();
            }
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
        this._rowFilters = [];
        this.responseChange$ = new Observable(
            (observer:any) => this._responseObserver = observer
        ).share();

        this.errorChange$ = new Observable(
            (observer:any) => this._errorObserver = observer
        ).share();

        this.rowFiltersChange$ = new Observable(
            (observer:any) => this._rowFiltersObserver = observer
        ).share();

        this.request(this.reports[0].url);

    }

    request(url) {
        let self:DataService = this,
            req:any = new XMLHttpRequest(),
            data:any;

        if (this._gridApi) {
            this._gridApi.showLoadingOverlay();
        }

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
        req.send();
    }

    addFilter(filter:any) {
        this._rowFilters.push(filter);
        if (this._rowFiltersObserver) {
            this._rowFiltersObserver.next(this._rowFilters);
        }
        if (this._rowFilters.length) {
            this.applyFilter();
        }
    }

    clearFilter() {
        this.response = this._json;
    }

    applyFilter() {
        let self:DataService = this,
            data:Array<any> = [];


        self._filteredJson.cols = this._json.cols;
        self._filteredJson.data = [];

        self._rowFilters.map(function (rowFilter:{field:string, values:Array<any>}) {
            let filteredData = self._json.data.filter(function (row:any) {
                return row.hasOwnProperty(rowFilter.field) && row[rowFilter.field] === rowFilter.values[0];
            });
            Array.prototype.push.apply(data, filteredData);
        });

        self._filteredJson.data = data;

        if (self._filteredJson.data.length) {
            self.response = self._filteredJson;
        } else {
            self.response = self._json;
        }

    }

    private parseFieldCount(csv:any):number {
        let lines:Array<string> = csv.split('\n'),
            longestLine:string = lines.reduce(function (lineA, lineB) {
                if (lineB.split(',').length > lineA.split(',').length) {
                    return lineB;
                }
                return lineA;
            }),
            fields:Array<string> = longestLine ? longestLine.split(',') : [];
        return fields.length;
    }

    private addFieldHeader(self:any, csv:any):any {
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
            fieldQuotient = (Math.floor(cnt / fields.length)) - 1;
            fieldRemainder = cnt % fields.length;
            cols = alphabet.split(',');
            if (fieldQuotient > 0) {
                for (; i < fieldQuotient; i++) {
                    fields.map(function (field) {
                        cols.push(field + (i + 1));
                    });
                }
            }
            fields.slice(0, fieldRemainder).map(function (field) {
                cols.push(field + (i + 1));
            });
        }
        cols.map(function (col, index) {
            if (index == 0) {
                header = col;
            } else {
                header += ',' + col;
            }
        });

        self._json.cols = cols;
        return header + '\n' + csv;
    }

    export() {
        if (this._gridApi) {
            let params = {
                skipHeader: false,
                skipFooters: false,
                skipGroups: false,
                allColumns: true,
                onlySelected: false,
                suppressQuotes: true,
                fileName: 'report.csv',
                columnSeparator: ','
            };
            this._gridApi.exportDataAsCsv(params);
        }
    }


}
