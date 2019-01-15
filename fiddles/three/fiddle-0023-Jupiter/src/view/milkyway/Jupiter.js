app.view.milkyway.Jupiter = class extends app.view.milkyway.Planet {

    constructor() {
        super({
            type: app.view.milkyway.Jupiter,
            size: 2.7,
            distance: 2.6,
            period: 2,
            map: metadata.urls.jupiter.surfaceMaterial
        });
    }

    get globeMesh() {
        return this._globeMesh;
    }

    get animateOrbit() {
        return true;
    }

    get ringsMesh() {
        return this._ringsMesh;
    }

    get planetGroup() {
        return this._planetGroup;
    }

    get planetOrbitGroup() {
        return this._planetOrbitGroup;
    }

    get tilt() {
        return -0.466;
    }

    get rotationY() {
        return 0.003;
    }

    createGlobe() {
        let geometry = new THREE.SphereGeometry(7, 32, 32),
            texture = THREE.ImageUtils.loadTexture(this.map),
            material = new THREE.MeshPhongMaterial({map: texture}),
            globeMesh = new THREE.Mesh(geometry, material);
        globeMesh.rotation.z = .1;
        this.object3D.add(globeMesh);
        this._globeMesh = globeMesh;
    }

    update() {
        if (this.globeMesh) {
            this.globeMesh.rotation.y += this.rotationY / this.period;
        }
        if (this.ringsMesh) {
            this.ringsMesh.rotation.z -= this.rotationY / this.period;

        }
        this.updateChildren();
    }

    init() {
        let planetOrbitGroup = new THREE.Object3D(),
            planetGroup = new THREE.Object3D(),
            distSquared = this.distance * this.distance;

        planetGroup.position.set(Math.sqrt(distSquared / 2), 0, -Math.sqrt(distSquared / 2));
        planetOrbitGroup.add(planetGroup);
        planetGroup.scale.set(this.size, this.size, this.size);
        planetGroup.rotation.x = this.tilt;
        this.object3D = planetOrbitGroup;
        this._planetGroup = planetGroup;
        this._planetOrbitGroup = planetOrbitGroup;
        this.createGlobe();
        this.revolutionSpeed = this.rotationY;
    }

}
