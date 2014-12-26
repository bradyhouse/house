Ext.onReady(function() {
    Ext.define("MyApp.test.LifecycleExample", {
        extend: "Ext.Component",
        initComponent: function() {
            var me = this;
            me.width = 200;
            me.height = 100;
            me.html = {
                tag: 'div',
                html: 'X',
                style: {
                    'float': 'right',
                    'padding': '10px',
                    'background-color': '#e00',
                    'color': '#fff',
                    'font-weight': 'bold'
                }
            };

            me.myOwnProperty = [1, 2, 3, 4];
            me.callParent();
            Ext.DomHelper.append(Ext.Element.get("divOutput"), {
                html: '1. initComponent<br>'
            });
        },
        beforeRender: function() {
            Ext.DomHelper.append(Ext.Element.get("divOutput"), {
                html: '2. beforeRender<br>'
            });
            this.callParent(arguments);
        },

        onRender: function() {
            Ext.DomHelper.append(Ext.Element.get("divOutput"), {
                html: '3. onRender<br>'
            });
            this.callParent(arguments);
            this.el.setStyle('background-color', '#ccc');
        },

        afterRender: function() {
            Ext.DomHelper.append(Ext.Element.get("divOutput"), {
                html: '4. afterRender<br>'
            });
            this.el.down('div').on('click', this.myCallback, this);
            this.callParent(arguments);
        },

        beforeDestroy: function() {
            Ext.DomHelper.append(Ext.Element.get("divOutput"), {
                html: '5. beforeDestroy<br>'
            });
            this.callParent(arguments);
        },

        onDestroy: function() {
            Ext.DomHelper.append(Ext.Element.get("divOutput"), {
                html: '6. onDestroy<br>'
            });
            delete this.myOwnProperty;
            this.el.down('div').un('click', this.myCallback);
            this.callParent(arguments);
        },

        myCallback: function() {
            var me = this;
            Ext.Msg.confirm('Confirmation', 'Are you sure want to close this panel?', function(btn) {
                if (btn === 'yes') {
                    me.destroy();
                }
            });
        }
    });

    Ext.create('MyApp.test.LifecycleExample', {
        renderTo: Ext.getBody()
    });
});