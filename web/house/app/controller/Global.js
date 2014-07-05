Ext.define('House.controller.Global', {
    extend: 'Ext.app.Controller',
    requires: [
        'House.view.*',
        'Ext.window.*'
    ],

    stores: [
    ],

    config: {
        routes  : {
            ':id': {
                action: 'handleRoute',
                before: 'beforeHandleRoute'
            }
        }
    },

    beforeHandleRoute: function(id, action) {
        this.redirectTo(me.getApplication().getDefaultToken());
    },

    handleRoute: function(id) {

    }
});