app.view.milkyway.Stars = class extends app.toolkit.three.Object {

    config() {
        return {
            autoInit: false,
            verticeCount: 667,
            materialCount: 8,
            systemCount: 24,
            distance: 1000
        }
    }

    constructor(config) {
        super();
        this._autoInit = config && config.hasOwnProperty('autoInit') ? config.autoInit : this.config().autoInit;
        this._verticeCount = config && config.hasOwnProperty('verticeCount') ? config.verticeCount : this.config().verticeCount;
        this._materialCount = config && config.hasOwnProperty('materialCount') ? config.materialCount : this.config().materialCount;
        this._systemCount = config && config.hasOwnProperty('systemCount') ? config.systemCount : this.config().systemCount;
        this._distance = config && config.hasOwnProperty('distance') ? config.distance : this.config().distance;
        if (this.autoInit) {
            this.init();
        }
    }

    get autoInit() {
        return this._autoInit;
    }

    get verticeCount() {
        return this._verticeCount;
    }

    get materialCount() {
        return this._materialCount;
    }

    get systemCount() {
        return this._systemCount;
    }

    get distance() {
        return this._distance;
    }

    init() {
        let starsGroup = new THREE.Object3D(),
            starsGeometry = new THREE.Geometry(),
            starsMaterials = [];

        for (let i = 0; i < this.verticeCount; i++) {
            let vector = new THREE.Vector3((Math.random() * 2 - 1) * this.distance,
                (Math.random() * 2 - 1) * this.distance,
                (Math.random() * 2 - 1) * this.distance);

            if (vector.length() < this.distance) {
                vector = vector.setLength(this.distance);
            }
            starsGeometry.vertices.push(new THREE.Vertex(vector));
        }

        for (let i = 0; i < this.materialCount; i++) {
            starsMaterials.push(
                new THREE.ParticleBasicMaterial({
                    color: 0x101010 * (i + 1),
                    size: i % 2 + 1,
                    sizeAttenuation: false
                })
            );
        }

        for (let i = 0; i < this.systemCount; i++) {
            let stars = new THREE.ParticleSystem(starsGeometry, starsMaterials[i % this.materialCount]);
            stars.rotation.y = i / (Math.PI * 2);
            starsGroup.add(stars);
        }

        this.object3D = starsGroup;
    }

};
