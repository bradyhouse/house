import {
  ElementRef
} from '@angular/core';

declare let ResizeSensor: any, ElementQueries: any, $: any;

export class ResizeService {

  private _targetEl: ElementRef;
  private _targetGrid: any;
  private _resizeSensor: any;
  private _sensorTimeout: any;
  private _width: number;
  private _height: number;

  init(el: ElementRef, grid: any) {
    this._targetEl = el;
    this._targetGrid = grid;

    window.addEventListener('resize', () => {
      this.windowResize();
    }, false);

    this._resizeSensor = new ResizeSensor(this._targetEl, () => {
      this.windowResize();
    });
    ElementQueries.init();
  }

  resize() {
    ElementQueries.update();
    this._targetGrid.resizeCanvas();
  }

  windowResize() {
    if (this._sensorTimeout) {
      clearTimeout(this._sensorTimeout);
    }
    let width = $(this._targetEl).width(),
      height = $(this._targetEl).height();
    if (width != this._width || height != this._height) {
      this._sensorTimeout = setTimeout(()=> {
        ElementQueries.update();
        this._targetGrid.resizeCanvas();
      }, 66);
    }

  }
}
