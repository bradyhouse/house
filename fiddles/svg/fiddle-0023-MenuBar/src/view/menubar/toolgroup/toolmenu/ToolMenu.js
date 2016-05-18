
/**
 * Wrapper class based on the following block of SVG:
 *
 *  <g xmlns="http://www.w3.org/2000/svg" id="toolMenu" visibility="hidden">
 *      <rect ... ToolMenuOuterBorder() ... />
 *      <rect ... ToolMenuInnerBorder() ... />
 *      <text ... ToolMenuItem('Rectangle', 5, 18) ... />
 *      <text ... ToolMenuItem('Ellipse', 5, 36) ... />
 *      <text ... ToolMenuItem('Star', 5, 54) ... />
 *  </g>
 *
 */

class ToolMenu extends Group {
    constructor() {
        super({
            xmlns: Util.xmlNamespaces().xmlns,
            id: 'toolMenu',
            visibility: 'hidden',
            fill: '#88ffff',
            children: [
                new ToolMenuOuterBorder(),
                new ToolMenuInnerBorder(),
                new ToolMenuItem('Rectangle', 5, 18),
                new ToolMenuItem('Ellipse', 5, 36),
                new ToolMenuItem('Star', 5, 54)
            ],
            transform: 'translate(40,22)'
        });
    }
}
