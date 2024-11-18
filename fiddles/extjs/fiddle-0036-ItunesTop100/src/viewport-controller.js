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
    if (window == window.top || window.innerHeight > 450) {
      this.control({
        '#grid': {
          itemdblclick: this.onItemDblClick
        }
      });
    }
  },

  onItemDblClick: function(component, record) {
    var view = this.getView(),
      preview = view.items.items[0];
    preview.update(record.data);
  },

  onTunesStoreLoad: function(store, records, successful, operation, node) {
    var view = this.getView(),
      preview = view.items.items[0],
      firstRecord = store.data.first();
    preview.update(firstRecord);
  }

});
