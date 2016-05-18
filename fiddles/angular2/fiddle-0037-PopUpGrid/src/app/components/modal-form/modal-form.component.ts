import {Component, Input, Output, EventEmitter} from '@angular/core';
import {NgIf, NgFor, NgStyle} from '@angular/common';
import {ModalFormInterface} from './modal-form.interface';


@Component({
    selector: 'modal-form',
    styleUrls: ['./app/components/modal-form/modal-form.component.css'],
    templateUrl: './app/components/modal-form/modal-form.component.html',
    directives: [[NgIf, NgFor]]
})
export class ModalFormComponent {

    @Input() options:ModalFormInterface;
    @Output() submit:EventEmitter<ModalFormComponent> = new EventEmitter();
    @Output() close:EventEmitter<ModalFormComponent> = new EventEmitter();

    private _defaultItems:Array<any> = <Array<any>>[new Date()];
    private _defaultLeft:number = 100;
    private _defaultTop:number = 100;
    private _defaultSubmitButtonLabel:string = 'Submit';

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

    get browserWidth():number {
        return window.document.documentElement.clientWidth;
    }

    get browserHeight():number {
        return window.document.documentElement.clientHeight;
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
        let left = this.options && this.options.left ? this.options.left : 0,
            width = this.width,
            visibleWidth = this.browserWidth;
        return left + width < visibleWidth ? left :
            left - width < visibleWidth && left - width > 0 ? left - width :
                this._defaultLeft;
    }

    get top():number {
        let top = this.options && this.options.top ? this.options.top : 0,
            height = this.height,
            visibleHeight = this.browserHeight;
        return (top + height) < visibleHeight ? top :
            top - height < visibleHeight && top - height > 0 ? top - height :
                this._defaultTop;
    }

    get height():number {
        return 100;
    }

    get width():number {
        return this.options && this.options.width ? this.options.width : 150;
    }

    private onCloseButtonClick():void {
        this.isVisible = false;
        this.close.emit(this);
    }

    private onSubmitClick():void {
        this.isVisible = false;
        this.submit.emit(this);
    }

}
