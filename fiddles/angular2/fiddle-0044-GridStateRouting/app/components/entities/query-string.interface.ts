import { Injectable }             from '@angular/core';

@Injectable()
export interface QueryStringInterface {
    //report url
    r:string;
    // header row id
    h:string;
    // comma delimited array of Field names
    fs:string;
    // pipe delimited array of comma delimited arrays of field values
    vs:string;
}