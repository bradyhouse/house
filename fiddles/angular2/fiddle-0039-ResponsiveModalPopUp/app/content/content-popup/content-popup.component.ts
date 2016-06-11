import { Component, Input, Output, EventEmitter } from '@angular/core';
import {ModalFormComponent} from '../../components/modal-form/modal-form.component';
import {ModalFormInterface} from '../../components/modal-form/modal-form.interface';
import {GridComponent} from '../../components/grid/grid.component';


@Component({
    selector: 'content-popup',
    templateUrl: './app/content/content-popup/content-popup.component.html',
    directives: [[ModalFormComponent, GridComponent]]
})
export class ContentPopupComponent {

    @Input() rows:Array<any> = [];
    @Input() columns:Array<any> = [];
    @Input() show:boolean;

    @Output() submit:EventEmitter<any> = new EventEmitter();
    @Output() download:EventEmitter<any> = new EventEmitter();
    @Output() close:EventEmitter<any> = new EventEmitter();

    popupOptions:ModalFormInterface = <ModalFormInterface> {
        title: 'Selected Accounts',
        visible: true,
        enableDownload: true,
        width: 800
    };

    onSubmit(event:Event):void {
        this.submit.emit(event);
    }

    onClose(event:Event):void {
        this.close.emit(event);
    }

    onDownload(event:Event):void {
        this.download.emit(event);
    }

}
