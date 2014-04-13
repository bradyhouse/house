/*jslint browser: true, vars: true, plusplus: true, devel: true, nomen: true, indent: 4, maxerr: 50, todo: true, sloppy: true */
/*global: Ext, window, House */
Ext.define('House.model.account.User', {
    extend: 'Ext.data.Model',
    
    fields: [
        { name: 'id', type: 'int' },
        { name: 'login', type: 'auto' },
        { name: 'password', type: 'auto' },
        { name: 'firstName', type: 'auto' },
        { name: 'lastName', type: 'auto' },
        { name: 'address1', type: 'auto' },
        { name: 'address2', type: 'auto' },
        { name: 'city', type: 'auto' },
        { name: 'state', type: 'auto' },
        { name: 'country', type: 'auto' },
        { name: 'zip', type: 'int' },
        { name: 'phonenumber', type: 'auto' },
        { name: 'email', type: 'auto' },
        { name: 'birthdate', type: 'auto' },
        { name: 'pageUrl', type: 'auto' },
        { name: 'isPublic', type: 'boolean' },
        { name: 'fatherId', type: 'int' },
        { name: 'motherId', type: 'int' },
        { name: 'created', type: 'date' }

    ]
});
