
app.view.button.ButtonController = class extends ViewController {

    constructor(config) {
        super({
            id: 'button',
            mixins: [
                'app.view.button.mixin.Rectangle',
                'app.view.button.mixin.Text'
            ],
            view: config && config.hasOwnProperty('view') ? config.view : null
        });
    }

}
