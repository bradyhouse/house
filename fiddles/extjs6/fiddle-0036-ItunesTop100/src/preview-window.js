Ext.define('Fiddle.PreviewWindow', {
  extend: 'Ext.window.Window',
  resizable: true,
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