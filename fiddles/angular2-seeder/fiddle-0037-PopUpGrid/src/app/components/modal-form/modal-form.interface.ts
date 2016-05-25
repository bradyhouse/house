

export interface ModalFormInterface {

    // Form title.  Default value is "".
    title?:string;

    // Show/Hide boolean switch.  Defaults to false.
    visible?:boolean;

    // Number value in pixels (px) defining the absolute y coordinate of the top left corner of the form.
    // Defaults to .5 * window.innerWidth - .5 * width.
    top?:number;

    // Number value in pixels (px) defining the absolute x coordinate of the top left corner of the form.
    // Defaults to .5 * window.innerHeight - .5 * height.
    left?:number;

    // Number value defining the width of the form. Defaults to 500px.
    width?:number;

    // Text displayed on the "Submit" button. Defaults to "submit".
    submitButtonLabel?:string;

    // Flag to disable buttons completely. Defaults to false.
    disableButtons?:boolean;

}
