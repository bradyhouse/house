/*****************************
 * DEFINE VAR'S USED TO
 * CONFIGURE THE MAP MARKER
 *****************************/
var iconImg = new google.maps.MarkerImage('http://www.houseknecht.com/2011/images/marker-images/image.png',
new google.maps.Size(40, 40),
new google.maps.Point(0, 0),
new google.maps.Point(20, 40)),
    iconShadow = new google.maps.MarkerImage('http://www.houseknecht.com/2011/images/marker-images/shadow.png',
    new google.maps.Size(64, 40),
    new google.maps.Point(0, 0),
    new google.maps.Point(20, 40)),
    shape = {
        coord: [22, 1, 23, 2, 23, 3, 23, 4, 23, 5, 23, 6, 23, 7, 22, 8, 21, 9, 21, 10, 22, 11, 23, 12, 24, 13, 25, 14, 26, 15, 27, 16, 28, 17, 27, 18, 21, 19, 21, 20, 21, 21, 21, 22, 21, 23, 21, 24, 22, 25, 22, 26, 22, 27, 23, 28, 23, 29, 23, 30, 24, 31, 24, 32, 24, 33, 25, 34, 25, 35, 25, 36, 25, 37, 12, 37, 12, 36, 12, 35, 13, 34, 13, 33, 13, 32, 14, 31, 14, 30, 14, 29, 15, 28, 15, 27, 15, 26, 16, 25, 16, 24, 16, 23, 17, 22, 17, 21, 17, 20, 17, 19, 10, 18, 10, 17, 10, 16, 11, 15, 12, 14, 13, 13, 14, 12, 15, 11, 16, 10, 16, 9, 15, 8, 14, 7, 14, 6, 14, 5, 14, 4, 14, 3, 15, 2, 16, 1, 22, 1],
        type: 'poly'
    },
    locations = [
        ['<p> <b>brady</b> <br /> Chicago</p>', 41.8781136, - 87.6297982, 2, 'efbdad6e-cf89-4d16-8cb8-ce32a80e8a05', 'brady']
    ];

/*****************************
 * DEFINE THE MAP CONTROL
 *****************************/
