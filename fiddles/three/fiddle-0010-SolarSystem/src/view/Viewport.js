app.view.Viewport = class extends app.toolkit.three.R {

    config() {
        return {
            planetSpecs: [
                {size: 1 / 2.54, distance: 0.4, period: 0.24, map: metadata.urls.mercury.surfaceMaterial },
                {size: 1 / 1.05, distance: 0.7, period: 0.62, map: metadata.urls.venus.surfaceMaterial}
            ]
        }
    }

    constructor(config) {
        super();
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

    get lastY() {
        return this._lastY;
    }

    get mouseDown() {
        return this._mouseDown;
    }

    createPlanets() {

        this.planetSpecs.forEach(function(spec) {
            let planet = new app.view.milkyway.Planet({

            })

        }, this);

        var i, len = SolarSystemApp.planet_specs.length;
        for (i = 0; i < len; i++) {
            var spec = SolarSystemApp.planet_specs[i];
            var planet = spec.type ? new spec.type : new Planet;

            planet.init({
                animateOrbit: true, animateRotation: true, showOrbit: true,
                distance: spec.distance * SolarSystemApp.EARTH_DISTANCE + Sun.SIZE_IN_EARTHS,
                size: spec.size * SolarSystemApp.EXAGGERATED_PLANET_SCALE,
                period: spec.period,
                revolutionSpeed: 0.002,
                map: spec.map
            });
            this.addObject(planet);
            this.planets.push(planet);

            var orbit = new Orbit();
            orbit.init(spec.distance * SolarSystemApp.EARTH_DISTANCE + Sun.SIZE_IN_EARTHS);
            this.addObject(orbit);
            this.orbits.push(orbit);
        }
    }


    render() {

        let sun = new Sun({autoInit: true}),
            starDistance = metadata.constants.SUN_SIZE_IN_EARTHS +
                    metadata.constants.EARTH_DISTANCE *
                    metadata.constants.PLUTO_DISTANCE_IN_EARTHS,
            stars = new Stars({autoInit: true, distance: starDistance});

        this.addObject(sun);
        this.addObject(stars);

        this.createPlanets();

        // Move the camera back so we can see our Solar System
        this.camera.position.set(0, 0, Sun.SIZE_IN_EARTHS * 8);

        var amb = new THREE.AmbientLight(0x676767);
        this.scene.add(amb);

        // Tilt the whole solar system toward the camera a bit
        this.root.rotation.x = Math.PI / 8;
        //this.root.rotation.z = Math.PI / 8;
    }
}
