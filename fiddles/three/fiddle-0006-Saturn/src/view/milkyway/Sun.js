app.view.milkyway.Sun = class extends app.toolkit.three.Object {

    constructor() {
        super();
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
