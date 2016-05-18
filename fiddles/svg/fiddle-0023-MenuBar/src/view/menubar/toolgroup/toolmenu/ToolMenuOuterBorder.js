/**
 * Wrapper class based on the following block of SVG:
 *
 *     <rect
 *     xmlns="http://www.w3.org/2000/svg"
 *     id="toolMenuOuterBorder"
 *     x="0"
 *     y="0"
 *     width="94"
 *     height="164"
 *     stroke="black"
 *     stroke-width="1"
 *     fill="#ddd"
 *     onmouseout="app.controller.onToolMenuMouseOut()"/>
 *
 *
 */
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
