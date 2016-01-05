app.view.milkyway.saturn.Rings = class extends THREE.Geometry {

    config() {
        return {
            innerRadius: .5,
            outerRadius: 1,
            gridY: 200,
            autoInit: false
        }
    }

    constructor(config) {
        super();
        this._innerRadius = config && config.hasOwnProperty('innerRadius') ? config.innerRadius : this.config().innerRadius;
        this._outerRadius = config && config.hasOwnProperty('outerRadius') ? config.outerRadius : this.config().outerRadius;
        this._gridY = config && config.hasOwnProperty('gridY') ? config.gridY : this.config().gridY;
        this._autoInit = config && config.hasOwnProperty('autoInit') ? config.autoInit : this.config().autoInit;
        if (this.autoInit) {
            this.init();
        }
    }

    get innerRadius() {
        return this._innerRadius;
    }

    get outerRadius() {
        return this._outerRadius;
    }

    get gridY() {
        return this._gridY;
    }

    get autoInit() {
        return this._autoInit;
    }

    init() {
        let twopi = 2 * Math.PI,
            iVer = Math.max(2, this.gridY);

        for(let i=0; i < (iVer + 1); i++) {
            let fRad1 = i / iVer,
                fRad2 = (i + 1) / iVer,
                fX1 = this.innerRadius * Math.cos(fRad1 * twopi),
                fY1 = this.innerRadius * Math.sin(fRad1 * twopi),
                fX2 = this.outerRadius * Math.cos(fRad1 * twopi),
                fY2 = this.outerRadius * Math.sin(fRad1 * twopi),
                fX4 = this.innerRadius * Math.cos(fRad2 * twopi),
                fY4 = this.innerRadius * Math.sin(fRad2 * twopi),
                fX3 = this.outerRadius * Math.cos(fRad2 * twopi),
                fY3 = this.outerRadius * Math.sin(fRad2 * twopi),
                v1 = new THREE.Vector3(fX1, fY1, 0),
                v2 = new THREE.Vector3(fX2, fY2, 0),
                v3 = new THREE.Vector3(fX3, fY3, 0),
                v4 = new THREE.Vector3(fX4, fY4, 0);
            this.vertices.push(new THREE.Vertex(v1));
            this.vertices.push(new THREE.Vertex(v2));
            this.vertices.push(new THREE.Vertex(v3));
            this.vertices.push(new THREE.Vertex(v4));
        }

        for(let i=0; i < (iVer + 1); i++) {
            this.faces.push(new THREE.Face3(i * 4, i * 4 + 1, i * 4 + 2));
            this.faces.push(new THREE.Face3(i * 4, i * 4 + 2, i * 4 + 3));
            this.faceVertexUvs[ 0 ].push([
                new THREE.UV(0,1),
                new THREE.UV(1,1),
                new THREE.UV(1,0)
            ]);
            this.faceVertexUvs[ 0 ].push([
                new THREE.UV(0,1),
                new THREE.UV(1,0),
                new THREE.UV(0,0)
            ]);
        }

        this.computeCentroids();
        this.computeFaceNormals();
        this.boundingSphere = {
            radius: this.outerRadius
        };

    }

}
