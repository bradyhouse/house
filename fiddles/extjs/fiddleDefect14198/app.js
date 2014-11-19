/* NOTE - RUN THIS FIDDLE AGAINST 4.2.1 AND IT WORKS.  
 * RUN AGAINST 5.0.0.970 AND YOU GET THE ERROR
 * "CANNOT READ PROPERTY 'VALUE' OF UNDEFINED".
 */

Ext.onReady(function () {

    Ext.define('App.Filter', {
        extend: 'Ext.util.Filter',
        id: 'nameFilter',
        filterFn: function (item) {
            return item.name.length > 4;
        }
    });

    try {
        var allNames = new Ext.util.MixedCollection(),
            longNames = [],
            nameFilter = {};
        allNames.addAll([{
            id: 1,
            name: 'Ed',
            age: 25
        }, {
            id: 2,
            name: 'Jamie',
            age: 37
        }, {
            id: 3,
            name: 'Abe',
            age: 32
        }, {
            id: 4,
            name: 'Aaron',
            age: 26
        }, {
            id: 5,
            name: 'David',
            age: 32
        }]);
        nameFilter = new App.Filter();
        longNames = allNames.filter(nameFilter);
        Ext.Msg.alert('Status', 'longNames contains ' + longNames.length + ' records.');
    } catch (e) {
        Ext.Msg.show(e);
    }

});