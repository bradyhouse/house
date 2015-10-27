
app.view.button.mixin.Rectangle = class {

    constructor() {
        this.prototype = new Object();
        this.prototype.onButtonRectangleClick = this.onButtonRectangleClick;
        this.prototype.afterInit = this.afterInit;
    }

    afterInit(view, controller) {

        if (view && view.docElementNS) {

            var buttonId = view.docElementNS.getAttribute('id'),
                rectId = buttonId + '-rectangle',
                rect = view.docElementNS.querySelector("rect[id="+ rectId +"]");

            if (rect) {
                rect.addEventListener('click', this.onButtonRectangleClick);

                // Must use globals for mousedown and mouseout-- ie addEventListener doesn't seem to work
                rect.setAttribute('onmousedown', 'window.app.view.button.mixin.Rectangle.onButtonRectangleMouseDown("'+ buttonId +'");');
                rect.setAttribute('onmouseout', 'window.app.view.button.mixin.Rectangle.onButtonRectangleMouseOut("'+ buttonId +'");');

            }

        }

    }

    onButtonRectangleClick() {

        var rectId = this.getAttribute('id'),
            buttonId = rectId.split('-')[0];

        alert('You clicked button id "' + buttonId +'"' );

    }

    static onButtonRectangleMouseOut(buttonId) {
        var rectangleId = buttonId + '-rectangle',
            backRectangleId = buttonId + '-backrectangle',
            pathId = buttonId + '-text',
            backRectangle = document.getElementById(backRectangleId),
            backRectangleX = backRectangle ? backRectangle.getAttribute('x') : 0,
            backRectangleY = backRectangle ? backRectangle.getAttribute('y') : 0,
            rectangle = document.getElementById(rectangleId),
            rectangleX = rectangle ? rectangle.getAttribute('x') : 0,
            rectangleY = rectangle ? rectangle.getAttribute('y') : 0,
            path = document.getElementById(pathId),
            pathX = path ? path.getAttribute('x') : 0,
            pathY = path ? path.getAttribute('y') : 0;

        if (backRectangle && backRectangleX == rectangleX && backRectangleY == rectangleY) {
            backRectangleX = parseInt(rectangleX) + 2;
            backRectangleY = parseInt(rectangleY) + 3;
            backRectangle.setAttribute('x', backRectangleX);
            backRectangle.setAttribute('y', backRectangleY);
            if (path) {
                pathX = parseInt(pathX) - 2;
                pathY = parseInt(pathY) - 3;
                path.setAttribute('x', pathX);
                path.setAttribute('y', pathY);
            }
        }

    }

    static onButtonRectangleMouseDown(buttonId) {

        var rectangleId = buttonId + '-rectangle',
            backRectangleId = buttonId + '-backrectangle',
            pathId = buttonId + '-text',
            backRectangle = document.getElementById(backRectangleId),
            backRectangleX = backRectangle ? backRectangle.getAttribute('x') : 0,
            backRectangleY = backRectangle ? backRectangle.getAttribute('y') : 0,
            rectangle = document.getElementById(rectangleId),
            rectangleX = rectangle ? rectangle.getAttribute('x') : 0,
            rectangleY = rectangle ? rectangle.getAttribute('y') : 0,
            path = document.getElementById(pathId),
            pathX = path ? path.getAttribute('x') : 0,
            pathY = path ? path.getAttribute('y') : 0;

            if (backRectangle) {
                backRectangle.setAttribute('x', rectangleX);
                backRectangle.setAttribute('y', rectangleY);

                if (path) {
                    pathX = parseInt(pathX) + 2;
                    pathY = parseInt(pathY) + 3;
                    path.setAttribute('x', pathX);
                    path.setAttribute('y', pathY);
                }

            }





    }

}
