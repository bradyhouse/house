app.view.milkyway.Planet = class extends app.toolkit.three.Object {

    config() {
        return {
            size: 1,
            distance: 0.0,
            period: 0.0,
            map: '',
            revolutionSpeed: 0.002,
            animateOrbit: true,
            animateRotation: true,
            autoInit: false
        }
    }

    constructor(config) {
        super(config);
        this._autoInit = config && config.hasOwnProperty('autoInit') ? config.autoInit : this.config().autoInit;
        this._size = config && config.hasOwnProperty('size') ? config.size : this.config().size;
        this._distance = config && config.hasOwnProperty('distance') ? config.distance : this.config().distance;
        this._period = config && config.hasOwnProperty('period') ? config.period : this.config().period;
        this._map = config && config.hasOwnProperty('map') ? config.map : this.config().map;
        this._revolutionSpeed = config && config.hasOwnProperty('revolutionSpeed') ? config.revolutionSpeed : this.config().revolutionSpeed;
        this._animateOrbit = config && config.hasOwnProperty('animateOrbit') ? config.animateOrbit : this.config().animateOrbit;
        this._animateRotation = config && config.hasOwnProperty('animateRotation') ? config.animateRotation : this.config().animateRotation;
        if (this.autoInit) {
            this.init();
        }
    }

    get size() {
        return this._size;
    }

    get distance() {
        return this._distance;
    }

    get period() {
        return this._period;
    }

    get map() {
        return this._map;
    }

    get revolutionSpeed() {
        return this._revolutionSpeed;
    }

    set revolutionSpeed(speed) {
        this._revolutionSpeed = speed;
    }

    get animateOrbit() {
        return this._animateOrbit;
    }

    get animateRotation() {
        return this._animateRotation;
    }

    get planetGroup() {
        return this._planetGroup;
    }

    get globeMesh() {
        return this._globeMesh;
    }

    get autoInit() {
        return this._autoInit;
    }

    update() {
        if (this.animateOrbit) {
            this.object3D.rotation.y += this.revolutionSpeed / this.period;
        }
        this.updateChildren();
    }

    render() {
        let geometry = new THREE.SphereGeometry(1, 32, 32),
            texture = THREE.ImageUtils.loadTexture(this.map),
            material = new THREE.MeshPhongMaterial( {map: texture, ambient: 0x333333} ),
            globeMesh = new THREE.Mesh( geometry, material );

        this.planetGroup.add(globeMesh);
        this._globeMesh = globeMesh;
    }

    init() {
        let planetOrbitGroup = new THREE.Object3D(),
            planetGroup = new THREE.Object3D(),
            distSquared = this.distance * this.distance;

        planetGroup.position.set(Math.sqrt(distSquared/2), 0, -Math.sqrt(distSquared/2));
        planetOrbitGroup.add(planetGroup);
        planetGroup.scale.set(this.size, this.size, this.size);
        this.object3D = planetOrbitGroup;
        this._planetGroup = planetGroup;
        this.render();
    }

}
