app.view.milkyway.Planet = class extends app.toolkit.three.Object {

    config() {
        return {
            size: 1,
            distance: 0.0,
            period: 0.0,
            map: '',
            revolutionSpeed: 0.002,
            animateOrbit: true,
            animateRotation: true
        }
    }

    constructor(config) {
        super();
        this._size = config && config.hasOwnProperty('size') ? config.size : this.config().size;
        this._distance = config && config.hasOwnProperty('distance') ? config.distance : this.config().distance;
        this._period = config && config.hasOwnProperty('period') ? config.period : this.config().period;
        this._map = config && config.hasOwnProperty('map') ? config.map : this.config().map;
        this._revolutionSpeed = config && config.hasOwnProperty('revolutionSpeed') ? config.revolutionSpeed : this.config().revolutionSpeed;
        this._animateOrbit = config && config.hasOwnProperty('animateOrbit') ? config.animateOrbit : this.config().animateOrbit;
        this._animateRotation = config && config.hasOwnProperty('animateRotation') ? config.animateRotation : this.config().animateRotation;
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

    render() {

    }

    init() {
        let planetOrbitGroup = new THREE.Object3D(),
            planetGroup = new THREE.Object3D(),
            distSquared = this.distance * this.distance;

        this.object3D = planetOrbitGroup;
        planetGroup.position.set(Math.sqrt(distSquared/2), 0, -Math.sqrt(distSquared/2));
        planetOrbitGroup.add(planetGroup);
        this._planetGroup = planetGroup;
        this.planetGroup.scale.set(size, size, size);

        this.render();

    }

}
