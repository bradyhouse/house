
class Viewport extends Surface {
    constructor(config) {
        super({
            id: 'svgFiddle',
            hook: config && config.hasOwnProperty('hook') ? config.hook : window.document.body,
            height: 600,
            width: 500,
            autoBind: true,
            children: [
                new app.view.clock.Clock({
                    id: 'clock1',
                    width: 500,
                    height: 500,
                    left: 0,
                    top: 0
                }),
                new app.view.button.Button({
                    id: 'button1',
                    text: 'House SVG Fiddle #24',
                    color: '#58FA58',
                    cornerRadius: 15,
                    width: 485,
                    height: 30,
                    left: 5,
                    top: 515
                })
            ]
        });
    }
}
