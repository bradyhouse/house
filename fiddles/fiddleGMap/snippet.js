function initialize(){

    var point = new google.maps.LatLng(41.878114, -87.629798);

    var myMapOptions = {
        zoom: 5,
        center: point,
        mapTypeId: google.maps.MapTypeId.TERRAIN
    };

    var map = new google.maps.Map(document.getElementById("map_canvas"),myMapOptions);

    var image = new google.maps.MarkerImage(
        'images/marker-images/image.png',
        new google.maps.Size(40,40),
        new google.maps.Point(0,0),
        new google.maps.Point(20,40)
    );

    var shadow = new google.maps.MarkerImage(
        'images/marker-images/shadow.png',
        new google.maps.Size(64,40),
        new google.maps.Point(0,0),
        new google.maps.Point(20,40)
    );

    var shape = {
        coord: [22,1,23,2,23,3,23,4,23,5,23,6,23,7,22,8,21,9,21,10,22,11,23,12,24,13,25,14,26,15,27,16,28,17,27,18,21,19,21,20,21,21,21,22,21,23,21,24,22,25,22,26,22,27,23,28,23,29,23,30,24,31,24,32,24,33,25,34,25,35,25,36,25,37,12,37,12,36,12,35,13,34,13,33,13,32,14,31,14,30,14,29,15,28,15,27,15,26,16,25,16,24,16,23,17,22,17,21,17,20,17,19,10,18,10,17,10,16,11,15,12,14,13,13,14,12,15,11,16,10,16,9,15,8,14,7,14,6,14,5,14,4,14,3,15,2,16,1,22,1],
        type: 'poly'
    };
    var locations = [
        ['<p> <b>chouseknecht</b> <br /> 12 Beaver Creek Ln Durham, NC 27703</p> <br />', 35.923892, -78.827596, 1, 'eef7e20f-d3da-4769-93f9-e78d8fe91360', 'chouseknecht']
        ,
        ['<p> <b>brady</b> <br /> Chicago</p> <br /><br /><a href="mailto:brady@houseknecht.com " title="Send brady an email.">Contact</a>', 41.8781136, -87.6297982, 2, 'efbdad6e-cf89-4d16-8cb8-ce32a80e8a05', 'brady']
        ,
        ['<p> <b>jhousek1</b> <br /> 612 gravel pike, east greenville pa 18041</p> <br />', 40.411587, -75.507159, 3, '98e4589b-1e02-4df5-ad14-b02636db0c79', 'jhousek1']
    ];
    var infowindow = new google.maps.InfoWindow();
    var marker, i;

    for (i = 0; i < locations.length; i++) {

        var marker = new google.maps.Marker({
            draggable: true,
            raiseOnDrag: false,
            icon: image,
            shadow: shadow,
            shape: shape,
            map: map,
            position: new google.maps.LatLng(locations[i][1], locations[i][2])
        });
        google.maps.event.addListener(marker, 'click', (function (marker, i) {
            return function () {
                infowindow.setContent(locations[i][0]);
                infowindow.open(map, marker);
            }
        })(marker, i));
    }
}
google.maps.event.addDomListener(window, 'load', initialize);
//]]>
