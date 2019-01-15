app.view.Viewport = class extends app.toolkit.three.R {

    constructor() {
        super();
    }

    render() {
        let sun = new app.view.milkyway.Sun({autoInit: true}),
            jupiter = new app.view.milkyway.Jupiter(),
            stars = new app.view.milkyway.Stars({autoInit: true});
        this.addObject(stars);
        this.addObject(sun);
        jupiter.init();
        this.addObject(jupiter);
    }

};
