var meta = {
    fiddleHeader: 'Google Map Polygon Fun',
    fiddleSubHeader: 'Fiddle exploring alternative uses for the Google Map control.  Specifically, it uses the google map as a canvas to dynamically draw a recursion tree.' + '<br />',
    previewHeight: 300,
    previewUrl: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/297733/GmapPreview.png',
    isPreviewMode: function () {
        if (window != window.top && (window.innerHeight <= meta.previewHeight)) {
            return true;
        }
        return false;
    }
};

// Boiler Plate App pieces
Ext.define('App.BoxModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.box',
    data: {
        header: meta.fiddleHeader,
        subheader: meta.fiddleSubHeader
    }
});
Ext.define('App.Box', {
    extend: "Ext.container.Container",
    border: true,
    padding: 25,
    viewModel: {
        type: 'box'
    },
    items: [
        {
            xtype: 'panel',
            bind: {
                title: '{header}'
            },
            items: [
                {
                    xtype: 'panel',
                    padding: 10,
                    border: false,
                    bind: {
                        html: '{subheader}'
                    }
                }
            ],
            region: 'north'
        }
    ]
});

if (meta.isPreviewMode()) {
    Ext.application({
        name: 'Fiddle',
        launch: function() {
            Ext.define('Fiddle.Preview', {
                extend: 'Ext.Img',
                alias: 'widget.preview',
                src: meta.previewUrl,
                width: window.innerWidth,
                height: window.innerHeight
            });

            Ext.create('App.Box', {
                renderTo: Ext.getBody()
            });

            var map = new Fiddle.Preview(),
                win = Ext.create('Ext.Window', {
                    title: meta.fiddleHeader,
                    height: 300,
                    width: 300,
                    maximizable: true,
                    closable: false,
                    layout: 'fit',
                    items: map
                }),
                positionX = 25,
                positionY = 125;
            win.showAt([positionX, positionY]);
            window.setTimeout(function () {
                win.maximize(true);
            }, 500);
        }
    });
} else {
    window.google = window.google || {};
    google.maps = google.maps || {};
    (function () {

        function getScript(src) {
            document.write('<' + 'script src="' + src + '"><' + '/script>');
        }

        var modules = google.maps.modules = {};
        google.maps.__gjsload__ = function (name, text) {
            modules[name] = text;
        };

        google.maps.Load = function (apiLoad) {
            delete google.maps.Load;
            apiLoad([0.009999999776482582, [[["http://mt0.googleapis.com/vt?lyrs=m@313000000\u0026src=api\u0026hl=en-US\u0026", "http://mt1.googleapis.com/vt?lyrs=m@313000000\u0026src=api\u0026hl=en-US\u0026"], null, null, null, null, "m@313000000", ["https://mts0.google.com/vt?lyrs=m@313000000\u0026src=api\u0026hl=en-US\u0026", "https://mts1.google.com/vt?lyrs=m@313000000\u0026src=api\u0026hl=en-US\u0026"]], [["http://khm0.googleapis.com/kh?v=177\u0026hl=en-US\u0026", "http://khm1.googleapis.com/kh?v=177\u0026hl=en-US\u0026"], null, null, null, 1, "177", ["https://khms0.google.com/kh?v=177\u0026hl=en-US\u0026", "https://khms1.google.com/kh?v=177\u0026hl=en-US\u0026"]], null, [["http://mt0.googleapis.com/vt?lyrs=t@132,r@313000000\u0026src=api\u0026hl=en-US\u0026", "http://mt1.googleapis.com/vt?lyrs=t@132,r@313000000\u0026src=api\u0026hl=en-US\u0026"], null, null, null, null, "t@132,r@313000000", ["https://mts0.google.com/vt?lyrs=t@132,r@313000000\u0026src=api\u0026hl=en-US\u0026", "https://mts1.google.com/vt?lyrs=t@132,r@313000000\u0026src=api\u0026hl=en-US\u0026"]], null, null, [["http://cbk0.googleapis.com/cbk?", "http://cbk1.googleapis.com/cbk?"]], [["http://khm0.googleapis.com/kh?v=86\u0026hl=en-US\u0026", "http://khm1.googleapis.com/kh?v=86\u0026hl=en-US\u0026"], null, null, null, null, "86", ["https://khms0.google.com/kh?v=86\u0026hl=en-US\u0026", "https://khms1.google.com/kh?v=86\u0026hl=en-US\u0026"]], [["http://mt0.googleapis.com/mapslt?hl=en-US\u0026", "http://mt1.googleapis.com/mapslt?hl=en-US\u0026"]], [["http://mt0.googleapis.com/mapslt/ft?hl=en-US\u0026", "http://mt1.googleapis.com/mapslt/ft?hl=en-US\u0026"]], [["http://mt0.googleapis.com/vt?hl=en-US\u0026", "http://mt1.googleapis.com/vt?hl=en-US\u0026"]], [["http://mt0.googleapis.com/mapslt/loom?hl=en-US\u0026", "http://mt1.googleapis.com/mapslt/loom?hl=en-US\u0026"]], [["https://mts0.googleapis.com/mapslt?hl=en-US\u0026", "https://mts1.googleapis.com/mapslt?hl=en-US\u0026"]], [["https://mts0.googleapis.com/mapslt/ft?hl=en-US\u0026", "https://mts1.googleapis.com/mapslt/ft?hl=en-US\u0026"]], [["https://mts0.googleapis.com/mapslt/loom?hl=en-US\u0026", "https://mts1.googleapis.com/mapslt/loom?hl=en-US\u0026"]]], ["en-US", "US", null, 0, null, null, "http://maps.gstatic.com/mapfiles/", "http://csi.gstatic.com", "https://maps.googleapis.com", "http://maps.googleapis.com", null, "https://maps.google.com", "https://gg.google.com", "http://maps.gstatic.com/maps-api-v3/api/images/", "https://www.google.com/maps", 0], ["http://maps.gstatic.com/maps-api-v3/api/js/21/6", "3.21.6"], [3958668073], 1, null, null, null, null, null, "", null, null, 0, "http://khm.googleapis.com/mz?v=177\u0026", null, "https://earthbuilder.googleapis.com", "https://earthbuilder.googleapis.com", null, "http://mt.googleapis.com/vt/icon", [["http://mt0.googleapis.com/vt", "http://mt1.googleapis.com/vt"], ["https://mts0.googleapis.com/vt", "https://mts1.googleapis.com/vt"], null, null, null, null, null, null, null, null, null, null, ["https://mts0.google.com/vt", "https://mts1.google.com/vt"], "/maps/vt", 313000000, 132], 2, 500, [null, "http://g0.gstatic.com/landmark/tour", "http://g0.gstatic.com/landmark/config", null, "http://www.google.com/maps/preview/log204", "", "http://static.panoramio.com.storage.googleapis.com/photos/", ["http://geo0.ggpht.com/cbk", "http://geo1.ggpht.com/cbk", "http://geo2.ggpht.com/cbk", "http://geo3.ggpht.com/cbk"]], ["https://www.google.com/maps/api/js/master?pb=!1m2!1u21!2s6!2sen-US!3sUS!4s21/6", "https://www.google.com/maps/api/js/widget?pb=!1m2!1u21!2s6!2sen-US"], null, 0, 0, "/maps/api/js/ApplicationService.GetEntityDetails", 0, null, null, [null, null, null, null, null, null, null, null, null, [0, 0], [0, 0]]], loadScriptTime);
        };
        var loadScriptTime = (new Date).getTime();
        getScript("http://maps.gstatic.com/maps-api-v3/api/js/21/6/main.js");
    })();

    Ext.application({
        name: 'Fiddle',
        launch: function () {

            Ext.define('Fiddle.GMapPanel', {
                extend: 'Ext.panel.Panel',
                alias: 'widget.gmappanel',
                requires: ['Ext.window.MessageBox'],
                config: {
                    map: null,
                    point: null,
                    nextPoint: null,
                    centerX: 41.8781136,
                    centerY: -87.6297982,
                    cx: -87.997030,
                    cy: -122.695313,
                    mapzoomfactor: 2,
                    dotPoints: 20,
                    dotSize: 3,
                    angleOffsetA: 0.0,
                    angleOffsetB: 0.0,
                    degreesOffsetA: 1.5,
                    degreesOffsetB: 50.0,
                    newx: 0.0,
                    newy: 0.0,
                    seed: 0.0,
                    angleOffset: 360.0,
                    fillColor: '#f603af',
                    canPlot: 1,
                    ellipseLimit: 15000,
                    ellipseIndex: 1,
                    timeOut: 500
                },
                radians: function (degrees) {
                    try {
                        return (degrees / 57.2957795);
                    } catch (err) {
                        Ext.Msg.alert('Alert', "radians: " + err.message);
                    }
                },
                draw: function () {
                    var me = this;
                    try {
                        if (me.canPlot == 1 && me.ellipseIndex < me.ellipseLimit) {
                            me.seed1(me.dotSize, me.radians(me.angleOffset), me.cx, me.cy);
                            me.startDelayedTask();
                        }
                    } catch (err) {
                        Ext.Msg.alert('Alert', "draw: " + err.message);
                    }
                },
                seed1: function (dotSize, angle, x, y) {
                    var me = this;
                    try {
                        if (dotSize > 1.0) {
                            me.seed = Math.random();
                            if (me.seed > 0.02) {
                                me.nextPoint = new google.maps.LatLng(x, y);
                                me.ellipse(me.nextPoint, dotSize, me.dotPoints, me.fillColor);
                                me.newx = x + Math.cos(angle) * dotSize;
                                me.newy = y + Math.sin(angle) * dotSize;
                                me.seed1(dotSize * 0.99, angle - me.angleOffsetA, me.newx, me.newy);
                            } else {
                                me.nextPoint = new google.maps.LatLng(x, y);
                                me.ellipse(me.nextPoint, dotSize, me.dotPoints, me.fillColor);
                                me.newx = x + Math.cos(angle);
                                me.newy = y + Math.sin(angle);
                                me.seed2(dotSize * 0.99, angle + me.angleOffsetA, me.newx, me.newy);
                                me.seed1(dotSize * 0.60, angle + me.angleOffsetB, me.newx, me.newy);
                                me.seed2(dotSize * 0.50, angle - me.angleOffsetB, me.newx, me.newy);
                            }
                        }
                    } catch (err) {
                        Ext.Msg.alert('Alert', "seed1: " + err.message);
                    }
                },
                seed2: function (dotSize, angle, x, y) {
                    var me = this;
                    try {
                        if (dotSize > 1.0) {
                            me.seed = Math.random();
                            if (me.seed > 0.05) {
                                me.nextPoint = new google.maps.LatLng(x, y);
                                me.ellipse(me.nextPoint, dotSize, me.dotPoints, me.fillColor);
                                me.newx = x + Math.cos(angle) * dotSize;
                                me.newy = y + Math.sin(angle) * dotSize;
                                me.seed2(dotSize * 0.99, angle + me.angleOffsetA, me.newx, me.newy);
                            } else {
                                me.nextPoint = new google.maps.LatLng(x, y);
                                me.ellipse(me.nextPoint, dotSize, me.dotPoints, me.fillColor);
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
                    if (me.ellipseIndex < me.ellipseLimit) {
                        me.ellipseIndex++;
                        try {
                            var poly = [];
                            var lat = center.lat();
                            var lng = center.lng();
                            var d2r = Math.PI / 180;                // degrees to radians
                            var r2d = 180 / Math.PI;                // radians to degrees
                            var Clat = (radius / 3963) * r2d;      //  using 3963 as earth's radius
                            var Clng = Clat / Math.cos(lat * d2r);
                            for (var i = 0; i < numPoints; i++) {
                                var theta = Math.PI * (i / (numPoints / 2));
                                me.Cx = lng + (Clng * Math.cos(theta));
                                me.Cy = lat + (Clat * Math.sin(theta));
                                poly.push(new google.maps.LatLng(me.Cy, me.Cx));
                            }
                            poly.push(poly[0]);
                            var polygon = new google.maps.Polygon({
                                path: poly,
                                strokeColor: '#FFF000',
                                strokeOpacity: 0.8,
                                strokeWeight: 3,
                                fillColor: fill,
                                fillOpacity: 0.35
                            });
                            polygon.setMap(me.map);
                        } catch (err) {
                            Ext.Msg.alert('Alert', "ellipse: " + err.message);
                        }
                    } else {
                        me.pause();
                    }

                },
                startDelayedTask: function (state) {
                    var me = this,
                        enable = Ext.isEmpty(state) ? true : state;
                    if (me.task) {
                        me.task.cancel();
                    }
                    if (enable) {
                        me.task = new Ext.util.DelayedTask(function () {
                            me.draw();
                        });
                        me.task.delay(me.timeOut);
                    }
                },
                pause: function () {
                    var me = this;
                    try {
                        switch (me.canPlot) {
                            case 0:
                                me.canPlot = 1;
                                me.map.setOptions({
                                    draggable: false,
                                    panControl: false,
                                    zoomControl: false,
                                    scaleControl: false,
                                    draggable: false,
                                    mapTypeControl: false
                                });
                                if (me.ellipseIndex < me.ellipseLimit) {
                                    me.startDelayedTask();
                                }
                                break;
                            case 1:
                                me.canPlot = 0;
                                me.startDelayedTask(false);
                                me.map.setOptions({
                                    draggable: true,
                                    panControl: true,
                                    zoomControl: true,
                                    scaleControl: true,
                                    draggable: true,
                                    mapTypeControl: true
                                });
                                break;
                        }
                    } catch (err) {
                        Ext.Msg.alert('Alert', "pause: " + err.message);
                    }
                },
                initComponent: function () {
                    Ext.applyIf(this, {
                        plain: true,
                        gmapType: 'map',
                        border: false
                    });

                    this.callParent();
                },
                onBoxReady: function () {
                    var center = this.center;
                    this.callParent(arguments);
                    this.createMap(center);
                },
                createMap: function (center, marker) {
                    var me = this;
                    try {
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
                            mapTypeId: google.maps.MapTypeId.SATELLITE
                        };
                        me.map = new google.maps.Map(me.body.dom, myMapOptions);
                        me.map.setOptions({draggable: false});
                        google.maps.event.addListener(me.map, 'click', function () {
                            me.pause();
                        });
                        me.angleOffsetA = me.radians(me.degreesOffsetA); // Convert 1.5 degrees to radians
                        me.angleOffsetB = me.radians(me.degreesOffsetB);  // Convert 50 degrees to radians
                        me.seed1(me.dotSize, me.radians(me.angleOffset), me.cx, me.cy);
                        me.startDelayedTask();
                    } catch (err) {
                        Ext.Msg.alert('Alert', "createMap: " + err.message);
                    }
                    me.fireEvent('mapready', me, me.map);
                },
                afterComponentLayout: function (w, h) {
                    this.callParent(arguments);
                    this.redraw();
                },
                redraw: function () {
                    var map = this.map;
                    if (map) {
                        google.maps.event.trigger(map, 'resize');
                    }
                }
            });

            Ext.create('App.Box', {
                renderTo: Ext.getBody()
            });

            var map = new Fiddle.GMapPanel(),
                win = Ext.create('Ext.Window', {
                    title: meta.fiddleHeader,
                    height: 300,
                    width: 300,
                    maximizable: true,
                    closable: false,
                    layout: 'fit',
                    items: map
                }),
                positionX = 25,
                positionY = 125;
            win.showAt([positionX, positionY]);
            window.setTimeout(function () {
                win.maximize(true);
            }, 500);
        }
    });
}

if (!meta.isPreviewMode()) {



} else {


}









