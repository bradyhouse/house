
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
      store: Ext.data.StoreManager.lookup('tunes'),
      trackOver: true
    }
  ]
});

