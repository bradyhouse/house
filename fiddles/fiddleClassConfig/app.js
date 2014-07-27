/* NOTE - RUN THIS FIDDLE AGAINST 4.2.1 AND IT WORKS.  
 * RUN AGAINST 5.0.0.970 AND YOU GET THE ERROR
 * "CANNOT READ PROPERTY 'VALUE' OF UNDEFINED".
 */


Ext.onReady(function() {

    Ext.define('App.SimpleClass', {
        config: {
            meaningOfLife: null
        },
        constructor: function(config) {
            if (config) {
                Ext.apply(this, config);
            }
        },
        sayHello: function() {
            if (this.getMeaningOfLife()) {
                Ext.Msg.alert('Base Class', this.getMeaningOfLife());
            } else {
                Ext.Msg.alert('What is the Meaning of Life?', 'I have no idea.');
            }
        }
    });

    Ext.define('App.ExtendedSimpleClass', {
        extend: 'App.SimpleClass',
        requires: ['App.SimpleClass'],
        config: {
            meaningOfLife: 42
        }
    });


    try {
        var myExtendedSimpleClass = new App.ExtendedSimpleClass();
        myExtendedSimpleClass.sayHello();

    } catch (e) {
        Ext.Msg.alert('Error', e);
    }

});