

class ToolButton extends Rectangle {
    constructor() {
        super({
            id: 'toolButton',
            stroke: 'black',
            strokeWidth: 1,
            fill: '#88ffff',
            height: 22,
            width: 94,
            x: 40,
            y: 0,
            cursor: 'pointer',
            xmlns: Util.xmlNamespaces().xmlns,
            hook: null,
            autoBind: false,
            onMouseOver: 'app.controller.onToolButtonMouseOver(this);',
            onMouseOut: 'app.controller.onToolButtonMouseOut(this);',
            onMouseDown: 'app.controller.onToolButtonMouseDown();'
        });
    }
}

