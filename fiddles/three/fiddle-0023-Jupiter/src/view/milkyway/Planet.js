app.view.milkyway.Planet = class extends app.toolkit.three.Object {

    config() {
        return {
            size: 1,
            distance: 0.0,
            period: 0.0,
            map: '',
            revolutionSpeed: 0.002,
            animateOrbit: true,
            type: null
        }
    }

    constructor(config) {
        super();
        this._size = config && config.hasOwnProperty('size') ? config.size : this.config().size;
        this._distance = config && config.hasOwnProperty('distance') ? config.distance : this.config().distance;
        this._period = config && config.hasOwnProperty('period') ? config.period : this.config().period;
        this._map = config && config.hasOwnProperty('map') ? config.map : this.config().map;
        this._type = config && config.hasOwnProperty('type') ? config.type : this.config().type;
        this._revolutionSpeed = config && config.hasOwnProperty('revolutionSpeed') ? config.revolutionSpeed : this.config().revolutionSpeed;
        this._animateOrbit = config && config.hasOwnProperty('animateOrbit') ? config.animateOrbit : this.config().animateOrbit;
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

    get type() {
        return this._type;
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

}
