Ext.define('FiddleGMap.GMapPanel', {
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
        mapzoomfactor: 1,
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
        ellipseLimit: 8000,
        ellipseIndex: 1,
        timeOut: 1000
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

Ext.define('FiddleGMap.Main', {
    extend: "Ext.container.Container",
    border: true,
    padding: 2,
    layout: {
        type: 'card',
        align: 'stretch'
    }
    /*listeners: {
     resize: function (panel, width, height) {
     var doc = document;
     panel.setHeight(Math.max(
     doc.body.scrollHeight, doc.documentElement.scrollHeight,
     doc.body.offsetHeight, doc.documentElement.offsetHeight,
     doc.body.clientHeight, doc.documentElement.clientHeight
     ));
     }
     }*/
    ,
    initComponent: function () {
        var me = this;
        me.callParent();
    },
    onRender: function () {
        var me = this;
        me.callParent(arguments);
    },
    items: [{
        xtype: 'gmappanel',
        region: 'center',
        height: 480
    }]

});

Ext.onReady(function () {
    Ext.create('FiddleGMap.Main', {
        renderTo: Ext.getBody()
    });
});
