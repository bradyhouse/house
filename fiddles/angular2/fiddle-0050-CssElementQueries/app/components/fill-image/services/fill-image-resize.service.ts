
import {
    ElementRef
} from '@angular/core';

declare let ResizeSensor:any, ElementQueries: any, $:any;

export class FillImageResizeService {

    private _targetEl: ElementRef;
    private _resizeSensor: any;
    private _sensorTimeout: any;
    private _width: number;

    init(el:ElementRef ) {
        this._targetEl = el;


        window.addEventListener('resize', () => {
          ElementQueries.update();
        }, false);

        this._resizeSensor = new ResizeSensor(this._targetEl, () => {
            this.resize();
        });
        ElementQueries.init();


    }

    resize() {
        console.log('resize');

        if (this._sensorTimeout) {
            window.clearTimeout(this._sensorTimeout);
        }

        let width = $(this._targetEl).width();
        if (width != this._width) {
            this._width = width;
            this._sensorTimeout = window.setTimeout(() => {
               this._targetEl.firstChild.setAttribute('width', width);
                this.resize();
            }, 100);
        }

    }

}
