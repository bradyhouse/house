Ext.define('Fiddle.Viewport', {
  extend: 'Ext.panel.Panel',
  requires: [
    'Fiddle.ViewportController',
    'Fiddle.DetailGrid',
    'Fiddle.ImageGrid',
    'Fiddle.PreviewPanel',
    'Ext.resizer.Splitter'
  ],
  controller: 'viewport',
  layout: {
    align: 'stretch',
    type: 'vbox'
  },
  items: [{
    xtype: 'previewpanel',
    itemId: 'previewpanel',
    flex: 2
  }, {
    xtype: 'splitter'
  }, {
    xtype: 'detailgrid',
    itemId: 'grid',
    listeners: {
      store: {
        load: 'onTunesStoreLoad'
      }
    },
    flex: 1
  }]
});
