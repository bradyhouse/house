
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
    ],
    infoWindow = new google.maps.InfoWindow();

/*****************************
 * DEFINE THE MAP CONTROL
 *****************************/
Ext.define('FiddleGMap.GMapPanel', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.gmappanel',
    requires: ['Ext.window.MessageBox'],
    initComponent : function(){
        Ext.applyIf(this,{
            plain: true,
            gmapType: 'map',
            border: false
        });

        this.callParent();
    },
    onBoxReady : function(){
        var center = this.center;
        this.callParent(arguments);
        this.createMap(center);
    },
    createMap: function(center, marker) {
        var options = Ext.apply({}, this.mapOptions),
            point = new google.maps.LatLng(41.878114, -87.629798),
        options = Ext.applyIf(options, {
            zoom: 4,
            center: point,
            mapTypeId: google.maps.MapTypeId.TERRAIN
        });
        this.gmap = new google.maps.Map(this.body.dom, options);
        if (marker) {
            this.addMarker(Ext.applyIf(marker, {
                position: center
            }));
        }

        Ext.each(this.markers, this.addMarker, this);
        this.fireEvent('mapready', this, this.gmap);
    },
    addMarker: function(marker) {
        marker = Ext.apply({
            map: this.gmap
        }, marker);

        if (!marker.position) {
            marker.position = new google.maps.LatLng(marker.lat, marker.lng);
        }
        var o =  new google.maps.Marker(marker);
        Ext.Object.each(marker.listeners, function(name, fn){
            google.maps.event.addListener(o, name, fn);
        });
        return o;
    },
    lookupCode : function(addr, marker) {
        this.geocoder = new google.maps.Geocoder();
        this.geocoder.geocode({
            address: addr
        }, Ext.Function.bind(this.onLookupComplete, this, [marker], true));
    },
    onLookupComplete: function(data, response, marker){
        if (response != 'OK') {
            Ext.MessageBox.alert('Error', 'An error occured: "' + response + '"');
            return;
        }
        this.createMap(data[0].geometry.location, marker);
    },
    afterComponentLayout : function(w, h){
        this.callParent(arguments);
        this.redraw();
    },
    redraw: function(){
        var map = this.gmap;
        if (map) {
            google.maps.event.trigger(map, 'resize');
        }
    }
});

/*****************************
 DEFINE THE MAIN CONTROLLER
 CLASS.
 ******************************/
Ext.define('FiddleGMap.MainController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.main'
})

/*****************************
 DEFINE THE MAIN VIEW MODEL.
 NOTE - YOU CANNOT USE A
 VIEW CONTROLLER WITHOUT A
 VIEWMODEL.
 ******************************/
Ext.define('FiddleGMap.MainModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.main',
    data: {
        name: 'Google Map API.'
    }
});

/*****************************
 DEFINE THE MAIN CONTAINER.
 *****************************/
Ext.define('FiddleGMap.Main', {
    extend: "Ext.container.Container",
    border:	true,
    padding: 10,
    controller: 'main',
    viewModel: {
        type: 'main'
    },
    initComponent: function() {
        var me = this;
        Ext.each(me.items,function(item) {
                item.style = {
                    backgroundColor: "#f4f4f",
                    border:	"1px solid #333"
                };
                item.padding = 10;
            }
        );
        me.callParent();
    },
    onRender: function() {
        var me = this;
        me.callParent(arguments);
        if(me.border){
            me.el.setStyle("border","1px solid #333");
        }
    },
    items: [{
        xtype: 'panel',
        bind: {
            title: '{name}'
        },
        region: 'north'
    }, {
        xtype: 'gmappanel',
        region: 'center',
        height: 450,
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
                    Ext.Msg.alert('', locations[0][0]);
                }
            }
        }]
    }]

});

/*****************************
 ONCE EXT IS READY, CONFIGURE
 EXT'S AJAX SETTINGS, CREATE
 AN INSTANCE OF THE STORE AND
 THE MAIN CONTAINER.
 ******************************/
Ext.onReady(function() {
    Ext.create('FiddleGMap.Main', {
        renderTo: Ext.getBody()
    });
});
