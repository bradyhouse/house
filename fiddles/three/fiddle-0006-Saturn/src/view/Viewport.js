app.view.Viewport = class extends app.toolkit.three.R {

    constructor() {
        super();
    }

    render() {
        let sun = new app.view.milkyway.Sun({});
        let saturn = new app.view.milkyway.saturn.Saturn({});


        sun.init();
        this.addObject(sun);

        saturn.init();
        this.addObject(saturn);
    }


}
