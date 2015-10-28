
app.view.clock.ClockController = class extends ViewController {

    constructor(config) {
        super({
            id: 'clock',
            mixins: [
                'app.view.clock.mixin.Surface'
            ],
            view: config && config.hasOwnProperty('view') ? config.view : null
        });
    }

}
