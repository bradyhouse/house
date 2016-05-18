import {Component} from 'angular2/core';
import {ModalFormComponent} from './modal-form/modal-form.component';
import {ModalFormInterface} from './modal-form/modal-form.interface';


@Component({
    selector: 'app',
    templateUrl: './app/app.component.html',
    directives: [[ModalFormComponent]]
})
export class AppComponent {

    private _formOptions:ModalFormInterface = <ModalFormInterface> {
        title: 'My Form',
        visible: false,
        left: 100,
        top: 100,
        width: 500,
        height: 500

    };

    get formOptions():ModalFormInterface {
        return this._formOptions;
    }

    onOpenClick() {
        this._formOptions.visible = true;
    }

}
