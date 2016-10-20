
Ext.define('Fiddle.DetailGrid', {
    extend: 'Ext.grid.Panel',
    store: Ext.data.StoreManager.lookup('tunes'),
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
                '    <img src="resources/images/badge_itunes-sm.gif" />',
                '</a>'
            ],
            width: 60,
            dataIndex: 'link',
            text: 'Link'
        }
    ]
});

