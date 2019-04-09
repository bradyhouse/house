import { Base }                 from '../base';
import { Dictionary }           from '../entities/dictionary';
import { RouteSegment }         from '@angular/router';
import { QueryStringInterface } from 'query-string.interface';


export class QueryString extends Base {

    private _r:string;
    private _h:string;
    private _fs:string;
    private _vs:string;
    private _fields:Array<string> = [];
    private _values:Array<string> = [];
    private _reportUrl:string = '0';
    private _dictionary:Dictionary = new Dictionary<Array<string>>();


    constructor(params:QueryStringInterface = null) {
        super();
        if (params) {
            this.apply(this, params);
            this.inflate();
        }
    }

    get r():string {
        return this._r ? decodeURIComponent(this._r) : <string>null;
    }

    set r(value:string) {
        this._r = value ? value : <string>null;
    }

    get h():string {
        return this._h ? decodeURIComponent(this._h) : <string>null;
    }

    set h(value:string) {
        this._h = value ? value : <string>null;
    }

    get fs():string {
        return this._fs ? decodeURIComponent(this._fs) : <string>null;
    }

    set fs(value:string) {
        this._fs = value ? value : <string>null;
    }

    get vs():string {
        return this._vs ? decodeURIComponent(this._vs) : <string>null;
    }

    set vs(value:string) {
        this._vs = value ? value : <string>null;
    }

    get fields():Array<string> {
        return this._fields;
    }

    get values():Array<string> {
        return this._values;
    }

    get reportUrl():string {
        return this.r ? this.r : this._reportUrl;
    }

    get headerRowId():string {
        return this.h;
    }

    get dictionary():Dictionary<Array<string>> {
        return this._dictionary;
    }

    contains(field:string) {
        return this.dictionary.contains(field);
    }

    toRouteSegment():RouteSegment {
        let segment:RouteSegment = <RouteSegment>{
            queryParams: {}
        };

        if (this._r) {
            segment.queryParams["r"] = this._r;
        }

        if (this._h) {
            segment.queryParams["h"] = this._h;
        }

        if (this._fs) {
            segment.queryParams["fs"] = this._fs;
        }

        if (this._vs) {
            segment.queryParams["vs"] = this._vs;
        }

        return segment;

    }

    toString(field:string = <string>null):string {
        let values:Array<string> = field ? this.dictionary.getByKey(field) : <Array<string>>null,
            valuesStr:string = '';

        if (values) {
            values.map((value:string, index:number) => {
                valuesStr += '"' + value + '"';
                if (index < values.length - 1) {
                    valuesStr += ',';
                }
            });
        }
        return valuesStr;
    }

    toFilter(field:string = <string>null):any {

        let values:Array<string> = field ? this.dictionary.getByKey(field) : <Array<string>>null,
            valuesStr:string = '',
            jsonStr:string = '';

        if (values) {
            valuesStr = this.toString(field);
            jsonStr += '{ "' + field + '": [' + valuesStr + '] }';
            return JSON.parse(jsonStr);

        }
        return null;
    }

    update(reportUrl:string = <string>null,
           fields:Array<string> = [],
           values:Array<Array<string>> = [],
           headerId:string = <string>null) {
        this.updateReport(reportUrl);
        this.updateFields(fields);
        this.updateValues(values);
        this.updateHeader(headerId);

    }

    private updateReport(url:string):void {
        this.r = url ? encodeURIComponent(url) : <string>null;
    }

    private updateValues(values:Array<Array<string>>):void {
        let vs:string = '',
            value:string = <string>null;

        if (values) {
            values.map((valueArr:Array<string>, index:number) => {

                if (valueArr && valueArr.length) {
                    value = this.flatten(valueArr, ',');
                    if (value) {
                        vs += value;
                        if (index < (values.length - 1)) {
                            vs += '|';
                        }
                    }
                }
            });
        }
        else {
            vs = <string>null;
        }
        this.vs = vs ? encodeURIComponent(vs) : vs;

    }

    private updateFields(fields:Array<string>):void {
        this.fs = fields && fields.length ? encodeURIComponent(this.flatten(fields, ',')) : <string>null;

    }

    private updateHeader(id:string):void {
        this.h = id ? encodeURIComponent(id) : <string>null;
    }

    private flatten(array:Array<string>, delimiter:string):string {
        let str:string = '';
        if (array && array.length) {
            array.map((value:string, index:number) => {
                str += value ? value : '';
                if (index < (array.length - 1)) {
                    str += delimiter;
                }
            });
        } else {
            str = <string>null;
        }
        return str;
    }

    private inflate() {
        this.inflateFields();
        this.inflateValues();
        this.inflateDictionary();
    }

    private inflateFields():void {
        if (this.fs) {
            this._fields = this.fs ? this.fs.split(',') : [];
        }
    }

    private inflateValues():void {
        if (this.vs) {
            this._values = this.vs ? this.vs.split('|') : [];
        }
    }

    private inflateDictionary():void {
        if (this.fields.length && this.values.length) {
            this.fields.map((field:string) => {
                this.values.map((value:string) => {
                    let commaSplit = value.split(',');
                    let targetField = commaSplit && commaSplit.length ? commaSplit.shift() : <string>null;
                    if (targetField === field && commaSplit.length) {
                        this._dictionary.add(field, commaSplit);
                    }
                });
            });
        }
    }

}