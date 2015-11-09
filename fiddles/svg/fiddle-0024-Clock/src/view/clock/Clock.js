/**
 * Class used to virtualize analog clock.
 */

app.view.clock.Clock = class extends Group {

    /**
     * Class constructor.
     *
     * @param config
     */
    constructor(config) {
        var _id = config && config.hasOwnProperty('id') ? config.id : 'clock1',
            _hook = config && config.hasOwnProperty('hook') ? config.hook : null,
            _autoBind = config && config.hasOwnProperty('autoBind') ? config.autoBind : false,
            _transform = config && config.hasOwnProperty('transform') ? config.transform : null,
            _xmlns = config && config.hasOwnProperty('xmlns') ? config.xmlns : Util.xmlNamespaces().xmlns,
            _faceId = _id + "-face",
            _hourHandId = _id + "-hourHand",
            _minuteHandId = _id + "-minuteHand",
            _secondHandId = _id + "-secondHand",
            _opacity = config && config.hasOwnProperty('opacity') ? config.opacity : null,
            _centerCircleId = _id + '-centerCircle',
            _x = config && config.hasOwnProperty('left') ? config.left : 0,
            _y = config && config.hasOwnProperty('top') ? config.top : 0,
            _width = config && config.hasOwnProperty('width') ? config.width : '100%',
            _widthIsPercentage = typeof _width == 'string' && _width.indexOf('%') != -1 ? true : false,
            _centerX = _widthIsPercentage ? '50%' : _x + Math.floor(_width / 2),
            _height = config && config.hasOwnProperty('height') ? config.height : '100%',
            _heightIsPercentage = typeof _height == 'string' && _height.indexOf('%') != -1 ? true : false,
            _centerY = _heightIsPercentage ? '50%' : _y + Math.floor(_height / 2);

        super({
            id: _id,
            stroke: null,
            strokeWidth: null,
            opacity: _opacity,
            xmlns: _xmlns,
            hook: _hook,
            autoBind: _autoBind,
            transform: _transform,
            x: null,
            y: null,
            width: null,
            height: null,
            controller: 'app.view.clock.ClockController',
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
                            id: 'shine',
                            children: [
                                new Stop({
                                    offset: ".8",
                                    color: "#aa0"
                                }),
                                new Stop({
                                    offset: ".95",
                                    color: "#fff"
                                }),
                                new Stop({
                                    offset: "1",
                                    color: "#bb0"
                                })
                            ]
                        }),
                        new RadialGradient({
                            id: 'bland',
                            xFrequency: ".5",
                            yFrequency: ".5",
                            children: [
                                new Stop({
                                    offset: ".3",
                                    color: "#58FA58"
                                }),
                                new Stop({
                                    offset: "1",
                                    color: "#000"
                                })
                            ]
                        }),
                        new LinearGradient({
                            id: 'hand',
                            xFrequency: ".6",
                            yFrequency: ".3",
                            children: [
                                new Stop({
                                    offset: ".0",
                                    color: "#fff"
                                }),
                                new Stop({
                                    offset: ".4",
                                    color: "#000"
                                }),
                                new Stop({
                                    offset: ".6",
                                    color: "#000"
                                }),
                                new Stop({
                                    offset: "1",
                                    color: "#fff"
                                }),
                            ]
                        }),
                        new AnimateTransform({
                            id: 'clock1-transform',
                            attributeName: 'transform',
                            type: 'rotate',
                            begin: '0s',
                            duration: '43200s',
                            repeat: 'indefinite',
                            from: '272,550,250',
                            to: '632,550,250'
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
                new Circle({
                    id: _faceId,
                    centerX: _centerX,
                    centerY: _centerY,
                    radius: _widthIsPercentage ? "35%" : Math.floor(.35 * _width),
                    fillOpacity: .75,
                    stroke: "white",
                    strokeWidth: "18",
                    strokeDash: "0.03%,3%"
                }),
                new Clockface({
                    id: _id,
                    centerX: _centerX,
                    centerY: _centerY,
                    fill: "url(#bland)",
                    fontSize: 16,
                    radius: _widthIsPercentage ? "30%" : Math.floor(.3 * _width),
                    width: _widthIsPercentage ? "30%" : Math.floor(.3 * _width),
                    height: _heightIsPercentage ? "30%" : Math.floor(.3 * _height)
                }),
                new Rectangle({
                    id: _hourHandId,
                    x: _width == _widthIsPercentage ? "49%" : Math.floor(.49 * (_x + _width)),
                    y: _height == _heightIsPercentage ? "30%" : Math.floor(.3 * (_y + _height)),
                    width: _widthIsPercentage ? "2%" : Math.floor(.02 * _width),
                    height: _heightIsPercentage ? '20%' : Math.floor(.2 * _height),
                    stroke: "#2C7D2C",
                    fill: "url(#hand)",
                    strokeWidth: 1.5,
                    transform: "rotate(418.613 550 250)"
                }),
                new Rectangle({
                    id: _minuteHandId,
                    x: _width == '100%' ? "49.75%" : Math.floor(.4975 * (_x + _width)),
                    y: _height == '100%' ? "20%" : Math.floor(.20 * (_x + _height)),
                    width: _width == '100%' ? "1%" : Math.floor(.01 * _width),
                    height: _height == '100%' ? "30%" : Math.floor(.30 * _height),
                    stroke: "#2C7D2C",
                    strokeWidth: 1.5,
                    fill: "url(#hand)",
                    transform: "rotate(116.54 550 250)"
                }),
                new Rectangle({
                    id: _secondHandId,
                    x: _widthIsPercentage ? "49.75%" : Math.floor(.4975 * (_x + _width)),
                    y: _heightIsPercentage ? "20%" : Math.floor(.20 * (_y + _height)),
                    width: _widthIsPercentage ? ".2%" : Math.floor(.01 * _width),
                    height: _heightIsPercentage ? "30%" : Math.floor(.30 *_height),
                    fill: "url(#hand)",
                    stroke: "#2C7D2C",
                    strokeWidth: 1.5,
                    transform: "rotate(385.762 550 250)"
                }),
                new Circle({
                    id: _centerCircleId,
                    centerX: _centerX,
                    centerY: _centerY,
                    radius: _widthIsPercentage ? '1.4%' : Math.floor(.014 * _width),
                    fill: 'url(#hand)',
                    stroke: '#2C7D2C',
                    strokeWidth: 1
                })
            ]
        });
    }
}
