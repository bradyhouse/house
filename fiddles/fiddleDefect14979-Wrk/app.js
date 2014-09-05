Ext.onReady(function() {
    var vMajor = 4;
    try {
        vMajor = Ext.getVersion().parts[0];
    } catch (err) {
        console.log(err);
    }
    if (vMajor === 5) {
        Ext.define('MyFiddle.view.MyButton', {
            extend: 'Ext.button.Button',
            alias: 'widget.mybutton',
            enableToggle: true,
            scale: 'small',
            text: 'Not Clicked',
            // <5.0_Required>
            cls: '',
            ui: 'default',
            onRender: function() {
                this.setUI('off-small');
                this.callParent();
            },
            // </5.0_Required>
            onClick: function() {
                var me = this;
                if (me.text === 'Not Clicked') {
                    me.setText('Clicked');
                    me.setUI('on-small');
                } else {
                    me.setText('Not Clicked');
                    me.setUI('off-small');
                }
            }
        });
    } else {
        Ext.define('MyFiddle.view.MyButton', {
            extend: 'Ext.button.Button',
            alias: 'widget.mybutton',
            enableToggle: true,
            ui: 'off',
            scale: 'small',
            text: 'Not Clicked',
            onClick: function() {
                var me = this;
                if (me.text === 'Not Clicked') {
                    me.setText('Clicked');
                    me.setUI('on');
                } else {
                    me.setText('Not Clicked');
                    me.setUI('off');
                }
            }
        });
    }
    Ext.define("MyFiddle.view.Main", {
        extend: 'Ext.container.Container',
        alias: 'widget.main',
        height: 52,
        layout: {
            type: 'hbox',
            align: 'middle'
        },
        items: [{
            xtype: 'mybutton'
        }]
    });
    Ext.create('MyFiddle.view.Main', {
        renderTo: Ext.getBody()
    });





});