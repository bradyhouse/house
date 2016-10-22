Ext.define('Fiddle.PreviewPanel', {
  extend: 'Ext.panel.Panel',
  xtype: 'previewpanel',
  itemCls: 'video',
  initComponent: function() {
    var me = this;
    Ext.applyIf(me, {
      tpl: [
        '<video autoplay preload="auto" controls style="width: 100%; height: 95%; background-color: black;">',
        '    <source src="{preview}" type="video/mp4" > ',
        '</video>'
      ]
    });
    me.callParent(arguments);
  }
});
