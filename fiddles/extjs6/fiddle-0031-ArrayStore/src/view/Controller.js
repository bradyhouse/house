Ext.define('Fiddle.view.Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.fiddlecontroller',
    isItemSelectorController: true,
    onAfterRender: function() {
        var view = this.getView().down('itemselector'),
            store = view.getStore();

        window.setTimeout(function() {
            view.setValue(store.data.first());
        }, 1000);
    }
});
