
class Viewport extends Surface {
    constructor(config) {
        super({
            hook: config && config.hasOwnProperty('hook') ? config.hook : window.document.body,
            height: '300px',
            width: '100%',
            autoBind: true,
            children: [
                new app.view.button.Button({
                    id: 'button1',
                    text: 'Button 1',
                    color: '#58D3F7',
                    cornerRadius: 10,
                    width: 100,
                    height: 30,
                    left: 25,
                    top: 25
                }),
                new app.view.button.Button({
                    id: 'button2',
                    text: 'Button 2',
                    color: '#FA5858',
                    cornerRadius: 20,
                    width: 200,
                    height: 30,
                    left: 150,
                    top: 25
                }),
                new app.view.button.Button({
                    id: 'button3',
                    text: 'Button 3',
                    color: '#58FA58',
                    cornerRadius: 8,
                    width: 100,
                    height: 30,
                    left: 375,
                    top: 25
                }),
                new app.view.button.Button({
                    id: 'button4',
                    text: 'Button 4',
                    color: '#F781F3',
                    cornerRadius: 5,
                    width: 100,
                    height: 50,
                    left: 500,
                    top: 25
                }),
                new app.view.button.Button({
                    id: 'button5',
                    text: 'Button 5',
                    color: '#F3F781',
                    cornerRadius: 25,
                    width: 400,
                    height: 50,
                    left: 25,
                    top: 100
                })
            ]
        });
    }
}
