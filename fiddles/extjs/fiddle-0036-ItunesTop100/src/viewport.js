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
  items: (window.innerHeight <= 450) ? [{
    xtype: 'previewpanel',
    flex: 1,
    listeners: {
      store: {
        load: 'onTunesStoreLoad'
      }
    }
  }] : [{
    xtype: 'previewpanel',
    itemId: 'previewpanel',
    flex: 3
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
