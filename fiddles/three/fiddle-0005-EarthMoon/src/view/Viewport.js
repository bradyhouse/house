app.view.Viewport = class extends app.toolkit.three.R {

    constructor() {
        super();
    }

    render() {
        let sun = new app.view.milkyway.Sun({}),
            stars = new app.view.milkyway.Stars({ autoInit: true }),
            earth = new app.view.milkyway.earth.Earth({});

        sun.init();
        this.addObject(sun);

        earth.init();
        this.addObject(earth);

        this.addObject(stars);
    }


}
