import {Component, ViewChild, ViewContainerRef, ComponentResolver, AfterViewInit} from '@angular/core';
import {ChildComponent} from './child.component';


@Component({
    selector: 'app',
    template: `
    <h2>Above</h2>
    <div #child></div>
    <h2>Below</h2>
  `
})
export class AppComponent implements AfterViewInit {
    @ViewChild('child', {read: ViewContainerRef}) child;

    constructor(
        public view:ViewContainerRef,
        public compResolver:ComponentResolver
    ){}

    ngAfterViewInit(){
        this.compResolver.resolveComponent(ChildComponent)
            .then(factory => {
                this.child.createComponent(factory);
            })

    }
}
