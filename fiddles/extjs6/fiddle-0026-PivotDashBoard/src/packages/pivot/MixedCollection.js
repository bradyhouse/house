/**
 *
 * This class enhances the {@link Ext.util.MixedCollection} class by allowing the
 * children objects to be destroyed on remove.
 *
 * @private
 *
 */
Ext.define('Ext.pivot.MixedCollection', {
    extend: 'Ext.util.MixedCollection',

    alternateClassName: [
        'Mz.aggregate.MixedCollection'
    ],

    removeAt: function(index){
        Ext.destroy(this.callParent(arguments));
    },

    clear: function(){
        Ext.destroy(this.items);
        this.callParent(arguments);
    },

    removeAll: function(){
        Ext.destroy(this.items);
        this.callParent(arguments);
    },

    destroy: function(){
        // destroy all objects in the items array
        this.clear();
    }
});
