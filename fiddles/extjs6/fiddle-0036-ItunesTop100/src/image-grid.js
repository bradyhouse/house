
Ext.define('Fiddle.ImageGrid', {
  extend: 'Ext.panel.Panel',
  xtype: 'imagegrid',
  autoScroll: true,
  layout: {
    type: 'fit'
  },
  items: [
    {
      xtype: 'dataview',
      itemId: 'imagegrid',
      itemCls: 'video',
      itemSelector: 'div',
      itemTpl: [
        '<figure>',
        '    <img src="{image}" />',
        '    <figcaption title="{title}">{tag}</figcaption>',
        '</figure>'
      ],
      overItemCls: 'overvideo',
      trackOver: true
    }
  ],
  constructor: function(config) {
    let store = Ext.data.StoreManager.lookup('tunes');
    if (store) {
      config.store = store;
    } else {
      config.store = new Fiddle.Tunes({
        storeId: 'tunes'
      });
    }
    this.callParent([config]);
  }

});

