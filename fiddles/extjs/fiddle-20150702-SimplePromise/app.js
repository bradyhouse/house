var meta = {
    fiddleHeader: 'Simple Promise',
    fiddleSubHeader: 'Fiddle exploring the new P' +
    '<br />'
};

Ext.Promise.all([
    new Ext.Promise(function(resolve, reject) {
        setTimeout(function() {
            resolve('foo');
        }, 200);
    }),
    Ext.Ajax.request({
        url : 'data1.json' //will take 600ms
    })
])
    .then(function(results) {
        var timeout = results[0],
            ajax    = results[1];

        console.log('timeout result', timeout);
        console.log('ajax data', Ext.decode(ajax.responseText));

        Ext.Msg.alert('Success!', 'All promises returned!');
    });



// Boiler plate
Ext.define('App.BoxModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.box',
    data: {
        header: meta.fiddleHeader,
        subheader: meta.fiddleSubHeader
    }
});
Ext.define('App.Box', {
    extend: "Ext.container.Container",
    border: true,
    padding: 25,
    viewModel: {
        type: 'box'
    },
    items: [
        {
            xtype: 'panel',
            bind: {
                title: '{header}'
            },
            items: [
                {
                    xtype: 'panel',
                    padding: 10,
                    border: false,
                    bind: {
                        html: '{subheader}'
                    }
                }
            ],
            region: 'north'
        }
    ]
});
Ext.onReady(function () {
    var fiddle = Ext.create('Fiddle.View'),
        win = Ext.create('Ext.Window', {
            title: meta.fiddleHeader,
            closable: false,
            height: 500,
            width: 700,
            layout: 'fit',
            items: fiddle
        }),
        positionX = 25,
        positionY = 192;
    win.showAt([positionX, positionY]);
    Ext.QuickTips.init();

    Ext.create('App.Box', {
        renderTo: Ext.getBody()
    });
});
