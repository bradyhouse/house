/*jslint browser: true, vars: true, plusplus: true, devel: true, nomen: true, indent: 4, maxerr: 50, todo: true, sloppy: true */
/*global: Ext, window, House */
Ext.define('House.Application', {
    name: 'House',
    extend: 'Ext.app.Application',
    requires: [
        'House.view.Viewport'
    ],
    controllers: [
        'Global',
        'navigation.NavigationController',
        'content.ContentController',
        'footer.FooterController',
        'properties.PropertiesController',
        'header.HeaderController',
        'account.AccountController'
    ],
    init: function() {
        var me = this;
        if ('nocss3' in Ext.Object.fromQueryString(location.search)) {
            Ext.supports.CSS3BorderRadius = false;
            Ext.getBody().addCls('x-nbr x-nlg');
        }
        // Set the default route to start the application.
        me.setDefaultToken('all');
    }
});
