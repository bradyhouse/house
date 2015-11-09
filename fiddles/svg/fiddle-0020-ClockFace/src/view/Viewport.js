
class Viewport extends Surface {

    constructor(config) {

        var _width = 500,
            _height = 300,
            _radius = 100,
            _centerX = 250,
            _centerY = 125,
            _coor3pm = Util.mapCircularPoint(_centerX, _centerY, _radius,0),
            _coor4pm = Util.mapCircularPoint(_centerX, _centerY, _radius, 30),
            _coor5pm = Util.mapCircularPoint(_centerX, _centerY, _radius, 60),
            _coor6pm = Util.mapCircularPoint(_centerX, _centerY, _radius, 90),
            _coor7pm = Util.mapCircularPoint(_centerX, _centerY, _radius, 120),
            _coor8pm = Util.mapCircularPoint(_centerX, _centerY, _radius, 150),
            _coor9pm = Util.mapCircularPoint(_centerX, _centerY, _radius, 180),
            _coor10pm =Util.mapCircularPoint(_centerX, _centerY, _radius, 210),
            _coor11pm =Util.mapCircularPoint(_centerX, _centerY, _radius, 240),
            _coor12pm = Util.mapCircularPoint(_centerX, _centerY, _radius, 270),
            _coor1pm = Util.mapCircularPoint(_centerX, _centerY, _radius, 300),
            _coor2pm = Util.mapCircularPoint(_centerX, _centerY, _radius, 330),
            _charOffsetX = 6,
            _charOffsetY = 9,
            _textStyle = 'stroke: #fff;';

        super({
            id: 'svgFiddle',
            hook: config && config.hasOwnProperty('hook') ? config.hook : window.document.body,
            style: 'background: #000',
            height: _height,
            width: _width,
            autoBind: true,
            children: [
                new Definitions({
                   children: [
                       new Pattern({
                           id: 'gridPattern',
                           width: 10,
                           height: 10,
                           units: 'userSpaceOnUse',
                           children: [
                               new Path({
                                   data: 'M10 0 L0 0 L0 10',
                                   fill: null,
                                   stroke: 'yellow',
                                   strokeWidth: '0.25'
                               })
                           ]
                       }),
                       new RadialGradient({
                           id: 'clockface',
                           xFrequency: ".6",
                           yFrequency: ".3",
                           children: [
                               new Stop({
                                   offset: ".3",
                                   color: "#58FA58"
                               }),
                               new Stop({
                                   offset: ".9",
                                   color: "#000"
                               }),
                               new Stop({
                                   offset: "1",
                                   color: "#000"
                               })
                           ]
                       })
                   ]
                }),
                new Rectangle({
                    id: 'root',
                    x: 0,
                    y: 0,
                    height: _height,
                    width: _width,
                    fill: 'url(#gridPattern)'
                }),
                new Clockface({
                    id: 'clockface1',
                    centerX: 50,
                    centerY: _centerY,
                    width: 150,
                    height: 150
                }),
                new Clockface({
                    id: 'clockface2',
                    centerX: 200,
                    centerY: _centerY,
                    width: 150,
                    height: 150
                }),
                new app.view.button.Button({
                    id: 'button1',
                    text: 'de-constructed version on Github',
                    color: '#58FA58',
                    cornerRadius: 12,
                    width: _width - 15,
                    height: 22,
                    left: 5,
                    top: _height - 25
                })
            ]
        });
    }
}
