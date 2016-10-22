Ext.define('Fiddle.ViewportController', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.viewport',
  refs: [
    {
      ref: 'grid',
      selector: '#grid'
    }
  ],
  init: function(application) {
    this.control({
      '#grid, #previewpanel': {
        itemdblclick: this.onItemDblClick,
        select: this.onRecordSelect
      }
      });
  },

  onItemDblClick: function(component, record) {
    var view = this.getView(),
      preview = view.items.items[0];
    preview.update(record.data);
  },

  onRecordSelect: function(component, record) {
    var view = this.getView(),
      grid = view.items.items[1],
      gridDataView = grid.items.items[0];
    gridDataView.getSelectionModel().select(record);
  },

  onTunesStoreLoad: function(store, records, successful, operation, node) {
    var view = this.getView(),
      preview = view.items.items[0],
      grid = view.items.items[1],
      firstRecord = store.data.first();
    preview.update(firstRecord);
  }

});
