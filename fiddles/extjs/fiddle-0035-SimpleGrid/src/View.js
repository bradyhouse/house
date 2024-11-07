
Ext.define('Fiddle.View', {
    extend: 'Ext.grid.Panel',
    store: Ext.data.StoreManager.lookup('records'),
    columns: [
        { text: 'Title', flex: 2, dataIndex: 'title' },
        { text: 'Link', flex: 1,  dataIndex: 'link' },
        { text: 'Description', flex: 1, dataIndex: 'desc' }
    ]
});

