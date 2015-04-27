Ext.onReady(function () {
    Ext.create('Ext.container.Viewport', {
        layout: 'border',
        items: [
            {
                region: 'north',
                html: Ext.getDom('headerCont').innerHTML,
                border: false,
                margins: '0 0 5 0',
                dockedItems: [
                    {
                        xtype: 'toolbar',
                        itemId: 'navToolbar',
                        dock: 'bottom',
                        ui: 'footer'
                    }
                ]
            }, {
                region: 'center',
                xtype: 'container',
                autoScroll: true,
                styleHtmlContent: true,
                defaults: {
                    xtype: 'panel',
                    padding: '5px',
                    margins: '0 0 5 0',
                    collapsible: true,
                    styleHtmlContent: true,
                    autoScroll: true
                }
            }, {
                region: 'south',
                xtype: 'container',
                collapsible: true,
                html: Ext.getDom('footer').innerHTML,
                split: true,
                height: 25
            }
        ]
    });
    var buttons = Ext.get(Ext.getDom('links')).dom.children[0],
        list = Ext.get(buttons).child('ul').dom.children,
        toolbar = Ext.ComponentQuery.query('toolbar#navToolbar')[0],
        posts = Ext.get(Ext.getDom('contentCont')).dom.children,
        panel = Ext.ComponentQuery.query('container[region=center]')[0];

    Ext.Array.each(list, function (li) {
        toolbar.add({
            text: Ext.get(li).dom.children[0].firstChild.data,
            href: Ext.get(li).dom.children[0].href,
            hrefTarget: '_self'
        });
    });
    Ext.Array.each(posts, function (post) {
        panel.add({
            title: Ext.get(post).child('div#title').getHtml(),
            html: post.innerHTML
        })
    });
});