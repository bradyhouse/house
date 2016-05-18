/**
 * Wrapper class based on the following block of SVG:
 *
 * <g xmlns="http://www.w3.org/2000/svg" id="toolGroup" transform="translate(85,0)">
 *     <rect ... ToolButton() ... />
 *     <text x="8" y="15">Tool</text>
 *     <text ... ToolStatus() ... />
 *     <g ... ToolMenu() ... />
 * </g>
 *
 */
class ToolGroup extends Group {

    /**
     * Class constructor. Used to invoke the base class
     * with configuration settings.
     */
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
            children: [
                new ToolButton(),
                new Text({
                    id: null,
                    text: 'Tool:',
                    x: 0,
                    y: 15
                }),
                new ToolStatus(),
                new ToolMenu()
            ]
        });
    }

}
