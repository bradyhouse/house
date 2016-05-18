/**
 * Wrapper class based on the following block of SVG:
 *
 *      <rect
 *      xmlns="http://www.w3.org/2000/svg"
 *      id="toolMenuInnerRect"
 *      x="4"
 *      y="0"
 *      width="86"
 *      height="160"
 *      fill="#eee"/>
 *
 *
 */
class ToolMenuInnerBorder extends Rectangle {
     constructor() {
        super({
            xmlns: Util.xmlNamespaces().xmlns,
            id: 'toolMenuInnerBorder',
            stroke: null,
            strokeWidth: null,
            x: 4,
            y: 0,
            width: 86,
            height: 160,
            fill: '#88ffff'
        });
    }
}
