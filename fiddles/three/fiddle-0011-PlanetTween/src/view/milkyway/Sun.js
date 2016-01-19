app.view.milkyway.Sun = class extends app.toolkit.three.Object {

    config() {
        return {
            autoInit: false,
            size: metadata.constants.SUN_SIZE_IN_EARTHS,
            fragmentShader: 'uniform float time;\n' +
            'uniform sampler2D texture1;\n' +
            'uniform sampler2D texture2;\n' +
            'varying vec2 texCoord;\n' +
            'void main( void ) {\n' +
            '   vec4 noise = texture2D( texture1, texCoord );\n' +
            '   vec2 T1 = texCoord + vec2( 1.5, -1.5 ) * time  * 0.01;\n' +
            '   vec2 T2 = texCoord + vec2( -0.5, 2.0 ) * time *  0.01;\n' +
            '   T1.x -= noise.r * 2.0;\n' +
            '   T1.y += noise.g * 4.0;\n' +
            '   T2.x += noise.g * 0.2;\n' +
            '   T2.y += noise.b * 0.2;\n' +
            '   float p = texture2D( texture1, T1 * 2.0 ).a + 0.25;\n' +
            '   vec4 color = texture2D( texture2, T2 );\n' +
            '   vec4 temp = color * 2.0 * ( vec4( p, p, p, p ) ) + ( color * color );\n' +
            '   gl_FragColor = temp;\n' +
            '}',
            vertexShader: 'varying vec2 texCoord;\n' +
            'void main() {\n' +
            '	texCoord = uv;\n' +
            '	vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );\n' +
            '	gl_Position = projectionMatrix * mvPosition;\n' +
            '}',
            clock: new THREE.Clock()

        }
    }

    constructor(config) {
        super();
        this._autoInit = config && config.hasOwnProperty('autoInit') ? config.autoInit : this.config().autoInit;
        this._fragmentShader = config && config.hasOwnProperty('fragmentShader') ? config.fragmentShader : this.config().fragmentShader;
        this._vertexShader = config && config.hasOwnProperty('vertexShader') ? config.vertexShader : this.config().vertexShader;
        this._clock = config && config.hasOwnProperty('clock') ? config.clock : this.config().clock;
        this._size = config && config.hasOwnProperty('size') ? config.size : this.config().size;

        if (this.autoInit) {
            this.init();
        }
    }

    get clock() {
        return this._clock;
    }

    get fragmentShader() {
        return this._fragmentShader;
    }

    get vertexShader() {
        return this._vertexShader;
    }

    get uniforms() {
        return this._uniforms;
    }

    get clock() {
        return this._clock;
    }

    get size() {
        return this._size;
    }

    get autoInit() {
        return this._autoInit;
    }

    update() {
        let delta = this.clock.getDelta();
        this.uniforms.time.value += delta;
        this.object3D.rotation.y -= 0.001;
        this.updateChildren();
    }

    animate() {
        if(this.object3D.position.y > 0) {
            let newposY = this.object3D.position.y - 10;
            if (newposY < 0) {
                newposY = 0;
            }
            new TWEEN.Tween(this.object3D.position)
                .to({
                    y: newposY
                }, 10).easing(TWEEN.Easing.Bounce.EaseIn).start();
        }
        this.update();
    }

    init() {

        let sunGroup = new THREE.Object3D(),
            uniforms = {
                time: {type: "f", value: 1.0},
                texture1: {
                    type: "t",
                    value: 0,
                    texture: THREE.ImageUtils.loadTexture(metadata.urls.sun.atmosphereMaterial)
                },
                texture2: {
                    type: "t",
                    value: 1,
                    texture: THREE.ImageUtils.loadTexture(metadata.urls.sun.surfaceMaterial)
                }
            };

        uniforms.texture1.texture.wrapS = uniforms.texture1.texture.wrapT = THREE.Repeat;
        uniforms.texture2.texture.wrapS = uniforms.texture2.texture.wrapT = THREE.Repeat;

        let material = new THREE.ShaderMaterial({
                uniforms: uniforms,
                vertexShader: this.vertexShader,
                fragmentShader: this.fragmentShader
            }),
            geometry = new THREE.SphereGeometry(this.size, 64, 64),
            sunMesh = new THREE.Mesh(geometry, material);

        this._uniforms = uniforms;
        this._clock = new THREE.Clock();

        let light = new THREE.PointLight(0xffffff, 1.2, 100000);

        sunGroup.add(sunMesh);
        sunGroup.add(light);
        sunGroup.position.y = 2000;
        this.object3D = sunGroup;


    }

};
