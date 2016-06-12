import {Component, Input, Output, EventEmitter, ElementRef, Inject} from '@angular/core';
import {NgIf, NgFor, NgStyle} from '@angular/common';
import {ModalOverlayComponent} from '../modal-overlay/modal-overlay.component';
import {ModalFormInterface} from './modal-form.interface';


@Component({
     selector: 'modal-form',
     styleUrls: ['./app/components/modal-form/modal-form.component.css'],
     templateUrl: './app/components/modal-form/modal-form.component.html',
     directives: [[NgIf, NgFor, ModalOverlayComponent]]
})
export class ModalFormComponent {

     @Input() options:ModalFormInterface;
     @Output() submit:EventEmitter<ModalFormComponent> = new EventEmitter();
     @Output() close:EventEmitter<ModalFormComponent> = new EventEmitter();
     @Output() download:EventEmitter<ModalFormComponent> = new EventEmitter();

     private _el:any;
     private _defaultItems:Array<any> = <Array<any>>[new Date()];
     private _defaultLeft:number = 10;
     private _defaultTop:number = 10;
     private _xPaddingOffset:number = 50;
     private _yPaddingOffset:number = 100;
     private _defaultSubmitButtonLabel:string = 'Submit';

     constructor(@Inject(ElementRef) elementRef:any) {
          this._el = elementRef.nativeElement;
     }

     ngOnDestroy() {
          this._el.innerHTML = '';
     }

     get isVisible():boolean {
          return this.options && this.options.visible ? this.options.visible : false;
     }

     set isVisible(state:boolean) {
          if (this.options) {
               this.options.visible = state;
          }
     }

     get disableButtons() {
          return this.options &&
          this.options.hasOwnProperty('disableButtons') ?
               this.options.disableButtons :
               false;
     }

     get hasTitle() {
          return this.options &&
          this.options.title ?
               true :
               false;
     }

     get enableDownload():boolean {
          return this.options.hasOwnProperty('enableDownload') ?
               this.options.enableDownload :
               false;
     }

     get browserWidth():number {
          return window.innerWidth;
     }

     get browserHeight():number {
          return window.innerHeight;
     }

     get submitButtonLabel():string {
          return this.options &&
          this.options.submitButtonLabel ?
               this.options.submitButtonLabel :
               this._defaultSubmitButtonLabel;
     }

     get title():string {
          return this.options && this.options.title ? this.options.title : '';
     }

     get left():number {
          let left:any = this.options && this.options.left ? this.options.left : null,
               width:number = this.width,
               center:number = width / 2,
               visibleWidth:number = this.browserWidth,
               centerScreen:number = visibleWidth / 2,
               calculatedLeft:number = centerScreen - center - this._xPaddingOffset,
               pxValue:number = left ? left :
                    calculatedLeft > 0 ? calculatedLeft :
                         this._defaultLeft;
          return pxValue;
     }

     get top():number {
          let top:any = this.options && this.options.top ? this.options.top : null,
               height:number = this.height,
               visibleHeight:number = this.browserHeight,
               center:number = height / 2,
               centerScreen:number = visibleHeight / 2,
               calculatedTop:number = centerScreen - center - this._yPaddingOffset,
               pyValue:number = top ? top :
                    calculatedTop < visibleHeight && calculatedTop > 0 ? calculatedTop :
                         this._defaultTop;
          return pyValue;
     }

     get height():number {
          return this.options && this.options.height ? this.options.height : this.browserHeight / 2;
     }

     get width():number {
          return this.options && this.options.width ? this.options.width : this.browserWidth / 2;
     }

     private onCloseButtonClick():void {
          this._el.remove();
          this.close.emit(this);
     }

     private onSubmitClick():void {
          this._el.remove();
          this.submit.emit(this);
     }

     private onDownloadButtonClick():void {
          this.download.emit(this);
     }

}
