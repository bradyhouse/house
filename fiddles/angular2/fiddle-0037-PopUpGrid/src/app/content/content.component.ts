import {Component, OnDestroy} from '@angular/core';
import {GlobalService} from '../global/global.service';
import {ModalFormComponent} from '../components/modal-form/modal-form.component';
import {ModalFormInterface} from '../components/modal-form/modal-form.interface';
import {GridComponent} from '../components/grid/grid.component';
@Component({
    selector: 'content',
    templateUrl: './app/content/content.component.html',
    styleUrls: ['./app/content/content.component.css'],
    directives: [[ModalFormComponent, GridComponent]]
})
export class ContentComponent implements OnDestroy {
    modalFormVisibility: boolean;

    private _formOptions:ModalFormInterface = <ModalFormInterface> {
        title: 'My Form',
        visible: this.modalFormVisibility,
        left: 100,
        top: 100,
        width: 800,
        height: 500

    };

    get formOptions():ModalFormInterface {
        return this._formOptions;
    }

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
        this._formOptions.visible = newValue;
    }
}
