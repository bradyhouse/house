Ext.define('Overrides.panel.Tool', {
    override: 'Ext.panel.Tool',
    privates: {
        onMouseOver: function() {
            var panel = this.up('panel'),
                container = panel ? panel.up('panel') : null,
                lastPanel = container ? container.items.last() : null;

            if (lastPanel && lastPanel.id == panel.id && panel.collapsed) {
                this.el.dom.removeAttribute('data-qtip');
            }
            if (this.disabled) {
                return false;
            }
            this.el.addCls(this.toolOverCls);
        }
    }
});
