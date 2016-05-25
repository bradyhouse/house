import {Component, Input} from '@angular/core';
import {NgStyle} from '@angular/common';

@Component({
    selector: 'modal-overlay',
    styleUrls: ['./app/components/modal-overlay/modal-overlay.component.css'],
    templateUrl: './app/components/modal-overlay/modal-overlay.component.html'
})
export class ModalOverlayComponent {
    get height():number {
        return window.document.body.clientHeight;
    }
    get width():number {
        return window.document.body.clientWidth;
    }

    constructor() {
        document.documentElement.style.overflow = 'hidden';
        document.body.scroll = "no";
    }

    ngOnDelete() {
        document.documentElement.style.overflow = 'auto';
        document.body.scroll = "yes";
    }
}
