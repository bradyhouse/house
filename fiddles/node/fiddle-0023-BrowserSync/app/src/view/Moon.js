app.view.milkyway.earth.Moon = class extends app.toolkit.three.Object {

    config() {
        return {
            earth: null
        }
    }

    constructor(config) {
        super();
        this._earth = config && config.hasOwnProperty('earth') ? config.earth : this.config().earth;
    }

    get earth() {
        return this._earth;
    }

    get size() {
        return 1 / 3.7 * this.scale;
    }

    get scale() {
        return 1.2;
    }

    get orbit() {
        return 356400;
    }

    get period() {
        return 13;
    }

    get inclination() {
        return 0.089;
    }

    update() {
        if (this.earth) {
            this.object3D.rotation.y += (this.earth.rotationY / this.period);
        }
    }


    init() {
        let geometry = new THREE.SphereGeometry(this.size, 32, 32),
            texture = THREE.ImageUtils.loadTexture(metadata.urls.moon),
            material = new THREE.MeshPhongMaterial({map: texture, ambient: 0x888888}),
            mesh = new THREE.Mesh(geometry, material),
            distance = this.earth ? this.orbit / this.earth.radius : 0,
            moonGroup = new THREE.Object3D();
        mesh.position.set(Math.sqrt(distance/2),0, -Math.sqrt(distance/2));
        mesh.rotation.y = Math.PI;
        moonGroup.add(mesh);
        moonGroup.rotation.x = this.inclination;
        this.object3D = moonGroup;

    }

};
