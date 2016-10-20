Ext.define('Fiddle.Viewport', {
  extend: 'Ext.panel.Panel',
  requires: [
    'Fiddle.ViewportController',
    'Fiddle.DetailGrid',
    'Fiddle.ImageGrid',
    'Fiddle.PreviewWindow'
  ],
  controller: 'viewport',
  layout: {
    align: 'stretch',
    type: 'vbox'
  },
  items: [{
    xtype: 'imagegrid',
    flex: 1
  }, {
    xtype: 'detailgrid',
    itemId: 'grid',
    flex: 1
  }]
});