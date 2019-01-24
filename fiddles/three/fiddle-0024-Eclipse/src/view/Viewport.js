app.view.Viewport = class extends app.toolkit.three.R {

    constructor() {
        super();
    }

    render() {
        let sun = new app.view.milkyway.Sun({autoInit: true}),
            moon = new app.view.milkyway.Moon(),
            stars = new app.view.milkyway.Stars({autoInit: true});
        this.addObject(stars);
        this.addObject(sun);
        moon.init();
        this.addObject(moon);
    }

};
