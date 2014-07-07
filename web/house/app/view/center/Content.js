/*jslint browser: true, vars: true, plusplus: true, devel: true, nomen: true, indent: 4, maxerr: 50, todo: true, sloppy: true */
/*global: Ext, window, House */
Ext.define("House.view.center.Content", {
    extend: 'Ext.panel.Panel',
    alias: 'widget.content',
    requires: [
      'House.view.center.google.GMapPanel',
      'House.view.center.ContentController',
      'House.view.center.ContentModel'
    ],
    controller: 'content',
    viewModel: {
        type: 'content'
    },
    layout: {
        type: 'table',
        columns: 1,
        tdAttrs: { style: 'padding: 0px; vertical-align: top;' }
    },

    defaults: {
        xtype: 'panel',
        layout: 'fit',
        bodyPadding: 0
    },
    initComponent: function() {
        var iconImg = new google.maps.MarkerImage(
            'http://www.houseknecht.com/2011/images/marker-images/image.png',
            new google.maps.Size(40,40),
            new google.maps.Point(0,0),
            new google.maps.Point(20,40)
            ),
            iconShadow = new google.maps.MarkerImage(
                'http://www.houseknecht.com/2011/images/marker-images/shadow.png',
                new google.maps.Size(64,40),
                new google.maps.Point(0,0),
                new google.maps.Point(20,40)
            ),
            shape = {
                coord: [22,1,23,2,23,3,23,4,23,5,23,6,23,7,22,8,21,9,21,10,22,11,23,12,24,13,25,14,26,15,27,16,28,17,27,18,21,19,21,20,21,21,21,22,21,23,21,24,22,25,22,26,22,27,23,28,23,29,23,30,24,31,24,32,24,33,25,34,25,35,25,36,25,37,12,37,12,36,12,35,13,34,13,33,13,32,14,31,14,30,14,29,15,28,15,27,15,26,16,25,16,24,16,23,17,22,17,21,17,20,17,19,10,18,10,17,10,16,11,15,12,14,13,13,14,12,15,11,16,10,16,9,15,8,14,7,14,6,14,5,14,4,14,3,15,2,16,1,22,1],
                type: 'poly'
            },
            locations = [
                ['<p> <b>brady</b> <br /> Chicago</p>', 41.8781136, -87.6297982, 2, 'efbdad6e-cf89-4d16-8cb8-ce32a80e8a05', 'brady']
            ];
        this.setLoading(true);
        this.items = [{
            xtype: 'gmappanel',
            reference: 'map',
            width:  1024,
            height: 768,
            markers: [{
                lat: 41.86537,
                lng: -87.62372,
                draggable: true,
                raiseOnDrag: false,
                icon: iconImg,
                shadow: iconShadow,
                shape: shape,
                listeners: {
                    click: function (e) {
                        Ext.Msg.show({
                            title: '',
                            msg: locations[0][0],
                            modal: false,
                            buttons: Ext.Msg.OK,
                            icon: Ext.Msg.INFO,
                            width: 300
                        });
                    }
                }
            }],
            listeners: {
                afterrender: 'onMapRender',
                resize: 'onMapResize'
            }
        }];
        this.callParent();
    },
    stretch: function(map) {
        var me = this,
            width = me.getEl().getWidth(),
            height = me.getEl().getHeight(),
            mapEl = map.getEl();
        map.setWidth(width);
        map.setHeight(height);
        map.redraw();
    }
});