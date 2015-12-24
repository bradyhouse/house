
class AppController {
    static onEmptyFn() {
        return true;
    }

    static onSurfaceLoad(evt) {
        console.log('onSurfaceLoad');
        console.log(evt);
    }

    static onPathMouseDown(evt, id) {
        console.log('onPathMouseDown');
        if (!app.controller.selectedShape) {
            app.controller.selectShape(evt, id);
        }
    }

    static onPathMouseOver(evt, id) {
        console.log('onPathMouseOver');

        var opacity = '';

        if (id === 'over') {
            opacity = app.controller.selectedShape.getAttribute('opacity');
            app.controller.selectedShape.setAttribute('stroke', 'red');
            app.controller.selectedShape.setAttribute('stroke-width', 3);
            app.controller.selectedShape.setAttribute('opacity', 3 * opacity / 4);
        }
    }

    static onPathMouseOut(evt, id) {
        console.log('onPathMouseOut');
        console.log(id);
    }

    static onShapeGroupMouseDown(evt) {
        console.log('onGroupMouseDown');
        console.log(evt);
    }

    static onTextMouseDown(evt) {}

    static onTextMouseOver(evt) {}

    static onTextMouseOut(evt) {}

    static onTextClick(evt) {}

    static selectShape(evt, id) {
        var shapesGroup = document.getElementById('shapesGroup'),
            groupTransform = Util.splitAttribute('shapesGroup', 'transform', 'translate(0,0)'),
            oldX = evt.clientX - parseInt(groupTransform[1]),
            oldY = evt.clientY - parseInt(groupTransform[2]);

        app.controller.selectedShape = document.getElementById(id);
        app.controller.selectedShape.setAttribute('onmouseup', "app.controller.onSelectedShapeMouseUp()");
        app.controller.selectedShape.setAttribute('stroke-width', 2);
        app.controller.selectedShape.setAttribute('stroke', 'yellow');

        shapesGroup.setAttribute('onmousemove', 'app.controller.onSelectedShapeDrag(evt,' + oldX + ', ' + oldY + ')');
    }

    static onSelectedShapeDrag(evt, x, y) {
        console.log('onSelectedShapeDrag');

        var shapesGroup = document.getElementById('shapesGroup'),
            deltaX = evt.clientX - x,
            deltaY = evt.clientY - y,
            shapeTransform = "translate(" + deltaX + "," + deltaY + ")";

        app.controller.selectedShape.setAttribute("transform", shapeTransform);
        shapesGroup.setAttribute('onmouseup', 'app.controller.onSelectedShapeDrop()');

        app.controller.selectedShape.setAttribute("onmouseup", null);
    }

    static onSelectedShapeDrop() {
        console.log('onSelectedShapeDrop');
        var shapesGroup = document.getElementById('shapesGroup');

        shapesGroup.setAttribute('onmousemove', null);
        shapesGroup.setAttribute('onmouseup', null);

        app.controller.selectedShape.setAttribute('mouseover', null);
        app.controller.selectedShape.setAttribute('mousemove', null);
        app.controller.selectedShape.setAttribute('stroke-width', '1');
        app.controller.selectedShape.setAttribute('stroke', 'black');
        app.controller.selectedShape = null;
    }

    static onSelectedShapeMouseUp() {
        console.log('onSelectedShapeMouseUp');

        var shapesGroup = document.getElementById('shapesGroup');

        app.controller.selectedShape.setAttribute('stroke-width', 2);
        app.controller.selectedShape.setAttribute('stroke', 'red');

        shapesGroup.setAttribute('onkeyup', 'app.controller.onShapeGroupKeyUp(evt);');
        shapesGroup.setAttribute('onmousemove', null);
        shapesGroup.setAttribute('onmouseup', null);
    }

    static onShapeGroupKeyUp(evt) {
        console.log('onShapeGroupKeyUp');
    }

    static onToolButtonMouseOver(btn) {
        btn.setAttribute('fill', '#ffff88');
    }

    static onToolButtonMouseOut(btn) {
        btn.setAttribute('fill', '#88ffff');
    }

    static onToolButtonMouseDown() {
        return AppController.showToolMenu();
    }

    static onToolStatusMouseOver() {
        document.getElementById('toolButton').setAttribute('fill', '#ffff88');
    }

    static onToolStatusMouseOut() {
        document.getElementById('toolButton').setAttribute('fill', '#88ffff');
    }

    static onToolStatusMouseDown() {
        return AppController.showToolMenu();
    }

    static showToolMenu() {
        var toolMenu = document.getElementById("toolMenu");
        toolMenu.setAttribute('visibility', 'visible');
        document.getElementById('toolButton').setAttribute('fill', '#88ffff');
    }

    static hide(obj) {
        obj.setAttribute('visibility', 'hidden');
    }

    static onToolMenuMouseOut() {
        return AppController.hide(document.getElementById('toolMenu'));
    }

    static onToolMenuItemSelect(shape) {
        var toolStatus = document.getElementById("toolStatus");
        for (var i in app.controller.toolMenuItems) {
            var toolMenuItem = app.controller.toolMenuItems[i];
            if (shape == toolMenuItem) {
                toolStatus.firstChild.remove();
                toolStatus.appendChild(document.createTextNode(toolMenuItem));
                app.controller.chosenToolMenuItem = toolMenuItem;
            }
        }
        return AppController.hide(document.getElementById('toolMenu'));
    }

    static onToolMenuItemMouseOver(itemId) {
        document.getElementById(itemId).setAttribute('fill', 'red');
    }

    static onToolMenuItemMouseOut(itemId) {
        document.getElementById(itemId).setAttribute('fill', 'black');
    }

}

