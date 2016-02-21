import {Component, NgZone, AfterView, OnDestroy} from 'angular2/core';

class Chart {
    id: String;
    data: Object;
    height: any;
    width: any;
    constructor(config: Object) {
        this.id = config['id'];
        this.data = config['data'];
        this.height = config['height'] || 300;
        this.width = config['width'] || 600;
    }
}

@Component({
    selector : 'zingchart',
    inputs : ['chart'],
    template : `
   <div id='{{chart.id}}'></div>
  `
})
export class ZingChart implements AfterViewInit, OnDestroy {
    chart : Chart;
    constructor(private zone:NgZone) {
    }

    ngAfterViewInit() {
        this.zone.runOutsideAngular(() => {
            zingchart.render({
                id : this.chart['id'],
                data : this.chart['data'],
                width : this.chart['width'],
                height: this.chart['height']
            });
        });
    }
    ngOnDestroy() {
        zingchart.exec(this.chart['id'], 'destroy');
    }
}
