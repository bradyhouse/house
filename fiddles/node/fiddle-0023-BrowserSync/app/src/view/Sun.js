app.view.milkyway.Sun = class extends app.toolkit.three.Object {

    constructor() {
        super();
    }

    update() {}

    init() {
        let light = new THREE.PointLight(0xffffff, 2, 100);
        light.position.set(-10, 0, 20);
        this.object3D = light;
    }

};
