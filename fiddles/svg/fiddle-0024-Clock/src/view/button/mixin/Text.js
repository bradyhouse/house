
app.view.button.mixin.Text = class {

    constructor() {
        this.prototype = new Object();
        this.prototype.onButtonTextClick = this.onButtonTextClick;
        this.prototype.afterInit = this.afterInit;
    }

    afterInit(view, controller) {

        if (view && view.docElementNS) {
            var buttonId = view.docElementNS.getAttribute('id'),
                text = view.docElementNS.querySelector('text');

            if (text) {
                text.addEventListener('click', controller.onButtonRectangleClick);
                // Must use globals for mousedown and mouseout-- ie addEventListener doesn't seem to work
                text.setAttribute('onmousedown', 'window.app.view.button.mixin.Rectangle.onButtonRectangleMouseDown("'+ buttonId +'");');
                text.setAttribute('onmouseout', 'window.app.view.button.mixin.Rectangle.onButtonRectangleMouseOut("'+ buttonId +'");');
            }

        }
    }

}
