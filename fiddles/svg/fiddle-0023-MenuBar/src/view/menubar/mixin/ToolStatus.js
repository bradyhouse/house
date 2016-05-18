
app.view.menubar.mixin.ToolStatus = class {

    onToolStatusMouseOver() {
        document.getElementById('toolButton').setAttribute('fill','#ffff88');
    }

    onToolStatusMouseOut() {
        document.getElementById('toolButton').setAttribute('fill','#88ffff');
    }

    onToolStatusMouseDown() {
        return AppController.showToolMenu();
    }

}
