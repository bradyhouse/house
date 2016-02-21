/**
 * Angular component intended to render the following block of HTML
 *
 *  <div class="x-splitter x-border-item x-box-item x-splitter-default x-splitter-vertical x-unselectable"
 *          style="width: 5px; height: 687px; right: auto; left: 355px; top: 45px; margin: 0px;" role="separator"
 *          aria-hidden="false" aria-disabled="false" aria-orientation="vertical" id="navigation-1027-splitter" tabindex="0"
 *          data-componentid="navigation-1027-splitter">
 *       <div id="navigation-1027-splitter-collapseEl" data-ref="collapseEl" role="presentation"
 *          class="x-collapse-el x-layout-split-left">
 *       </div>
 *  </div>
 *
 */

import {Component} from 'angular2/core';

class ViewModel {
    id:Number;
    direction:String;
    width:Any;
    height:Any;
    left:Any;
    right:Any;
    top:Any;
    margin:Any;

    constructor(config:Object) {
        this.id = config['id'] || 1027;
        this.direction = config['direction'] || 'left';
        this.width = config['width'] || "5px";
        this.height = config['height'] || "687px";
        this.left = config['left'] || "355px";
        this.right = config['right'] || 'auto';
        this.top = config['top'] || "45px";
        this.margin = config['margin'] || "0px";
    }
}

@Component({
    selector: 'splitter',
    template: `
        <div class="x-splitter x-border-item x-box-item x-splitter-default x-splitter-vertical x-unselectable"
             style="width: {{model.width}};
             height: {{model.height}};
             right: {{model.right}};
             left: {{model.left}};
             top: {{model.top}};
             margin: {{model.margin}};"
             role="separator"
             aria-hidden="false"
             aria-disabled="false"
             aria-orientation="vertical" id="navigation-{{model.id}}-splitter"
             tabindex="0"
             >
            <div id="navigation-{{model.id}}-splitter-collapseEl" data-ref="collapseEl" role="presentation"
                 class="x-collapse-el x-layout-split-left"></div>
        </div>`,
    inputs : ['model']
})
export class Splitter {
    model : ViewModel;
}

