/**
 * This is the base class for a file object. This one should be extended
 * by classes that generate content based on templates.
 *
 */
Ext.define('Ext.exporter.file.Base', {
    requires: [
        'Ext.XTemplate',
        'Ext.util.Collection'
    ],

    config: {
        /**
         * @cfg {String} id
         *
         * Unique id for this object. Auto generated when missing.
         */
        id: ''
    },

    tpl: null,

    constructor: function(config){
        var me = this;

        me.initConfig(config || {});
        return me.callParent(arguments);
    },

    applyId: function(data, id){
        if(Ext.isEmpty(id)){
            id = Ext.id();
        }
        if(!Ext.isEmpty(data)){
            id = data;
        }
        return id;
    },

    /**
     * This method could be used in config appliers that need to initialize a
     * Collection that has items of type className.
     *
     * @param data
     * @param dataCollection
     * @param className
     * @returns {*}
     */
    checkCollection: function(data, dataCollection, className){
        if(!dataCollection){
            dataCollection = this.constructCollection(className);
        }

        if(data){
            dataCollection.add(data);
        }

        return dataCollection;
    },

    /**
     * Create a new Collection with a decoder for the specified className.
     *
     * @param className
     * @returns {Ext.util.Collection}
     *
     * @private
     */
    constructCollection: function(className){
        return new Ext.util.Collection({
            decoder: this.getCollectionDecoder(className)
        });
    },

    /**
     * Builds a Collection decoder for the specified className.
     *
     * @param className
     * @returns {Function}
     *
     * @private
     */
    getCollectionDecoder: function(className){
        return function(config){
            return Ext.create(className, config || {});
        };
    },

    /**
     * Renders the content according to the template provided to the class
     *
     * @returns {String}
     */
    render: function(){
        return this.tpl ? Ext.XTemplate.getTpl(this, 'tpl').apply(this.getRenderData()) : '';
    },

    /**
     * Return the data used when rendering the template
     *
     * @returns {Object}
     */
    getRenderData: function(){
        return this.getConfig();
    }
});
