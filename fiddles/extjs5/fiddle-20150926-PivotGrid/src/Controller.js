/**
 * Created by bradyhouse on 9/17/15.
 */
Ext.define('Fiddle.Controller', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.fiddle',

    exportToExcel: function(){
        this.getView().saveDocumentAs({
            title:      'Pivot grid export demo',
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
