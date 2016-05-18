

app.view.menubar.mixin.ToolMenuOuterBorder = class {

    onToolMenuMouseOut() {
        return Util.hide(document.getElementById('toolMenu'));
    }

}
