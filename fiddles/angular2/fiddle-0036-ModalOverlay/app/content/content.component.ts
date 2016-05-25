import {Component, OnDestroy, ViewChild, ViewContainerRef, ComponentResolver, ElementRef, Inject} from '@angular/core';
import {GlobalService} from '../global/global.service';
import {ModalOverlayComponent} from '../components/modal-overlay/modal-overlay.component';

@Component({
    selector: 'content',
    templateUrl: './app/content/content.component.html',
    styleUrls: ['./app/content/content.component.css']
})
export class ContentComponent implements OnDestroy {

    @ViewChild('overlay', {read: ViewContainerRef}) overlay;

    rowData:Array<any> = [];
    columnDefs:Array<any> = [];

    private _modalFormVisibilitySubscription:any;

    constructor(private _globalService:GlobalService,
                public view:ViewContainerRef,
                public compResolver:ComponentResolver) {

        this._modalFormVisibilitySubscription = this._globalService.modalFormVisiblityChange$
            .subscribe(
                (modalFormVisibility:any) => this.changeModalFormVisibility(modalFormVisibility)
            );
    }

    ngOnDestroy() {
        this._modalFormVisibilitySubscription.unsubscribe();
    }


    private changeModalFormVisibility(newValue:boolean) {
        this.overlay.clear();
        this.compResolver.resolveComponent(this.overlayBuilder())
            .then(factory => {
                this.overlay.createComponent(factory);
            });
        window.setTimeout(() => {
            this.overlay.clear();
        }, 5000);
    }


    private overlayBuilder() {
        @Component({
            selector: 'overlay',
            template: `<modal-overlay></modal-overlay>`,
            directives: [[ModalOverlayComponent]]
        })
        class Overlay {}
        return Overlay;
    }

    private get width() {
        return window.innerWidth - 256 - 40;
    }

    private get height() {
        return window.innerHeight - 40;
    }

}
