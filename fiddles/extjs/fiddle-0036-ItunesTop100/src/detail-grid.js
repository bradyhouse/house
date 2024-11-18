
Ext.define('Fiddle.DetailGrid', {
    extend: 'Ext.grid.Panel',
    requires: [
      'Fiddle.Tunes'
    ],
    xtype: 'detailgrid',
    columns: [
        {
            xtype: 'gridcolumn',
            dataIndex: 'title',
            text: 'Title',
            flex: 1
        },
        {
            xtype: 'gridcolumn',
            dataIndex: 'artist',
            text: 'Artist',
            flex: 1
        },
        {
            xtype: 'gridcolumn',
            dataIndex: 'category',
            text: 'Category'
        },
        {
            xtype: 'numbercolumn',
            width: 60,
            dataIndex: 'price',
            text: 'Price'
        },
        {
            xtype: 'templatecolumn',
            tpl: [
                '<a href="{link}" target="itunes_store">',
                '    <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/297733/badge_itunes-sm.gif" />',
                '</a>'
            ],
            width: 60,
            dataIndex: 'link',
            text: 'Link'
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

