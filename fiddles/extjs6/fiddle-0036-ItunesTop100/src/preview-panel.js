Ext.define('Fiddle.PreviewPanel', {
  extend: 'Ext.panel.Panel',
  xtype: 'previewpanel',
  itemCls: 'video',
  constructor: function(config) {
    var me = this,
      store = Ext.data.StoreManager.lookup('tunes');
    if (!store) {
      config.store = new Fiddle.Tunes({
        storeId: 'tunes'
      });
    }
    this.callParent([config]);
  },
  initComponent: function() {
    var me = this;
    Ext.applyIf(me, {
      tpl: [
        '<video id="videoPlayer" autoplay preload="auto" controls style="width: 100%; height: 100%; background-color: black;">',
        '    <source src="{preview}" type="video/mp4" > ',
        '</video>'
      ]
    });
    me.callParent(arguments);
    console.log('next step');
  }
});
