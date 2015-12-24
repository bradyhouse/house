

class Menubar extends Group {
    config() {
        return {
            hook: window.document.body,
            autoBind: false
        };
    }

    constructor(config) {

        super({
            id: 'menubar',
            stroke: 'black',
            strokeWidth: 1,
            xmlns: Util.xmlNamespaces().xmlns,
            hook: config && config.hasOwnProperty('hook') ? config.hook : null,
            autoBind: config && config.hasOwnProperty('autoBind') ? config.autoBind : false,
            onMouseDown: null,
            onKeyUp: null,
            children: [new Rectangle({
                x: 0,
                y: 0,
                width: '100%',
                height: 22,
                fill: '#F5F5F5',
                stroke: 'black',
                strokeWidth: '1'
            }), new Text({
                x: 350,
                y: 15,
                onMouseDown: null,
                onMouseOver: null,
                onClick: null,
                onMouseOut: null,
                text: 'Click below to draw'
            }), new ToolGroup()],
            transform: null
        });
    }

}

