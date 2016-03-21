import { OnChanges, ElementRef } from 'angular2/core';
export declare class Nvd3Component implements OnChanges {
    options: any;
    data: any;
    el: any;
    chart: any;
    svg: any;
    constructor(elementRef: ElementRef);
    ngOnChanges(): void;
    onDataRefresh(): void;
    configure(options: any): void;
    configureDimensions(): void;
    configureChart(chart: any, options: any, chartType: any): void;
    configureEvents(dispatch: any, options: any): void;
    clearElement(): void;
}
