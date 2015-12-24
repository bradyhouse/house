
class ToolGroup extends Group {
    constructor() {
        super({
            id: 'toolGroup',
            stroke: null,
            strokeWidth: null,
            opacity: null,
            xmlns: Util.xmlNamespaces().xmlns,
            hook: null,
            autoBind: false,
            transform: 'translate(10,0)',
            children: [new ToolButton(), new Text({
                id: null,
                text: 'Tool:',
                x: 0,
                y: 15
            }), new ToolStatus(), new ToolMenu()]
        });
    }

}

