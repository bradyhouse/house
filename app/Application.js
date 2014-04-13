/*jslint browser: true, vars: true, plusplus: true, devel: true, nomen: true, indent: 4, maxerr: 50, todo: true, sloppy: true */
/*global: Ext, window, House */
Ext.define('House.Application', {
    name: 'House',
    extend: 'Ext.app.Application',
    requires: [
        'House.view.Viewport'
    ],
    controllers: [
        'navigation.NavigationController',
        'content.ContentController',
        'footer.FooterController',
        'properties.PropertiesController',
        'header.HeaderController',
        'account.AccountController'
    ],
    stores: [
        // TODO: add stores here
    ]
});
