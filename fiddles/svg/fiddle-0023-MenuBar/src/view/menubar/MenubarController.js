
app.view.menubar.MenubarController = class extends app.ViewController {
    constructor() {
        super({
           name: 'MenubarController',
           mixins: [
               'app.view.menubar.mixin.ToolStatus',
               'app.view.menubar.mixin.ToolMenuOuterBorder',
               'app.view.menubar.mixin.ToolMenuItem',
               'app.view.menubar.mixin.ToolButton'
           ]
        });
    }
}
