import {Component, NgZone, AfterView, OnDestroy} from 'angular2/core';

class ViewModel {
    id: String;
    data: Object;
    height: any;
    constructor(config: Object) {
        this.id = config['id'];
        this.data = config['data'];
        this.height = config['height'] || 300;
    }
}

@Component({
    selector : 'chart',
    inputs : ['model'],
    template : `
        <zingchart id="{{model.id}}"></zingchart>
  `
})
export class Chart implements AfterViewInit, OnDestroy {
    model : ViewModel;
    constructor(private zone:NgZone) {
    }

    ngAfterViewInit() {
        var me = this;
        me.zone.runOutsideAngular(() => {
            zingchart.render({
                id : me.model['id'],
                data : me.model['data'],
                height: me.model['height']
            });
        });
    }
    ngOnDestroy() {
        zingchart.exec(this.model['id'], 'destroy');
    }
}
