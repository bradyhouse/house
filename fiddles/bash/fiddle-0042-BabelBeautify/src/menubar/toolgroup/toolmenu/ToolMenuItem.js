

class ToolMenuItem extends Text {
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
            onMouseOver: "app.controller.onToolMenuItemMouseOver('" + 'toolMenuItem' + descriptor + "');",
            onMouseOut: "app.controller.onToolMenuItemMouseOut('" + 'toolMenuItem' + descriptor + "');"
        });
    }

}