Ext.define('FiddleGMap.GMapPanel', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.gmappanel',
    requires: ['Ext.window.MessageBox'],
    // Google MAP Object assigned by the initialize function
    map: null,
    // Google MAP centerpoint Object assigned by the initialize
    // function and used to set the MAP Control center
    point: null,
    // Google MAP centerpoint Object assigned by the
    // seed1 and seed2 functions to set the geocode
    // coordinates where the next polygon will be created
    nextpoint: null,
    // float value used by the intialize function to
    // set the latitude of the centerpoint object.
    centerX: 41.8781136,
    // float value used by the intialize function to
    // set the longitude of the centerpoint object.
    centerY: -87.6297982,
    // float value used by the seed1 and seed2 functions
    // to set the geocode latitude value of the somepoint
    // object
    cx: -87.997030,
    // float value used by the seed1 and seed2 functions
    // to set the geocode longitude value of the somepoint
    // object
    cy: -122.695313,
    // integer value used by the initialize
    // function to set the zoom option of
    // the map object
    mapzoomfactor: 0,
    // integer value used to by the ellipse function
    // to define how many point will be created
    // to define the ellipitical Google Map Polygon
    // object. NOTE - Its set to twenty due to performance
    // constraints.
    dotPoints: 20,
    // integer value used by the seed1 and seed2 functions
    // corresponding to radius of the elliptical polygon.  The
    // value must be larger then 1.
    dotSize: 3,
    // float values used by intialize function
    // to store the amounts returned by the radians functions
    // for the degreeOffsetA/degreeOffsetB values.
    // This value is then used by the seed1 and seed2
    // to vary the location of a dot (polygon).
    angleOffsetA: 0.0,
    angleOffsetB: 0.0,
    // float values defining the latitude/longitude (A/B) degree
    // offset between dots (or polygons)
    degreesOffsetA: 1.5,
    degreesOffsetB: 50.0,
    // float values used by the seed1 and seed2 functions
    // to assign the latitude/longitude of the somepoint object
    newx: 0.0,
    newy: 0.0,
    // float value used by the seed1 and seed2 functions
    // to store a random number
    r: 0.0,
    // constant used to capture the result returned by the
    // setTimeOut function.
    rc: null,
    // float value used by the initialize function
    // to create the trunk of the tree
    angleoffset: 360.0,
    // color of the dots created by the ellipse function
    fillcolor: '#ffffff',
    // bit used by the draw function to determine
    // whether another sequence of dots should be drawn.
    // the value is set by the pause function which
    // is wired to the onclick event of the map object
    canplot: 1,
    radians: function (degrees) {
        // function used to convert degrees
        // to radians
        // NOTE - 1 radians = 57.2957795 degrees
        try {
            return (degrees / 57.2957795);
        } catch(err) {
            Ext.Msg.alert('Alert', "radians: " + err.message);
        }
    },
    draw: function () {
        var me = this,
            task = new Ext.util.DelayedTask(function(){
                me.draw();
            }, me);
        // Recursive routine that fires at one second
        // intervals.
        try {
            // Verify the CanPlot flag has not been
            // set to false by the user click on the
            // Map view control.
            if(me.canplot==1) {
                me.seed1(me.dotSize, me.radians(me.angleoffset), me.cx, me.cy);
                // Recurse (restart) after a second
                task.delay(100);
            }
        } catch (err) {
            Ext.Msg.alert('Alert', "draw: " + err.message);
        }
    },
    seed1: function (dotSize, angle, x, y) {
        var me = this;
        // seed1 function adapted from the Foggy Tree routine.
        try {
            if (dotSize > 1.0) {
                // Create a random numbers between 0 and 1
                me.r = Math.random();
                // 98% chance this will happen
                if (me.r > 0.02) {
                    me.nextpoint=new google.maps.LatLng(x, y);
                    me.ellipse(me.nextpoint, dotSize, me.dotPoints, me.fillcolor);
                    me.newx = x + Math.cos(angle) * dotSize;
                    me.newy = y + Math.sin(angle) * dotSize;
                    me.seed1(dotSize * 0.99, angle - me.angleOffsetA, me.newx, me.newy);
                } else {
                    me.nextpoint=new google.maps.LatLng(x, y);
                    me.ellipse(me.nextpoint, dotSize, me.dotPoints, me.fillcolor);
                    me.newx = x + Math.cos(angle);
                    me.newy = y + Math.sin(angle);
                    me.seed2(dotSize * 0.99, angle + me.angleOffsetA, me.newx, me.newy);
                    me.seed1(dotSize * 0.60, angle + me.angleOffsetB, me.newx, me.newy);
                    me.seed2(dotSize * 0.50, angle - me.angleOffsetB, me.newx, me.newy);
                }
            }
        } catch(err) {
            Ext.Msg.alert('Alert', "seed1: " + err.message);
        }
    },
    seed2: function (dotSize, angle, x, y) {
        var me = this;
        // seed2 function adapted from the Foggy Tree routine.
        try {
            if (dotSize > 1.0) {
                // Create a random numbers between 0 and 1
                me.r = Math.random();
                // 95% chance this will happen
                if (me.r > 0.05) {
                    me.nextpoint=new google.maps.LatLng(x, y);
                    me.ellipse(me.nextpoint, dotSize, me.dotPoints, me.fillcolor);
                    me.newx = x + Math.cos(angle) * dotSize;
                    me.newy = y + Math.sin(angle) * dotSize;
                    me.seed2(dotSize * 0.99, angle + me.angleOffsetA, me.newx, me.newy);
                } else {
                    me.nextpoint=new google.maps.LatLng(x, y);
                    me.ellipse(me.nextpoint, dotSize, me.dotPoints, me.fillcolor);
                    me.newx = x + Math.cos(angle);
                    me.newy = y + Math.sin(angle);
                    me.seed1(dotSize * 0.99, angle + me.angleOffsetA, me.newx, me.newy);
                    me.seed2(dotSize * 0.60, angle + me.angleOffsetB, me.newx, me.newy);
                    me.seed1(dotSize * 0.50, angle - me.angleOffsetB, me.newx, me.newy);
                }
            }
        } catch (err) {
            Ext.Msg.alert('Alert', "seed2: " + err.message);
        }
    },
    ellipse: function (center, radius, numPoints, fill) {
        var me = this;
        // function used to add a polygon consisting
        // of a given number of points (numPoints) with
        // a given radius, at a given location (center)
        // and filled with a given color (fill).
        try {
            var poly = [];
            var lat = center.lat();
            var lng = center.lng();
            var d2r = Math.PI/180;                // degrees to radians
            var r2d = 180/Math.PI;                // radians to degrees
            var Clat = (radius/3963) * r2d;      //  using 3963 as earth's radius
            var Clng = Clat/Math.cos(lat*d2r);
            //Add each point in the circle
            for (var i = 0 ; i < numPoints ; i++) {
                var theta = Math.PI * (i / (numPoints / 2));
                me.Cx = lng + (Clng * Math.cos(theta));
                me.Cy = lat + (Clat * Math.sin(theta));
                poly.push(new google.maps.LatLng(me.Cy, me.Cx));
            }
            //Add the first point to complete the circle
            poly.push(poly[0]) ;
            //Create a line with teh points from poly, red, 3 pixels wide, 80% opaque
            var polygon = new google.maps.Polygon({
                path: poly,
                strokeColor: me.fill,
                strokeOpacity: 0.8,
                strokeWeight: 3,
                fillColor: me.fill,
                fillOpacity: 0.35
            });
            polygon.setMap(me.map);
        } catch (err) {
            Ext.Msg.alert('Alert', "ellipse: " + err.message);
        }
    },
    pause: function () {
        var me = this;
        // Event Handler wired to the
        // map view on click event. This
        // method allow the end user a
        // way to stop the plot (or draw)
        // function from re-firing. This meant
        // to enable the user to gain control
        // of the browser should they need to leave
        // the site.
        try {
            // Evaluate the canplot
            // switch and set it
            // equal to the opposite
            switch(me.canplot) {
                case 0: // case paused then start
                    me.canplot=1;
                    me.map.setOptions( {draggable:false,
                        panControl: false,
                        zoomControl: false,
                        scaleControl: false,
                        draggable: false,
                        mapTypeControl: false
                    } );
                    me.draw();
                    break;
                case 1: // case plotting then pause
                    me.canplot=0;
                    me.map.setOptions( {draggable:true,
                        panControl: true,
                        zoomControl: true,
                        scaleControl: true,
                        draggable: true,
                        mapTypeControl: true,
                    } );
                    break;
            }
        } catch(err) {
            Ext.Msg.alert('Alert', "pause: " + err.message);
        }
    },
    initComponent: function() {
        Ext.applyIf(this, {
            plain: true,
            gmapType: 'map',
            border: false
        });

        this.callParent();
    },
    onBoxReady: function() {
        var center = this.center;
        this.callParent(arguments);
        this.createMap(center);
    },
    createMap: function(center, marker) {
        var me = this,
            task = new Ext.util.DelayedTask(function(){
                me.draw();
            }, me);
        try
        {
            me.point = new google.maps.LatLng(me.centerX, me.centerY);
            var myMapOptions = {
                zoom: me.mapzoomfactor,
                center: me.point,
                mapTypeControl: false,
                streetViewControl: false,
                panControl: false,
                zoomControl: false,
                scaleControl: false,
                draggable: false,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };
            me.map = new google.maps.Map(me.body.dom,myMapOptions);
            // Disable dragging by default
            me.map.setOptions( {draggable:false} );
            // Add a Click event handler that will enable the user to
            // stop the plotter from firing
            google.maps.event.addListener(me.map, 'click', function() {     me.pause();   });

            me.angleOffsetA = me.radians(me.degreesOffsetA); // Convert 1.5 degrees to radians
            me.angleOffsetB = me.radians(me.degreesOffsetB);  // Convert 50 degrees to radians
            me.seed1(me.dotSize, me.radians(me.angleoffset), me.cx, me.cy);
            task.delay(100);
        } catch (err) {
            Ext.Msg.alert('Alert', "createMap: " + err.message);
        }
        me.fireEvent('mapready', me, me.map);
    },

    afterComponentLayout: function(w, h) {
        this.callParent(arguments);
        this.redraw();
    },
    redraw: function() {
        var map = this.map;
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
        name: 'Google Map - Recursion Tree'
    }
});

/*****************************
 DEFINE THE MAIN CONTAINER.
 *****************************/
Ext.define('FiddleGMap.Main', {
    extend: "Ext.container.Container",
    border: true,
    padding: 2,
    controller: 'main',
    viewModel: {
        type: 'main'
    },
    initComponent: function() {
        var me = this;
        me.callParent();
    },
    onRender: function() {
        var me = this;
        me.callParent(arguments);

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
        height: 480
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
