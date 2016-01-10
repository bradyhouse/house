app.view.milkyway.earth.Earth = class extends app.view.milkyway.Planet {

    constructor(config) {
        super(config);
        //this.initSurface();
        this.initAtmosphere();
        this.initMoon();

    }

    get rotationY() {
        return 0.003;
    }

    get tilt() {
        return 0.41;
    }

    get radius() {
        return 6371;
    }

    get cloudsScale() {
        return 1.005;
    }

    get cloudRotationY() {
        return this.rotationY * 0.95;
    }

    get globeMesh() {
        return this._globeMesh;
    }

    get cloudsMesh() {
        return this._cloudsMesh;
    }

    get autoInit() {
        return this._autoInit;
    }

    update() {
        this.updateChildren();

        if (this.animateOrbit) {
            this.object3D.rotation.y += this.revolutionSpeed / this.period;
        }
        if (this.globeMesh) {
            this.globeMesh.rotation.y += this.rotationY;
        }
        if (this.cloudsMesh) {
            this.cloudsMesh.rotation.y += this.cloudRotationY;
        }

    }

    initAtmosphere() {

        let cloudsMap = THREE.ImageUtils.loadTexture(metadata.urls.earth.cloudsMaterial),
            cloudsMaterial = new THREE.MeshLambertMaterial({
                color: 0xffffff,
                map: cloudsMap,
                transparent: true
            }),
            cloudsGeometry = new THREE.SphereGeometry(this.cloudsScale, 32, 32),
            cloudsMesh = new THREE.Mesh(cloudsGeometry, cloudsMaterial);

        cloudsMesh.rotation.z = this.tilt;
        this.planetGroup.add(cloudsMesh);
        this._cloudsMesh = cloudsMesh;

    }

    initMoon() {
        let moon = new app.view.milkyway.earth.Moon({
            earth: this,
            autoInit: true
        });
        this.addChild(moon);
    }

};
