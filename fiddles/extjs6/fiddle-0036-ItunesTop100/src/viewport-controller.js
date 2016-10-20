Ext.define('Fiddle.ViewportController', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.viewport',
  refs: [
    {
      ref: 'grid',
      selector: '#grid'
    },
    {
      ref: 'imagegrid',
      selector: '#imagegrid'
    }
  ],
  init: function(application) {
    this.control({
      '#grid, #imagegrid': {
        itemdblclick: this.onItemDblClick,
        select: this.onRecordSelect
      }
    });
  },
  onItemDblClick: function(component, record) {
    var win = Ext.create('Fiddle.PreviewWindow', {
      title: record.get('title') + ', provided courtesy of iTunes',
      width: 853,
      height: 480,
      itemCls: 'video'
    });
    win.update(record.data);
    win.show();


  },
  onRecordSelect: function(component, record) {
    var view = this.getView(),
        preview = view.items.items[0],
        grid = view.items.items[1],
        previewDataView = preview.items.items[0],
        gridDataView = grid.items.items[0];

    previewDataView.getSelectionModel().select(record);
    gridDataView.getSelectionModel().select(record);
  }

});