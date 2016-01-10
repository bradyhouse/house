app.view.milkyway.saturn.Saturn = class extends app.view.milkyway.Planet {

    constructor(config) {
        super(config);
        this.createRings();
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



    get tilt() {
        return -0.466;
    }

    get rotationY() {
        return 0.003;
    }

    update() {

        this.object3D.rotation.y += this.revolutionSpeed / this.period;

        if (this.globeMesh) {
            this.globeMesh.rotation.y += this.rotationY;
        }
        if (this.ringsMesh) {
            this.ringsMesh.rotation.z -= this.rotationY;

        }
        this.updateChildren();
    }

    createRings() {
        let ringsmap = metadata.urls.saturn.ringsMaterial,
            geometry = new app.view.milkyway.saturn.Rings({innerRadius: 1.1, outerRadius: 1.867, gridY: 200, autoInit: true}),
            texture = THREE.ImageUtils.loadTexture(ringsmap),
            material = new THREE.MeshLambertMaterial({
                map: texture,
                transparent: false,
                ambient: 0xffffff}),
            ringsMesh = new THREE.Mesh(geometry, material),
            distsquared = this.distance * this.distance;

        ringsMesh.doubleSided = true;
        ringsMesh.rotation.x = 4.5;
        ringsMesh.rotation.y = .09;

        this.planetGroup.add(ringsMesh);

        this._ringsMesh = ringsMesh;
    }




}
