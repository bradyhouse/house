import { Directive, ElementRef, Input, Output, HostListener, EventEmitter, NgZone } from '@angular/core';

@Directive({
  selector: '[height]'
})
export class HeightDirective {

  @Output() heightChange:EventEmitter<ElementRef> = new EventEmitter();


  private _delayedTask:any = <any>null;
  private _anchor:ElementRef = <ElementRef>null;
  private _defaultTimeout:number = 500;
  private _height:any = <any>null;

  constructor(private _el:ElementRef, private _zone:NgZone) {
    _el.nativeElement.parentElement.addEventListener('resize', () => this.onResize());
    this.init();
  }

  @Input('timeout') timeout:number;

  @Input() set height(value:any) {
    if (value && value.constructor === Number) {
      if(value !== this._height) {
        this._height == value;
        this._zone.run(() => {
          this._el.nativeElement.style.height = <string>value + 'px';
        });
      }
    } else if (value && value.constructor === String && value.indexOf('%') !== -1) {
      if (value !== this._height) {
        this._height == value;
        this._zone.run(() => {
          this._el.nativeElement.style.height = value;
        });
      }
    }
    else if (value && value.constructor === ElementRef) {
      this._anchor = value;
      this.updateHeight(this._anchor);
    } else {
      this.updateHeight(this._el.nativeElement.parentElement);
    }
  }


  @HostListener('window:resize') onResize() {
    if (this._delayedTask) {
      window.clearTimeout(this._delayedTask);
    }
    if (this.timeout && this.timeout === 0) {
      this.updateHeight(this._anchor || this._el.nativeElement.parentElement);

    } else {
      this._delayedTask = window.setTimeout(() => {
        this.updateHeight(this._anchor || this._el.nativeElement.parentElement);
      }, this.timeout || this._defaultTimeout);
    }
  }

  private init():void {
    this.onResize();
  }

  private updateHeight(anchor:any):void {
    let maxHeight:number = anchor && anchor.getClientRects().length ?
      anchor.getBoundingClientRect()['height'] : <number>null,
        siblingHeight:number = this.calculateSiblingOffset(),
        height:number = maxHeight ? maxHeight - siblingHeight : <number>null;

    if(height) {
      this._zone.run(() => {
        this._el.nativeElement.style.height = <string>height + 'px';
        this.heightChange.emit(this._el);
      });
    }
  }

  private calculateSiblingOffset():number {

    let offset:number = 0,
        parent:HTMLElement = this._el.nativeElement.parentElement,
        nodes:NodeList = parent.children,
        child:Node = <Node>null,
        childHeight:number = <number>null,
        key:string = <string>null;

    if (this._anchor) {
      return offset;
    }

    if (parent.childElementCount == 1) {
      return offset;
    }

    for(let i=0; i < nodes.length; i++) {
      child = nodes.item(i);
      console.log(child);

      if(child.outerHTML !== this._el.nativeElement.outerHTML) {
        childHeight = child.getClientRects().length ?
            child.getBoundingClientRect()['height'] : <number>null;
        if (childHeight) {
          offset+=childHeight;
        }
      }

    }

    return offset;

  }

  private onZoneStable():void {
    console.log('onZoneStable');
    this.onResize();
  }


}
