import {
    Input,
    Component,
    OnChanges,
    ElementRef,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';


import { FillImageResizeService } from './services/fill-image-resize.service';

@Component({
    selector: 'fill-image',
    moduleId: module.id,
    templateUrl: './app/components/fill-image/fill-image.component.html',
    styleUrls: ['./app/components/fill-image/fill-image.component.css'],
    encapsulation: ViewEncapsulation.None,
    providers: [
        FillImageResizeService
    ]
})
export class FillImageComponent implements OnChanges {
    @Input() options:any;
    @ViewChild('el') el:ElementRef;

    private _changes: any;
    private _timeOut: any;
    width: number;

    constructor(
        private _resizeService: FillImageResizeService) {
        this.width = 400;
    }

    ngOnChanges(changes: any): void {
        if (changes.options && changes.options.currentValue) {
            this._changes = this.parseOptionsChange(changes.options.previousValue, changes.options.currentValue);
            if (this._changes.src || changes.options.firstChange) {
                this.render();
            }
        }
    }

    onImgResize(img:any) {
      if (this._timeOut) {
          window.clearTimeout(this._timeOut);
      }
      this._timeOut = window.setTimeout(() => {
          this.el.nativeElement.firstChild.setAttribute('width', this.width);
          this.width += 50;
          if (this.width >= 700) {
              this.width = 400;
          }
          this.onImgResize();
      }, 5000);
    }

    private render(): void {
        var img: any = document.createElement('img');
        img.setAttribute('src', this.options.src);
        img.setAttribute('class', 'fill-image-component');
        this.el.nativeElement.append(img);

        this._resizeService.init(this.el.nativeElement);
        this.onImgResize();
    }




    private parseOptionsChange(previousOptions: any,
                               currentOptions: any): any {
        if (previousOptions && currentOptions) {
            return {
                src: JSON.stringify(previousOptions.src) !== JSON.stringify(currentOptions.src)
            };
        }

        return {
            src: false
        };

    }


}
