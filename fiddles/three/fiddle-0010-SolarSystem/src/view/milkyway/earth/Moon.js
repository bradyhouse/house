app.view.milkyway.earth.Moon = class extends app.toolkit.three.Object {

    config() {
        return {
            earth: null,
            autoInit: false
        }
    }

    constructor(config) {
        super();
        this._autoInit = config && config.hasOwnProperty('autoInit') ? config.autoInit : this.config().autoInit;
        this._earth = config && config.hasOwnProperty('earth') ? config.earth : this.config().earth;
        if (this.autoInit) {
            this.init();
        }
    }

    get earth() {
        return this._earth;
    }

    get size() {
        return .02;
    }

    get scale() {
        return 1.2;
    }

    get orbit() {
        return 356400;
    }

    get period() {
        return 3;
    }

    get inclination() {
        return 0.089;
    }

    get rotationSpeed() {
        return this._rotationSpeed;
    }

    get autoInit() {
        return this._autoInit;
    }

    update() {
        this.mesh.rotation.y += this.rotationSpeed;
    }

    get distance() {
        return this._distance;
    }

    get mesh() {
        return this._mesh;
    }

    init() {

        let rotationSpeed = metadata.constants.MOON_ROTATION_SPEED,
            size = this.size,
            moonGroup = new THREE.Object3D(),
            map = metadata.urls.moon,
            geometry = new THREE.SphereGeometry(0, 32, 32),
            texture = THREE.ImageUtils.loadTexture(map),
            material = new THREE.MeshPhongMaterial({
                map: texture,
                ambient: 0x888888
            }),
            mesh = new THREE.Mesh(geometry, material),
            distance = metadata.constants.MOON_DISTANCE_FROM_EARTH / this.earth.radius / .022,
            distsquared = distance * distance;
        this._rotationSpeed = rotationSpeed;
        mesh.position.set(distance, 0, -Math.sqrt(distsquared / 2));
        mesh.rotation.y = Math.PI;
        moonGroup.add(mesh);
        moonGroup.rotation.x = this.inclination;
        moonGroup.scale.set(size, size, size);

        this.object3D = moonGroup;
        this._mesh = mesh;
        this._distance = distance;
    }

}
