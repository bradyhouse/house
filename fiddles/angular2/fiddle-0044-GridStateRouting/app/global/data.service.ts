import { Injectable }             from '@angular/core';
import {Observable}               from 'rxjs/Observable';
import {Observer}                 from 'rxjs/Observer';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/share';
import 'jquery';
import 'jquery-csv';

declare let jQuery:any;

@Injectable()
export class DataService {

    selectedReportIdChange$:Observable<any>;
    responseChange$:Observable<any>;
    errorChange$:Observable<any>;
    rowFiltersChange$:Observable<any>;
    reports:Array<{url:string, name:string}> = [
        {
            url: 'report-a.csv',
            name: 'report-a'
        }, {
            url: 'report-b.csv',
            name: 'report-b'
        }
    ];

    private _requestLock:boolean = false;
    private _selectedReportId:string;
    private _selectedReportIdObserver:Observer<any>;
    private _rowFilters:Array<any>;
    private _rowFiltersObserver:Observer<any>;
    private _response:any;
    private _responseObserver:Observer<any>;
    private _error:any;
    private _errorObserver:Observer<any>;
    private _gridApi:any;
    private _json:any = {
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

    set rowFilters(filters:Array<any>) {
        this._rowFilters = filters;
        if (this._rowFiltersObserver) {
            this._rowFiltersObserver.next(filters);
        }
    }

    get rowFilters():Array<any> {
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

    get selectedReportId():string {
        return this._selectedReportId;
    }

    set selectedReportId(id:string) {
        if (id != this._selectedReportId) {
            this._selectedReportId = id;
            this.triggerReportIdObserver();
        }
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

        this.selectedReportIdChange$ = new Observable(
            (observer:any) => this._selectedReportIdObserver = observer
        ).share();

    }

    request(url, filters:any = null) {
        let self:DataService = this,
            req:any = new XMLHttpRequest(),
            data:any;

        if (!this._requestLock) {
            console.log('data.service > request');
            if (this._gridApi) {
                this._gridApi.showLoadingOverlay();
            }
            this._requestLock = true;
            req.open('GET', url);
            req.onload = () => {
                if (req.status == 200) {
                    window.setTimeout(() => {
                        data = self.addLineIds(self, req.responseText.trimLeft().trimRight());
                        data = self.addFieldHeader(self, data);
                        self._json.data = jQuery.csv.toObjects(data);
                        self.response = self._json;
                        if (filters) {
                            self.addFilter(filters);
                        }
                        this._requestLock = false;
                    }, 1000);
                } else {
                    self.error = req.statusText;
                }
            };
            req.onerror = () => {
                self.error = "Unknown Error";
            };
            req.send();
        }
    }

    addFilter(filter:{field:string, values:Array<string>}) {
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
        this._rowFilters = [];
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

    reportNametoUrl(name:string):string {
        let report:any = this.reports.filter((report:any) => {
            return report.name === name;
        }).pop();
        if (report) {
            return report.url;
        } else {
            return '';
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

    private addLineIds(self:any, csv:any):Array<any> {
        /*
        * 1. cycle through the lines
        * 2. split the line and combine the values into a single string
        * 3. append the line to the new string and add to the resulting array
        * */
        let updatedCsv:string = '',
            lines:Array<string> = csv.split('\n'),
            values:Array<string> = [],
            id:string = '',
            newLine:string = '';

        lines.map((line:string) => {
            id = '';
            values = line.split(',');
            values.map((value:string) => {
                id+= value ? value.toLowerCase() : <string>null;
            });
            if (id) {
                newLine = id + ',' + line;
                updatedCsv += newLine + '\n';
            }
        });

        return updatedCsv;
    }

    private addFieldHeader(self:any, csv:any):any {
        let cnt:number = this.parseFieldCount(csv),
            alphabet:string = '#,A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z',
            fields:Array<string> = alphabet.split(','),
            fieldQuotient:number,
            fieldRemainder:number,
            cols:Array<any> = [],
            i:number = 1,
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

    private triggerReportIdObserver() {
        if (this._selectedReportIdObserver) {
            this._selectedReportIdObserver.next(this._selectedReportId);
        }
    }

}
