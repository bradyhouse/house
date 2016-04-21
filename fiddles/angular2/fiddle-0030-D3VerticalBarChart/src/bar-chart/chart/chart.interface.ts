import {ChartViewModel} from './chart-view-model';

export interface ChartInterface {
    title?:string;                          // optional d3 series title
    width?:number;                          // optional width of the chart in pixels
    height?:number;                         // optional height of the chart in pixels
    tag?:any;                               // optional custom tag attribute
    label?:string;                          // optional d3 datum label property
    value?:string;                          // optional d3 datum value property
    tolerance?:string;                      // optional d3 datum value property
    duration?:number;                       // optional d3 refresh frequency in milliseconds
    viewmodel?:ChartViewModel         // optional dimensions configuration property
    values?:Array<ChartInterface>;    // optional d3 datum values collection necessary when defining a "root" item
}
