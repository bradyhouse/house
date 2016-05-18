
/**
 * Wrapper class based on the following block of SVG:
 *
 * <text
 *      xmlns="http://www.w3.org/2000/svg"
 *      id="toolstatus"
 *      x="45"
 *      y="15"
 *      onmouseover="document.getElementById('toolButton').setAttribute('fill','#ffff88')"
 *      onmouseout="document.getElementById('toolButton').setAttribute('fill','#88ffff')"
 *      onmousedown="ToolsView()">Rectangle
 *</text>
 *
 */

class ToolStatus extends Text {

    /**
     * Class constructor.
     */
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
            onMouseOver: 'this.controller.onToolStatusMouseOver();',
            onMouseOut: 'this.controller.onToolStatusMouseOut();',
            onMouseDown: 'this.controller.onToolStatusMouseDown();'
        });
    }
}
