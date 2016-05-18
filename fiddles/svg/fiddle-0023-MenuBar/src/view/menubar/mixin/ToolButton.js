
app.view.menubar.mixin = class {

    onToolButtonMouseOver(btn) {
        btn.setAttribute('fill','#ffff88');
    }

    onToolButtonMouseOut(btn) {
        btn.setAttribute('fill','#88ffff');
    }

    onToolButtonMouseDown() {
        return showToolMenu();
    }

    showToolMenu() {
        var toolMenu = document.getElementById("toolMenu");
        toolMenu.setAttribute('visibility','visible');
        document.getElementById('toolButton').setAttribute('fill','#88ffff');
    }

}
