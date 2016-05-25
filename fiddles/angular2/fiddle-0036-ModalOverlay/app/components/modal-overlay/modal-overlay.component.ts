
import {Component} from '@angular/core';
import {NgStyle} from '@angular/common';

@Component({
    selector: 'modal-overlay',
    styleUrls: ['./app/components/modal-overlay/modal-overlay.component.css'],
    templateUrl: './app/components/modal-overlay/modal-overlay.component.html'
})
export class ModalOverlayComponent {
    get height():number {
        return window.innerHeight - 20;
    }
    get width():number {
        return window.innerWidth - 20;
    }
}
