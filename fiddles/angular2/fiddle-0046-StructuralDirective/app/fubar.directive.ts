import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[fubar]'
})
export class FubarDirective {

  constructor(
      private _templateRef: TemplateRef<any>,
      private _viewContainer: ViewContainerRef
  ) {}

    @Input() set fubar(condition: boolean) {
        if (!condition) {
            this._viewContainer.createEmbeddedView(this._templateRef);
        } else {
            this._viewContainer.clear();
        }
    }

}
