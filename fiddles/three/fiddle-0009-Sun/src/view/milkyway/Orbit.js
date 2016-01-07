app.view.milkyway.Orbit = class extends app.toolkit.three.Object {

    config() {
        return {
            autoInit: false,
            segmentCount: 120,
            distance: 10
        }
    }

    constructor(config) {
        super();
        this._segmentCount = config && config.hasOwnProperty('segmentCount') ? config.segmentCount : this.config().segmentCount;
        this._distance = config && config.hasOwnProperty('distance') ? config.distance : this.config().distance;
        this._autoInit = config && config.hasOwnProperty('autoInit') ? config.autoInit : this.config().autoInit;
        if(this.autoInit) {
            this.init();
        }
    }

    get autoInit() {
        return this._autoInit;
    }

    get segmentCount() {
        return this._segmentCount;
    }

    get distance() {
        return this._distance;
    }

    init() {
        let geometry = new THREE.Geometry(),
            twopi = 2 * Math.PI;

        for (let i = 0; i <= this.segmentCount; i++) {
            let x = this.distance * Math.cos( i / this.segmentCount * twopi ),
                z = this.distance * Math.sin( i / this.segmentCount * twopi ),
                vertex = new THREE.Vertex(new THREE.Vector3(x, 0, z));
            geometry.vertices.push(vertex);
        }

        let material = new THREE.LineBasicMaterial({
                color: 0xffffff,
                opacity: .5,
                linewidth: 2
            }),
            line = new THREE.Line(geometry, material);

        line.rotation.x = .5;

        this.object3D = line;
    }
}
