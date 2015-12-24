Ext.define('Fiddle.PivotGridController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.pivotgrid',

    exportToExcel: function(){
        this.getView().saveDocumentAs({
            title:      'Repo Export',
            fileName:   'excelExport.xml'
        });
    },
    changeDock: function(button, checked){
        if(checked) {
            this.getView().getPlugin('configurator').setDock(button.text.toLowerCase());
        }
    },
    onRender: function() {
        window.setTimeout(function() {
            var pivot = Ext.ComponentQuery.query('pivotgrid')[0];
            pivot.down('panel').collapse();
        }, 2000);
    }
});
