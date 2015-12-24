

class ToolMenu extends Group {
    constructor() {
        super({
            xmlns: Util.xmlNamespaces().xmlns,
            id: 'toolMenu',
            visibility: 'hidden',
            fill: '#88ffff',
            children: [new ToolMenuOuterBorder(), new ToolMenuInnerBorder(), new ToolMenuItem('Rectangle', 5, 18), new ToolMenuItem('Ellipse', 5, 36), new ToolMenuItem('Star', 5, 54)],
            transform: 'translate(40,22)'
        });
    }
}

