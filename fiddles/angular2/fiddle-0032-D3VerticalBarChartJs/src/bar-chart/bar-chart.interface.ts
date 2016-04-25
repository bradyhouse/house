interface BarChartInterface {

    title?:string;                  // default (startup) chart title
    simulate?:boolean;              // boolean flag to simulated data change after the initial data (json) is loaded
    delay?:number;                  // value coressponding to seconds between simulated data change
    scaleFn?:Function;              // scaling function -- when present this function will be used to calculate (scale) the value of y
    scaleRange?:Array<number>       // 2 number array defining the maximum and minimum value of Y(n) - Y(0).

}