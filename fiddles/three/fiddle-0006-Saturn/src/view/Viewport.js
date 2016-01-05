app.view.Viewport = class extends app.toolkit.three.R {

    constructor() {
        super();
    }

    render() {
        let sun = new app.view.milkyway.Sun({autoInit: true}),
            saturn = new app.view.milkyway.saturn.Saturn(),
            stars = new app.view.milkyway.Stars({autoInit: true});
        this.addObject(stars);
        this.addObject(sun);
        saturn.init();
        this.addObject(saturn);
    }

};
