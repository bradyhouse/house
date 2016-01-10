app.view.Viewport = class extends app.toolkit.three.R {

    config() {
        return {
            planetSpecs: [
                {type: app.view.milkyway.Planet, size: 1 / 2.54, distance: 0.4, period: 0.24, map: metadata.urls.mercury.surfaceMaterial },
                {type: app.view.milkyway.Planet, size: 1 / 1.05, distance: 0.7, period: 0.62, map: metadata.urls.venus.surfaceMaterial },
                {type: app.view.milkyway.earth.Earth, size: 1, distance: 1, period: 1, map: metadata.urls.earth.surfaceMaterial },
                {type: app.view.milkyway.Planet, size: 1 / 1.88, distance: 1.6, period: 1.88, map: metadata.urls.mars.surfaceMaterial},
                {type: app.view.milkyway.Planet, size: 2.7, distance: 2.6, period: 5.93, map: metadata.urls.jupiter.surfaceMaterial},
                {type: app.view.milkyway.saturn.Saturn, size: 2.14, distance: 5, period: 14.73, map: metadata.urls.saturn.surfaceMaterial},
                {type: app.view.milkyway.Planet, size: 1, distance: 9.8, period: 42.005, map: metadata.urls.uranus.surfaceMaterial},
                {type: app.view.milkyway.Planet, size: 1.94, distance: 19.4, period: 82.4, map: metadata.urls.neptune.surfaceMaterial},
                {type: app.view.milkyway.Planet,size: 10 / 5.55, distance: 38.6, period: 123.85, map: metadata.urls.pluto.surfaceMaterial }
            ],
            mouseDown: function (x, y) {
                this.lastX = x;
                this.lastY = y;
                this.mouseDown = true;
            },
            mouseUp: function (x, y) {
                this.lastX = x;
                this.lastY = y;
                this.mouseDown = false;
            },
            mouseMove: function (x, y) {
                if (this.mouseDown) {
                    let dx = x - this.lastX;
                    if (Math.abs(dx) > metadata.constants.MOUSE_MOVE_TOLERANCE) {
                        this.root.rotation.y -= (dx * 0.01);
                    }
                    this.lastX = x;

                    return;

                    let dy = y - this.lastY;
                    if (Math.abs(dy) > metadata.constants.MOUSE_MOVE_TOLERANCE) {
                        this.root.rotation.x += (dy * 0.01);
                        if (this.root.rotation.x < 0) {
                            this.root.rotation.x = 0;
                        }
                        if (this.root.rotation.x > metadata.constants.MAX_ROTATION_X) {
                            this.root.rotation.x = metadata.constants.MAX_ROTATION_X;
                        }
                    }
                    this.lastY = y;

                }
            },
            mouseScroll: function (delta) {
                let dx = delta;
                this.camera.position.z -= dx;

                if (this.camera.position.z < metadata.constants.MIN_CAMERA_Z)
                    this.camera.position.z = metadata.constants.MIN_CAMERA_Z;
                if (this.camera.position.z > metadata.constants.MAX_CAMERA_Z)
                    this.camera.position.z = metadata.constants.MAX_CAMERA_Z;
            }
        }
    }

    constructor(config) {
        super(config);
        this._planetSpecs = config && config.hasOwnProperty('planetSpecs') ? config.planets : this.config().planetSpecs;
        this._lastX = config && config.hasOwnProperty('lastX') ? config.lastX : this.config().lastX;
        this._lastY = config && config.hasOwnProperty('lastY') ? config.lastY : this.config().lastY;
        this._planets = [];
        this._orbits = [];
        this._mouseDown = false;
    }

    get planetSpecs() {
        return this._planetSpecs;
    }

    get planets() {
        return this._planets;
    }

    get orbits() {
        return this._orbits;
    }

    get lastX() {
        return this._lastX;
    }

    set lastX(x) {
        this._lastX = x;
    }

    get lastY() {
        return this._lastY;
    }

    set lastY(y) {
        this._lastY = y;
    }

    get mouseDown() {
        return this._mouseDown;
    }

    set mouseDown(val) {
        this._mouseDown = val;
    }

    createPlanets() {

        this.planetSpecs.forEach(function(spec) {
            let planet = new spec.type({
                        animateOrbit: true, animateRotation: true, showOrbit: true,
                        distance: spec.distance * metadata.constants.EARTH_DISTANCE + metadata.constants.SUN_SIZE_IN_EARTHS,
                        size: spec.size * metadata.constants.EXAGGERATED_PLANET_SCALE,
                        period: spec.period,
                        revolutionSpeed: 0.002,
                        map: spec.map,
                        autoInit: true
                    }),
            orbitDistance = spec.distance * metadata.constants.EARTH_DISTANCE + metadata.constants.SUN_SIZE_IN_EARTHS,
            orbit = new app.view.milkyway.Orbit({
                distance: orbitDistance,
                autoInit: true
            });

            this.addObject(planet);
            this.planets.push(planet);
            this.addObject(orbit);
            this.orbits.push(orbit);

        }, this);
    }

    render() {
        let sun = new app.view.milkyway.Sun({autoInit: true}),
            starDistance = metadata.constants.SUN_SIZE_IN_EARTHS +
                    metadata.constants.EARTH_DISTANCE *
                    metadata.constants.PLUTO_DISTANCE_IN_EARTHS,
            stars = new app.view.milkyway.Stars({autoInit: true, distance: starDistance}),
            ambientLight = new THREE.AmbientLight(0x676767);

        this.addObject(sun);
        this.addObject(stars);
        this.createPlanets();
        this.camera.position.set(0, -50, metadata.constants.SUN_SIZE_IN_EARTHS * 20);
        this.scene.add(ambientLight);
        this.root.rotation.x = Math.PI / 8;
    }
}
