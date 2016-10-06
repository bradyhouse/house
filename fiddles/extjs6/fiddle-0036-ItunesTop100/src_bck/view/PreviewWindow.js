Ext.define('tunes.view.PreviewWindow', {
    extend: 'Ext.window.Window',
    resizable: false,
    title: 'My Window',
    modal: true,

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            tpl: [
                '<video autoplay preload="auto">',
                '    <source src="{preview}" type="video/mp4" > ',
                '</video>'
            ]
        });

        me.callParent(arguments);
    }

});
