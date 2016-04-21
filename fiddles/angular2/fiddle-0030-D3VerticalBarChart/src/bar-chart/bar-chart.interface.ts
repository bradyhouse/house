import {Injectable} from 'angular2/core';


@Injectable()
export interface BarChartInterface {
    title:string;  // chart title
    width:number;  // width the chart; defaults to window.innerWidth
    height:number; // height of the chart; defaults to window.innerHeight
    simulate:boolean; // (optional) boolean flag to simulated data change after the initial data (json) is loaded
    delay?:number; // (optional) value coressponding to seconds between simulated data change
}