

class ToolStatus extends Text {
    constructor() {
        super({
            id: 'toolStatus',
            x: 45,
            y: 15,
            xmlns: Util.xmlNamespaces().xmlns,
            hook: null,
            autoBind: false,
            cursor: 'pointer',
            text: 'Rectangle',
            onMouseOver: 'app.controller.onToolStatusMouseOver();',
            onMouseOut: 'app.controller.onToolStatusMouseOut();',
            onMouseDown: 'app.controller.onToolStatusMouseDown();'
        });
    }
}

