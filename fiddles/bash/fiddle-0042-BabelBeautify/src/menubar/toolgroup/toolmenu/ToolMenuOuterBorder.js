
class ToolMenuOuterBorder extends Rectangle {
    constructor() {
        super({
            xmlns: Util.xmlNamespaces().xmlns,
            id: 'toolMenuOuterBorder',
            x: 0,
            y: 0,
            width: 94,
            height: 164,
            stroke: 'black',
            strokeWidth: 1,
            fill: '#88ffff',
            onMouseOut: 'app.controller.onToolMenuMouseOut()'
        });
    }
}

