/*jslint browser: true, vars: true, plusplus: true, devel: true, nomen: true, indent: 4, maxerr: 50, todo: true, sloppy: true */
/*global: Ext, window, House */
Ext.define('House.controller.content.ContentController', {
    extend: 'Ext.app.Controller',
    init: function (ctrl) {
        var me = this;
        me.addRefs(ctrl);
        me.addListeners(ctrl);
    },
    addRefs: function (ctrl) {
        ctrl.addRef([{
            ref: 'content',
            selector: 'content'
        }, {
            ref: 'navigation',
            selector: 'navigation'
        }, {
            ref: 'properties',
            selector: 'properties'
        }
        ]);
    },
    addListeners: function (ctrl) {
        var me = this;
        ctrl.listen({
            component: {
                content: {
                    click: me.onContentFocus
                }
            }
        });
    },
    onContentFocus: function () {
        var me = this;
        me.navigation.collapse();
        me.properties.collapse();
        me.callParent(arguments);
    }
});
