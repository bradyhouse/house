/**
 * Wrapper class based on the following block of SVG:
 *
 *      <text
 *      xmlns="http://www.w3.org/2000/svg"
 *      id="toolMenuItemRectangle"
 *      y="18" x="5"
 *      onmousedown="app.controller.onToolMenuItemSelect('Rectangle')"
 *      onmouseover="app.controller.onToolMenuItemMouseOver('toolMenuItemRectangle')"
 *      onmouseout="app.controller.onToolMenuItemMouseOut('toolMenuItemRectangle')">
 *      Rectangle</text>
 *
 */

class ToolMenuItem extends Text {


    /**
     * Class constructor.
     *
     * @param descriptor string
     * @param x integer
     * @param y integer
     */
    constructor(descriptor, xCoordinate, yCoordinate) {
        super({
            xmlns: Util.xmlNamespaces().xmlns,
            id: 'toolMenuItem' + descriptor,
            x: xCoordinate,
            y: yCoordinate,
            text: descriptor,
            cursor: 'pointer',
            onClick: null,
            onMouseDown: "app.controller.onToolMenuItemSelect('" + descriptor + "');",
            onMouseOver: "app.controller.onToolMenuItemMouseOver('" + 'toolMenuItem' + descriptor +"');",
            onMouseOut:  "app.controller.onToolMenuItemMouseOut('" + 'toolMenuItem' + descriptor + "');"
        });
    }

}
