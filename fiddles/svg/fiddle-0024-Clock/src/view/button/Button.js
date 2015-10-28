

app.view.button.Button = class extends Group {

    constructor(config) {
        var _id = config && config.hasOwnProperty('id') ? config.id : 'button1',
            _pathId = _id + '-path',
            _backRectId = _id + '-backrectangle',
            _rectId = _id + '-rectangle',
            _textId = _id + '-text',
            _setterId = _id + '-setter',
            _textPathId = _id + '-textpath',
            _text = config && config.hasOwnProperty('text') ? config.text : null,
            _width = config && config.hasOwnProperty('width') ? config.width : 94,
            _height = config && config.hasOwnProperty('height') ? config.height : 24,
            _left = config && config.hasOwnProperty('left') ? config.left : 0,
            _top = config && config.hasOwnProperty('top') ? config.top : 0,
            _color = config && config.hasOwnProperty('color') ? config.color : '#0CE3A7',
            _cornerRadius = config && config.hasOwnProperty('cornerRadius') ? config.cornerRadius : 15,
            _recX = _left,
            _recY = _top,
            _textWidth = _text ? _text.length * 6 : 0,
            _pntAx = _recX + Math.floor(_width / 2) - Math.floor(_textWidth / 2),
            _pntAy = _recY + Math.floor(_height / 2) + 3,
            _pntBx = _recX + _width,
            _pntBy = _pntAy,
            _pathData = 'M ' + _pntAx +',' + _pntAy + ' L ' + _pntBx + ',' + _pntBy;

        super({
            id: _id,
            stroke: null,
            strokeWidth: null,
            opacity: null,
            xmlns: Util.xmlNamespaces().xmlns,
            hook: config && config.hasOwnProperty('hook') ? config.hook : null,
            autoBind: config && config.hasOwnProperty('autobind') ? config.autoBind : false,
            transform: config && config.hasOwnProperty('transform') ? config.transform : null,
            controller: 'app.view.button.ButtonController',
            children: [
                new Rectangle({
                    id: _backRectId,
                    fill: _color,
                    stroke: _color,
                    strokeWidth: 1,
                    width: _width,
                    height: _height,
                    x: _recX + 2,
                    y: _recY + 3,
                    cornerRadius: _cornerRadius,
                    xmlns: Util.xmlNamespaces().xmlns
                }),
                new Rectangle({
                    id: _rectId,
                    fill: _color,
                    stroke: _color,
                    strokeWidth: 0,
                    width: _width,
                    height: _height,
                    x: _recX,
                    y: _recY,
                    cornerRadius: _cornerRadius,
                    cursor: 'pointer',
                    xmlns: Util.xmlNamespaces().xmlns,
                    hook: null,
                    autoBind: false
                }),
                new Path({
                    xmlns: Util.xmlNamespaces().xmlns,
                    id: _pathId,
                    data: _pathData,
                    strokeWidth: "0"
                }),
                new Text({
                    id: _textId,
                    xmlns: Util.xmlNamespaces().xmlns,
                    hook: null,
                    text: null,
                    autoBind: false,
                    cursor: 'pointer',
                    children: [
                        new TextPath({
                            id: _textPathId,
                            text: _text,
                            link: '#' + _pathId,
                            autoBind: false,
                            hook: null
                        })
                    ]

                })
            ]
        });
        this.postInit();
    }

    postInit() {
        var backRect = this.docElementNS.firstChild,
            backFill = backRect ? backRect.getAttribute('fill') : null;

        if (backFill) {
            backFill = Util.darkenColor(backFill, -.50);
            backRect.setAttribute('fill', backFill);
            backRect.setAttribute('stroke', backFill);
        }
    }

}
