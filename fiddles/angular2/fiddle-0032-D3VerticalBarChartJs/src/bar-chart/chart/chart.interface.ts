interface ChartInterface {
    valueScaleFn?:Function;                 // scaling function -- when present this function will be used to calculate the value of Y.
    valueDeltaMax?:number;                  // delta Y Max Value.  When present, absolulte value of Y(n) - Y(0) must be less than equal to this value.
    valueDeltaMin?:number;                  // delta Y Min Value.  When present, absolulte value of Y(n) - Y(0) must be greater than or equal to this value.
    title?:string;                          // d3 series title
    width?:number;                          // width of the chart in pixels
    height?:number;                         // height of the chart in pixels
    tag?:any;                               // custom tag attribute
    label?:string;                          // d3 datum label property
    value?:number;                          // d3 datum value property
    tolerance?:string;                      // d3 datum value property
    duration?:number;                       // d3 refresh frequency in milliseconds
    viewModel?:ChartViewModel;              // dimensions configuration property
    values?:Array<ChartInterface>;          // d3 datum values collection necessary when defining a "root" item

}
