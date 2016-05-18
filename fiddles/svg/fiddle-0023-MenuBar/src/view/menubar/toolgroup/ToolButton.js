/**
 * Wrapper class based on the following block of SVG:
 *
 * <rect xmlns="http://www.w3.org/2000/svg"
 *       id="toolButton"
 *       x="40" y="0"
 *       width="65"
 *       height="20"
 *       onmousedown="app.controller.onToolButtonMouseDown()"
 *       onmouseover="app.controller.onToolButtonMouseOver(this)"
 *       onmouseout="app.controller.onToolButtonMouseOut(this)"
 *       fill="#88ffff"
 *       stroke="black"
 *       stroke-width="2"/>
 *
 */

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
            onMouseOver: 'onToolButtonMouseOver(this);',
            onMouseOut: 'onToolButtonMouseOut(this);',
            onMouseDown: 'onToolButtonMouseDown();'
        });
    }
}
