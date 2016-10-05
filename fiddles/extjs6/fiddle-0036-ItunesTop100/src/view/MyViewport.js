Ext.define('tunes.view.MyViewport', {
    extend: 'Ext.container.Viewport',

    itemId: 'tunesView',
    layout: {
        align: 'stretch',
        type: 'vbox'
    },

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'gridpanel',
                    flex: 1,
                    itemId: 'tunesGrid',
                    title: 'Itunes Grid',
                    store: Ext.data.StoreManager.lookup('MyStore'),
                    viewConfig: {
                        itemId: 'tunesGrid'
                    },
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
                },
                {
                    xtype: 'panel',
                    flex: 1,
                    autoScroll: true,
                    layout: {
                        type: 'fit'
                    },
                    title: 'Itunes Music Videos',
                    items: [
                        {
                            xtype: 'dataview',
                            itemId: 'tunesView',
                            itemCls: 'video',
                            itemSelector: 'div',
                            itemTpl: [
                                '<figure>',
                                '    <img src="{image}" />',
                                '    <figcaption>{title}<br />{artist}</figcaption>',
                                '</figure>'
                            ],
                            overItemCls: 'overvideo',
                            store: 'Tunes',
                            trackOver: true
                        }
                    ]
                }
            ]
        });

        me.callParent(arguments);
    }

});
