
app.view.menubar.mixin.ToolMenuItem = class {

    onToolMenuItemSelect(shape) {
        var toolStatus = document.getElementById("toolStatus");
        for (var i in app.controller.toolMenuItems){
            var toolMenuItem=app.controller.toolMenuItems[i];
            if (shape==toolMenuItem) {
                toolStatus.firstChild.remove();
                toolStatus.appendChild(document.createTextNode(toolMenuItem));
                app.controller.chosenToolMenuItem = toolMenuItem;
            }
        }
        return AppController.hide(document.getElementById('toolMenu'));
    }

    onToolMenuItemMouseOver(itemId) {
        document.getElementById(itemId).setAttribute('fill','red');
    }

    onToolMenuItemMouseOut(itemId) {
        document.getElementById(itemId).setAttribute('fill','black');
    }

}
