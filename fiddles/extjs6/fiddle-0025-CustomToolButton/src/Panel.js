Ext.define('Fiddle.Panel', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.dummypanel',
    collapsible: true,

    /*requires: [
        'Fiddle.Tooltip'
    ],*/
    tools: [{
        type: 'restore',
        tooltip: 'restore',
        onMouseOver: function() {
            var panel = this.up('panel'),
                container = panel ? panel.up('panel') : null,
                lastPanel = container ? container.items.last() : null;

            if (lastPanel && lastPanel.id == panel.id && panel.collapsed) {
               this.setTooltip(null);
            } else {
                if (this.disabled) {
                    return false;
                }
                this.el.addCls(this.toolOverCls);
            }
        }
    }],
    height: 200,
    html: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut <br />labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris <br />nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
});
