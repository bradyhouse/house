import {Component, OnDestroy} from '@angular/core';
import {GlobalService} from '../global/global.service';
import {ModalFormComponent} from '../components/modal-form/modal-form.component';
import {ModalFormInterface} from '../components/modal-form/modal-form.interface';

@Component({
    selector: 'sidebar',
    templateUrl: './app/sidebar/sidebar.component.html',
    styleUrls: ['./app/sidebar/sidebar.component.css'],
    directives: [[ModalFormComponent]]
})
export class SidebarComponent implements OnDestroy {
    modalFormVisibility: boolean;

    private _modalFormVisibilitySubscription: any;

    constructor(private _globalService: GlobalService) {
        this.modalFormVisibility = this._globalService.modalFormVisibility;
        this._modalFormVisibilitySubscription= this._globalService.modalFormVisiblityChange$
            .subscribe(
                (modalFormVisibility: any) => this.changeModalFormVisibility(modalFormVisibility)
            );
    }

    ngOnDestroy() {
        this._modalFormVisibilitySubscription.unsubscribe();
    }

    private changeModalFormVisibility(newValue: boolean) {
        this.modalFormVisibility = newValue;
    }

    onOpenClick() {
        this._globalService.modalFormVisiblity = true;
    }
}
