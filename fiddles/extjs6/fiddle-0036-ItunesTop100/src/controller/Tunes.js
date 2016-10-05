Ext.define('tunes.controller.Tunes', {
    extend: 'Ext.app.Controller',
	 refs: [
        {
            ref: 'grid',
            selector: '#tunesGrid'
        },
        {
            ref: 'dataView',
            selector: '#tunesView'
        }
    ],
    init: function(application) {
        this.control({
            "#tunesGrid, #tunesView": {
                itemdblclick: this.onItemDblClick,
				select: this.onRecordSelect
            }
        });
    },

    onItemDblClick: function(component, record) {
        var w = Ext.create('tunes.view.PreviewWindow', {title: record.get('title') + ', provided courtesy of iTunes'});
        w.update(record.data);
        w.show();
    },

	onRecordSelect: function(component, record) {
        this.getDataView().getSelectionModel().select(record);
        this.getGrid().getSelectionModel().select(record);
    }

});
