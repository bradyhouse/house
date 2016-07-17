import { Directive, ElementRef, Input, HostListener } from '@angular/core';

@Directive({
    selector: '[bg-color]'
})
export class BgColorDirective {

    private _defaultColor:string = 'red';

    constructor(private _el:ElementRef) {

    }

    @Input('bg-color-default') set defaultColor(colorName: string){
      this._defaultColor = colorName || this._defaultColor;
      this.changeColor(this._defaultColor);
    }

    @Input('bg-color') bgColor:string;

    @HostListener('click') onMouseEnter() {
        this.changeColor(this.bgColor || this._defaultColor);
    }

    private changeColor(color:string):void {
        this._el.nativeElement.style.backgroundColor = color;
        if (color) {
            this._el.nativeElement.style.color = 'white';
        } else {
            this._el.nativeElement.style.color = <string>null;
        }
    }

}
