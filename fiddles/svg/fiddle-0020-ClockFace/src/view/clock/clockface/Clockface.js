class Clockface extends Group {

    constructor(config) {

        var _prefix = config && config.hasOwnProperty('id') ? config.id : 'clock1',
            _id = _prefix + '-face',
            _width = config && config.hasOwnProperty('width') ? config.width : 100,
            _height = config && config.hasOwnProperty('height') ? config.height : 100,
            _radius = config && config.hasOwnProperty('radius') ? config.radius : Math.floor(.45 * _width),
            _centerX = config && config.hasOwnProperty('centerX') ? config.centerX : Math.floor(.45 * _width),
            _centerY = config && config.hasOwnProperty('centerY') ? config.centerY : Math.floor(.45 * _height),
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
            _textStyle = config && config.hasOwnProperty('style') ? config.style : 'stroke: #fff;';

        super({
            id: _id,
            children: [
                new Circle({
                    id: 'circle',
                    radius: _radius,
                    centerX: _centerX,
                    centerY: _centerY,
                    fill: 'url(#clockface)'
                }),
                new Text({
                    id: 'twelve',
                    x: _coor12pm.x,
                    y: _coor12pm.y,
                    style: _textStyle,
                    text: '12'
                }),
                new Text({
                    id: 'one',
                    x: _coor1pm.x,
                    y: _coor1pm.y,
                    style: _textStyle,
                    text: '1'
                }),
                new Text({
                    id: 'two',
                    x: _coor2pm.x,
                    y: _coor2pm.y,
                    style: _textStyle,
                    text: '2'
                }),
                new Text({
                    id: 'three',
                    x: _coor3pm.x,
                    y: _coor3pm.y,
                    style: _textStyle,
                    text: '3'
                }),
                new Text({
                    id: 'four',
                    x: _coor4pm.x,
                    y: _coor4pm.y,
                    style: _textStyle,
                    text: '4'
                }),
                new Text({
                    id: 'five',
                    x: _coor5pm.x + _charOffsetX,
                    y: _coor5pm.y + _charOffsetY,
                    style: _textStyle,
                    text: '5'
                }),
                new Text({
                    id: 'six',
                    x: _coor6pm.x,
                    y: _coor6pm.y + _charOffsetY,
                    style: _textStyle,
                    text: '6'
                }),
                new Text({
                    id: 'seven',
                    x: _coor7pm.x - _charOffsetX,
                    y: _coor7pm.y + _charOffsetY,
                    style: _textStyle,
                    text: '7'
                }),
                new Text({
                    id: 'eight',
                    x: _coor8pm.x - _charOffsetX,
                    y: _coor8pm.y + _charOffsetY,
                    style: _textStyle,
                    text: '8'
                }),
                new Text({
                    id: 'nine',
                    x: _coor9pm.x - _charOffsetX,
                    y: _coor9pm.y,
                    style: _textStyle,
                    text: '9'
                }),
                new Text({
                    id: 'ten',
                    x: _coor10pm.x - _charOffsetX,
                    y: _coor10pm.y - _charOffsetY,
                    style: _textStyle,
                    text: '10'
                }),
                new Text({
                    id: 'eleven',
                    x: _coor11pm.x -_charOffsetX,
                    y: _coor11pm.y,
                    style: _textStyle,
                    text: '11'
                })
            ]
        });
    }

}
