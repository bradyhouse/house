app.view.milkyway.Sun = class extends app.toolkit.three.Object {

    config() {
        autoInit: false
    }

    constructor(config) {
        super();
        this._autoInit = config && config.hasOwnProperty('autoInit') ? config.autoInit : this.config().autoInit;

        if(this.autoInit) {
            this.init();
        }
    }

    get autoInit() {
        return this._autoInit;
    }

    update() {}

    init() {
        let light = new THREE.PointLight(0xfffff0, 2, 150);
        light.rotation.x = 2.21;
        light.rotation.y = .2;
        light.rotation.z = .1;
        light.position.set(-10, -20, 40);
        this.object3D = light;
    }

};
