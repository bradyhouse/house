
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
    padding: 0,
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
    var win = Ext.create('Ext.Window', {
          title: meta.fiddleHeader,
          closable: false,
          maximizable: true,
          resizable: true,
          height: window.innerHeight - 100,
          width: window.innerWidth - 20,
          layout: 'fit',
          items: Ext.create('Fiddle.Viewport')
      }),
      positionX = 0,
      positionY = 92;

    Ext.create('App.Box', {
        renderTo: Ext.getBody()
    });

    if (window.innerHeight <= 450) {
        win.showAt([positionX, positionY]).maximize(true).setZIndex(10);
    } else {
        win.showAt([positionX, positionY]);
        Ext.QuickTips.init();
        window.setTimeout(function () {
            win.maximize(true);
        }, 2500);
    }


    console.log("%c" + meta.consoleTag, 'font-style: italic; font-size: 20px;');
    console.log("%c" + meta.urls.github, "color: blue; font-style: italic; text-decoration: underline; background-color: #FFFF00;");
    console.group();

});
