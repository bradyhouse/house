app.view.milkyway.earth.Earth = class extends app.view.milkyway.Planet {

    constructor() {
        super();
    }

    get rotationY() {
        return 0.0025;
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

    update() {
        if (this.globeMesh) {
            this.globeMesh.rotation.y += this.rotationY;
        }
        if (this.cloudsMesh) {
            this.cloudsMesh.rotation.y += this.cloudRotationY;
        }
        this.updateChildren();
    }

    init() {
        let group = new THREE.Object3D();
        this.object3D = group;

        this.initSurface();
        this.initAtmosphere();
        this.initMoon();
    }

    initSurface() {
        let surfaceMap = THREE.ImageUtils.loadTexture(metadata.urls.earth.surfaceMaterial),
            normalMap = THREE.ImageUtils.loadTexture(metadata.urls.earth.normalMaterial),
            specularMap = THREE.ImageUtils.loadTexture(metadata.urls.earth.specularMaterial),
            shader = THREE.ShaderUtils.lib["normal"],
            uniforms = THREE.UniformsUtils.clone(shader.uniforms);

        uniforms["tNormal"].texture = normalMap;
        uniforms["tDiffuse"].texture = surfaceMap;
        uniforms["tSpecular"].texture = specularMap;

        uniforms["enableDiffuse"].value = true;
        uniforms["enableSpecular"].value = true;

        let shaderMaterial = new THREE.ShaderMaterial({
            fragmentShader: shader.fragmentShader,
            vertexShader: shader.vertexShader,
            uniforms: uniforms,
            lights: true
        }),
            globeGeometry = new THREE.SphereGeometry(1, 32, 32);
        globeGeometry.computeTangents();

        let globeMesh = new THREE.Mesh(globeGeometry, shaderMaterial);
        globeMesh.rotation.z = this.tilt;

        this.object3D.add(globeMesh);
        this._globeMesh = globeMesh;

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
        this.object3D.add(cloudsMesh);
        this._cloudsMesh = cloudsMesh;

    }

    initMoon() {
        let moon = new app.view.milkyway.earth.Moon({
            earth: this
        });
        moon.init();
        this.addChild(moon);
    }

};
