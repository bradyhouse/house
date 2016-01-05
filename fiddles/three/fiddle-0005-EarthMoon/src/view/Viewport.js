app.view.Viewport = class extends app.toolkit.three.R {

    constructor() {
        super();
    }

    render() {
        let sun = new app.view.milkyway.Sun({});
        let earth = new app.view.milkyway.earth.Earth({});

        sun.init();
        this.addObject(sun);

        earth.init();
        this.addObject(earth);
    }


}
