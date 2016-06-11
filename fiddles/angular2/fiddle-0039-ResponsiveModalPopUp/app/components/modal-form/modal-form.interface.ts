import {Injectable} from '@angular/core';
import Injectable = ng.Injectable;

@Injectable()
export interface ModalFormInterface {

    // Form title.  Default value is "".
    title?:string;

    // Show/Hide boolean switch.  Defaults to false.
    visible?:boolean;

    // Value defining the absolute y coordinate of the top left corner of the form.
    // Defaults to .5 * window.innerWidth - .5 * width.
    top?:number;

    // Value defining the absolute x coordinate of the top left corner of the form.
    // Defaults to .5 * window.innerHeight - .5 * height
    left?:number;

    // Value defining the width of the pop-up container. Defaults to 1/2 the window's visible width.
    width?:number;

    // Value defining the height of the pop-up container. Defaults to 1/2 the window's visible width.
    height?:number;

    // Text displayed on the "Submit" button. Defaults to "submit".
    submitButtonLabel?:string;

    // Flag to disable buttons completely. Defaults to false.
    disableButtons?:boolean;

    // Flag to enable the optional download button. Defaults to false.
    enableDownload?:boolean;

    // Collection of items to be injected into the body of the form. Defaults to current data time stamp.
    items?:Array<any>;

}
