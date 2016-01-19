(function(app) {
    "use strict";


    let metadata = {
        urls: {
            github: 'https://github.com/bradyhouse/house/tree/master/fiddles/three/fiddle-0011-PlanetTween',
            sun: {
                surfaceMaterial: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/297733/sunSurfaceMaterial.jpg',
                atmosphereMaterial: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/297733/sunAtmosphereMaterial.png'
            },
            mercury: {
                surfaceMaterial: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/297733/mercurySurfaceMaterial.jpg'
            },
            venus: {
                surfaceMaterial: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/297733/venusSurfaceMaterial.jpg'
            },
            earth: {
                normalMaterial: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/297733/earthSurfaceNormal.jpg',
                surfaceMaterial: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/297733/earthSurface.jpg',
                specularMaterial: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/297733/earthSurfaceSpecular.jpg',
                cloudsMaterial: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/297733/earthAtmosphere.png'
            },
            moon: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/297733/moon.jpg',
            mars: {
                surfaceMaterial: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/297733/marsSurfaceMaterial.png'
            },
            jupiter: {
                surfaceMaterial: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/297733/jupiterSurfaceMaterial.jpg'
            },
            saturn: {
                surfaceMaterial: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/297733/saturnSurface.jpg',
                ringsMaterial: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/297733/saturnRings.png'
            },
            uranus: {
                surfaceMaterial: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/297733/uranusSurfaceMaterial.jpg'
            },
            neptune: {
                surfaceMaterial: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/297733/neptuneSurfaceMaterial.jpg'
            },
            pluto: {
                surfaceMaterial: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/297733/plutoSurfaceMaterial.jpg'
            }
        },
        consoleTag: 'H O U S E ~ f i d d l e s',
        constants: {
            SUN_SIZE_IN_EARTHS: 20,
            MOUSE_MOVE_TOLERANCE: 4,
            MAX_ROTATION_X: Math.PI / 2,
            MAX_CAMERA_Z: 10 * 50,
            MIN_CAMERA_Z: 10 * 3,
            EARTH_DISTANCE: 50,
            PLUTO_DISTANCE_IN_EARTHS: 77.2,
            EARTH_DISTANCE_SQUARED: 45000,
            EXAGGERATED_PLANET_SCALE: 5.55,
            MOON_DISTANCE_FROM_EARTH: 356400,
            MOON_PERIOD: 28,
            MOON_ROTATION_SPEED: 0.003,
            MOON_EXAGGERATE_FACTOR: 1.2,
            MOON_SIZE_IN_EARTHS: 1 / 3.7 * 1.2
        }
    };


    app.toolkit = app.toolkit || {};
    app.toolkit.three = app.toolkit.three || {};
    app.view = app.view || {};
    app.view.milkyway = app.view.milkyway || {};
    app.view.milkyway.saturn = app.view.milkyway.saturn || {};
    app.view.milkyway.earth = app.view.milkyway.earth || {};


    app.toolkit.three.Publisher = class {
        constructor() {
            this._messageTypes = {};
        }
        get messageTypes() {
            return this._messageTypes;
        }
        subscribe(message, subscriber, callback) {
            var subscribers = this.messageTypes[message];
            if (subscribers) {
                if (this.findSubscriber(subscribers, subscriber) != -1) {
                    return;
                }
            } else {
                subscribers = [];
                this.messageTypes[message] = subscribers;
            }
            subscribers.push({
                subscriber: subscriber,
                callback: callback
            });
        }
        unsubscribe(message, subscriber, callback) {
            if (subscriber) {
                var subscribers = this.messageTypes[message];
                if (subscribers) {
                    var i = this.findSubscriber(subscribers, subscriber, callback);
                    if (i != -1) {
                        this.messageTypes[message].splice(i, 1);
                    }
                }
            } else {
                delete this.messageTypes[message];
            }
        }
        publish(message) {
            var subscribers = this.messageTypes[message];
            if (subscribers) {
                for (var i = 0; i < subscribers.length; i++) {
                    var args = [];
                    for (var j = 0; j < arguments.length - 1; j++) {
                        args.push(arguments[j + 1]);
                    }
                    subscribers[i].callback.apply(subscribers[i].subscriber, args);
                }
            }
        }
        findSubscriber(subscribers, subscriber) {
            for (var i = 0; i < subscribers.length; i++) {
                if (subscribers[i] == subscriber) {
                    return i;
                }
            }
            return -1;
        }
    }


    app.toolkit.three.R = class extends app.toolkit.three.Publisher {
        config() {
            return {
                keyUp: null,
                keyDown: null,
                keyPress: null,
                mouseMove: null,
                mouseDown: null,
                mouseUp: null,
                mouseScroll: null
            }
        }
        constructor(config) {
            super(config);
            this._objects = [];
            this._handleKeyUp = config && config.hasOwnProperty('keyUp') ? config.keyUp : this.config().keyUp;
            this._handleKeyDown = config && config.hasOwnProperty('keyDown') ? config.keyDown : this.config().keyDown;
            this._handleKeyPress = config && config.hasOwnProperty('keyPress') ? config.keyPress : this.config().keyPress;
            this._handleMouseMove = config && config.hasOwnProperty('mouseMove') ? config.mouseMove : this.config().mouseMove;
            this._handleMouseDown = config && config.hasOwnProperty('mouseDown') ? config.mouseDown : this.config().mouseDown;
            this._handleMouseUp = config && config.hasOwnProperty('mouseUp') ? config.mouseUp : this.config().mouseUp;
            this._handleMouseScroll = config && config.hasOwnProperty('mouseScroll') ? config.mouseScroll : this.config().mouseScroll;
            this._overObject = null;
            this._clickedObject = null;
        }
        get hook() {
            return this._hook;
        }
        get renderer() {
            return this._renderer;
        }
        get scene() {
            return this._scene;
        }
        get camera() {
            return this._camera;
        }
        get root() {
            return this._root;
        }
        get projector() {
            return this._projector;
        }
        get objects() {
            return this._objects;
        }
        get handleKeyUp() {
            return this._handleKeyUp;
        }
        get handleKeyDown() {
            return this._handleKeyDown;
        }
        get handleKeyPress() {
            return this._handleKeyPress;
        }
        get handleMouseMove() {
            return this._handleMouseMove;
        }
        get handleMouseDown() {
            return this._handleMouseDown;
        }
        get handleMouseUp() {
            return this._handleMouseUp;
        }
        get handleMouseScroll() {
            return this._handleMouseScroll;
        }
        get clickedObject() {
            return this._clickedObject;
        }
        set clickedObject(o) {
            this._clickedObject = o;
        }
        get overObject() {
            return this._overObject;
        }
        set overObject(o) {
            this._overObject = o;
        }
        onDocumentMouseMove(event) {
            event.preventDefault();
            if (this.clickedObject && this.clickedObject.handleMouseMove) {
                let hitpoint = null,
                    hitnormal = null;
                let intersected = this.objectFromMouse(event.pageX, event.pageY);
                if (intersected.object == this.clickedObject) {
                    hitpoint = intersected.point;
                    hitnormal = intersected.normal;
                }
                this.clickedObject.handleMouseMove(event.pageX, event.pageY, hitpoint, hitnormal);
            } else {
                let handled = false;
                let oldObj = this.overObject;
                let intersected = this.objectFromMouse(event.pageX, event.pageY);
                this.overObject = intersected.object;
                if (this.overObject != oldObj) {
                    if (oldObj) {
                        this.hook.style.cursor = 'auto';
                        if (oldObj.handleMouseOut) {
                            oldObj.handleMouseOut(event.pageX, event.pageY);
                        }
                    }
                    if (this.overObject) {
                        if (this.overObject.overCursor) {
                            this.hook.style.cursor = this.overObject.overCursor;
                        }
                        if (this.overObject.handleMouseOver) {
                            this.overObject.handleMouseOver(event.pageX, event.pageY);
                        }
                    }
                    handled = true;
                }
                if (!handled && this.handleMouseMove) {
                    this.handleMouseMove(event.pageX, event.pageY);
                }
            }
        }
        onDocumentMouseDown(event) {
            event.preventDefault();
            let handled = false;
            let intersected = this.objectFromMouse(event.pageX, event.pageY);
            if (intersected.object) {
                if (intersected.object.handleMouseDown) {
                    intersected.object.handleMouseDown(event.pageX, event.pageY, intersected.point, intersected.normal);
                    this.clickedObject = intersected.object;
                    handled = true;
                }
            }
            if (!handled && this.handleMouseDown) {
                this.handleMouseDown(event.pageX, event.pageY);
            }
        }
        onDocumentMouseUp(event) {
            event.preventDefault();
            let handled = false;
            let intersected = this.objectFromMouse(event.pageX, event.pageY);
            if (intersected.object) {
                if (intersected.object.handleMouseUp) {
                    intersected.object.handleMouseUp(event.pageX, event.pageY, intersected.point, intersected.normal);
                    handled = true;
                }
            }
            if (!handled && this.handleMouseUp) {
                this.handleMouseUp(event.pageX, event.pageY);
            }
            this.clickedObject = null;
        }
        onDocumentMouseScroll(event, delta) {
            event.preventDefault();
            if (this.handleMouseScroll) {
                this.handleMouseScroll(delta);
            }
        }
        onKeyUp(event) {
            event.preventDefault();
            if (this.handleKeyUp) {
                this.handleKeyUp(event.keyCode, event.charCode);
            }
        }
        onKeyDown(event) {
            event.preventDefault();
            if (this.handleKeyUp) {
                this.handleKeyUp(event.keyCode, event.charCode);
            }
        }
        onKeyPress(event) {
            event.preventDefault();
            if (this.handleKeyPress) {
                this.handleKeyPress(event.keyCode, event.charCode);
            }
        }
        onWindowResize(event) {
            this.renderer.setSize(this.hook.offsetWidth, this.hook.offsetHeight);
            this.camera.aspect = this.hook.offsetWidth / this.hook.offsetHeight;
            this.camera.updateProjectionMatrix();
        }
        objectFromMouse(pagex, pagey) {
            let offset = $(this.renderer.domElement).offset();
            let eltx = pagex - offset.left;
            let elty = pagey - offset.top;
            let vpx = (eltx / this.hook.offsetWidth) * 2 - 1;
            let vpy = -(elty / this.hook.offsetHeight) * 2 + 1;
            let vector = new THREE.Vector3(vpx, vpy, 0.5);
            this.projector.unprojectVector(vector, this.camera);
            let ray = new THREE.Ray(this.camera.position, vector.subSelf(this.camera.position).normalize());
            let intersects = ray.intersectScene(this.scene);
            if (intersects.length > 0) {
                let i = 0;
                while (!intersects[i].object.visible) {
                    i++;
                }
                let intersected = intersects[i];
                let mat = new THREE.Matrix4().getInverse(intersected.object.matrixWorld);
                let point = mat.multiplyVector3(intersected.point);
                return (this.findObjectFromIntersected(intersected.object, intersected.point, intersected.face.normal));
            } else {
                return {
                    object: null,
                    point: null,
                    normal: null
                };
            }
        }
        findObjectFromIntersected(object, point, normal) {
            if (object.data) {
                return {
                    object: object.data,
                    point: point,
                    normal: normal
                };
            } else if (object.parent) {
                return this.findObjectFromIntersected(object.parent, point, normal);
            } else {
                return {
                    object: null,
                    point: null,
                    normal: null
                };
            }
        }
        addObject(obj) {
            if (obj) {
                this._objects.push(obj);
                if (obj.object3D) {
                    this._root.add(obj.object3D);
                }
            }
        }
        removeObject(obj) {
            var index = this.objects.indexOf(obj);
            if (index != -1) {
                this.objects.splice(index, 1);
                if (obj.object3D) {
                    this.root.remove(obj.object3D);
                }
            }
        }
        initMouseListeners() {
            let dom = this.renderer.domElement,
                that = this;
            dom.addEventListener('mousemove',
                function(e) {
                    that.onDocumentMouseMove(e);
                }, false);
            dom.addEventListener('mousedown',
                function(e) {
                    that.onDocumentMouseDown(e);
                }, false);
            dom.addEventListener('mouseup',
                function(e) {
                    that.onDocumentMouseUp(e);
                }, false);
            $(dom).mousewheel(
                function(e, delta) {
                    that.onDocumentMouseScroll(e, delta);
                }
            );
        }
        initKeyboardListeners() {
            let dom = this.renderer.domElement;
            let that = this;
            dom.addEventListener('keydown',
                function(e) {
                    that.onKeyDown(e);
                }, false);
            dom.addEventListener('keyup',
                function(e) {
                    that.onKeyUp(e);
                }, false);
            dom.addEventListener('keypress',
                function(e) {
                    that.onKeyPress(e);
                }, false);
            dom.setAttribute("tabindex", 1);
            dom.style.outline = 'none';
        }
        initWindowListeners() {
            let that = this;
            window.addEventListener('resize', function(event) {
                that.onWindowResize(event);
            }, false);
        }
        init(config) {
            let myConfig = config || {},
                container = myConfig.container,
                canvas = myConfig.canvas,
                renderer,
                scene,
                camera,
                root,
                projector;
            renderer = new THREE.WebGLRenderer({
                antialias: true,
                canvas: canvas
            });
            renderer.setSize(container.offsetWidth, container.offsetHeight);
            container.appendChild(renderer.domElement);
            scene = new THREE.Scene();
            scene.add(new THREE.AmbientLight(0x505050));
            scene.data = this;
            camera = new THREE.PerspectiveCamera(45, container.offsetWidth / container.offsetHeight, 1, 10000);
            camera.position.set(0, 0, 100);
            scene.add(camera);
            root = new THREE.Object3D();
            scene.add(root);
            projector = new THREE.Projector();
            this._hook = container;
            this._renderer = renderer;
            this._scene = scene;
            this._camera = camera;
            this._projector = projector;
            this._root = root;
            this.initMouseListeners();
            this.initKeyboardListeners();
            this.initWindowListeners();
        }
        run() {
            this.update();
            this.renderer.render(this.scene, this.camera);
            var that = this;
            requestAnimationFrame(function() {
                that.run();
            });
        }
        update() {
            var i, len;
            len = this.objects.length;
            for (i = 0; i < len; i++) {
                this.objects[i].update();
            }
        }
    }


    app.toolkit.three.Object = class extends app.toolkit.three.Publisher {
        constructor() {
            super();
            this._object3D = null;
            this._children = [];
        }
        get object3D() {
            return this._object3D;
        }
        set object3D(o) {
            //this._object3D.data = this;
            this._object3D = o;
        }
        get scene() {
            var scene = null;
            if (this.object3D) {
                var obj = this.object3D;
                while (obj.parent) {
                    obj = obj.parent;
                }
                scene = obj;
            }
            return scene;
        }
        get app() {
            var scene = this.scene;
            return scene ? scene.data : null;
        }
        get children() {
            return this._children;
        }
        removeChild(child) {
            var index = this.children.indexOf(child);
            if (index != -1) {
                this.children.splice(index, 1);
                if (child.object3D) {
                    this.object3D.remove(child.object3D);
                }
            }
        }
        addChild(child) {
            this.children.push(child);
            if (child.object3D) {
                this.object3D.add(child.object3D);
            }
        }
        updateChildren() {
            this.children.forEach(function(child) {
                child.update();
            });
        }
        animateChildren() {
            this.children.forEach(function(child) {
                child.animate();
            });
        }
        setPosition(x, y, z) {
            if (this.object3D) {
                this.object3D.position.set(x, y, z);
            }
        }
        setScale(x, y, z) {
            if (this.object3D) {
                this.object3D.scale.set(x, y, z);
            }
        }
        setVisible(visible) {
            function setVisible(obj, visible) {
                obj.visible = visible;
                var i, len = obj.children.length;
                for (i = 0; i < len; i++) {
                    setVisible(obj.children[i], visible);
                }
            }
            if (this.object3D) {
                setVisible(this.object3D, visible);
            }
        }
        update() {
            this.updateChildren();
        }
        init() {}
    }


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
                let vector = new THREE.Vector3((Math.random() * 2 - 1) * this.distance, (Math.random() * 2 - 1) * this.distance, (Math.random() * 2 - 1) * this.distance);
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
            if (this.object3D.position.y > 0) {
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
                    time: {
                        type: "f",
                        value: 1.0
                    },
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
            if (this.autoInit) {
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
                let x = this.distance * Math.cos(i / this.segmentCount * twopi),
                    z = this.distance * Math.sin(i / this.segmentCount * twopi),
                    vertex = new THREE.Vertex(new THREE.Vector3(x, 0, z));
                geometry.vertices.push(vertex);
            }
            let material = new THREE.LineBasicMaterial({
                    color: 0x66ffff,
                    opacity: .6,
                    linewidth: .5
                }),
                line = new THREE.Line(geometry, material);
            this.object3D = line;
        }
    }


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
                material = new THREE.MeshPhongMaterial({
                    map: texture,
                    ambient: 0x333333
                }),
                globeMesh = new THREE.Mesh(geometry, material);
            this.planetGroup.add(globeMesh);
            this._globeMesh = globeMesh;
        }
        animate() {
            if (this.planetGroup.position.y > 0) {
                let newposY = this.planetGroup.position.y - 10;
                if (newposY < 0) {
                    newposY = 0;
                }
                new TWEEN.Tween(this.planetGroup.position)
                    .to({
                        y: newposY
                    }, 10).easing(TWEEN.Easing.Bounce.EaseIn).start();
            }
            this.update();
        }
        init() {
            let planetOrbitGroup = new THREE.Object3D(),
                planetGroup = new THREE.Object3D(),
                distSquared = this.distance * this.distance;
            planetGroup.position.set(Math.sqrt(distSquared / 2), 1000, -Math.sqrt(distSquared / 2));
            planetOrbitGroup.add(planetGroup);
            planetGroup.scale.set(this.size, this.size, this.size);
            this.object3D = planetOrbitGroup;
            this._planetGroup = planetGroup;
            this.render();
        }
    }


    app.view.milkyway.saturn.Saturn = class extends app.view.milkyway.Planet {
        constructor(config) {
            super(config);
            this.createRings();
        }
        get globeMesh() {
            return this._globeMesh;
        }
        get animateOrbit() {
            return true;
        }
        get ringsMesh() {
            return this._ringsMesh;
        }
        get tilt() {
            return -0.466;
        }
        get rotationY() {
            return 0.003;
        }
        update() {
            this.object3D.rotation.y += this.revolutionSpeed / this.period;
            if (this.globeMesh) {
                this.globeMesh.rotation.y += this.rotationY;
            }
            if (this.ringsMesh) {
                this.ringsMesh.rotation.z -= this.rotationY;
            }
            this.updateChildren();
        }
        createRings() {
            let ringsmap = metadata.urls.saturn.ringsMaterial,
                geometry = new app.view.milkyway.saturn.Rings({
                    innerRadius: 1.1,
                    outerRadius: 1.867,
                    gridY: 200,
                    autoInit: true
                }),
                texture = THREE.ImageUtils.loadTexture(ringsmap),
                material = new THREE.MeshLambertMaterial({
                    map: texture,
                    transparent: false,
                    ambient: 0xffffff
                }),
                ringsMesh = new THREE.Mesh(geometry, material),
                distsquared = this.distance * this.distance;
            ringsMesh.doubleSided = true;
            ringsMesh.rotation.x = 5;
            ringsMesh.rotation.y = .09;
            this.planetGroup.add(ringsMesh);
            this._ringsMesh = ringsMesh;
        }
    }


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
        update() {}
        init() {
            let twopi = 2 * Math.PI,
                iVer = Math.max(2, this.gridY);
            for (let i = 0; i < (iVer + 1); i++) {
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
            for (let i = 0; i < (iVer + 1); i++) {
                this.faces.push(new THREE.Face3(i * 4, i * 4 + 1, i * 4 + 2));
                this.faces.push(new THREE.Face3(i * 4, i * 4 + 2, i * 4 + 3));
                this.faceVertexUvs[0].push([
                    new THREE.UV(0, 1),
                    new THREE.UV(1, 1),
                    new THREE.UV(1, 0)
                ]);
                this.faceVertexUvs[0].push([
                    new THREE.UV(0, 1),
                    new THREE.UV(1, 0),
                    new THREE.UV(0, 0)
                ]);
            }
            this.computeCentroids();
            this.computeFaceNormals();
            this.boundingSphere = {
                radius: this.outerRadius
            };
        }
    }


    app.view.milkyway.earth.Moon = class extends app.toolkit.three.Object {
        config() {
            return {
                earth: null,
                autoInit: false
            }
        }
        constructor(config) {
            super();
            this._autoInit = config && config.hasOwnProperty('autoInit') ? config.autoInit : this.config().autoInit;
            this._earth = config && config.hasOwnProperty('earth') ? config.earth : this.config().earth;
            if (this.autoInit) {
                this.init();
            }
        }
        get earth() {
            return this._earth;
        }
        get size() {
            return .02;
        }
        get scale() {
            return 1.2;
        }
        get orbit() {
            return 356400;
        }
        get period() {
            return 3;
        }
        get inclination() {
            return 0.089;
        }
        get rotationSpeed() {
            return this._rotationSpeed;
        }
        get autoInit() {
            return this._autoInit;
        }
        update() {
            this.mesh.rotation.y += this.rotationSpeed;
        }
        get distance() {
            return this._distance;
        }
        get mesh() {
            return this._mesh;
        }
        animate() {
            if (this.object3D.position.y > 0) {
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
            let rotationSpeed = metadata.constants.MOON_ROTATION_SPEED,
                size = this.size,
                moonGroup = new THREE.Object3D(),
                map = metadata.urls.moon,
                geometry = new THREE.SphereGeometry(0, 32, 32),
                texture = THREE.ImageUtils.loadTexture(map),
                material = new THREE.MeshPhongMaterial({
                    map: texture,
                    ambient: 0x888888
                }),
                mesh = new THREE.Mesh(geometry, material),
                distance = metadata.constants.MOON_DISTANCE_FROM_EARTH / this.earth.radius / .022,
                distSquared = distance * distance;
            this._rotationSpeed = rotationSpeed;
            mesh.position.set(distance, 0, -Math.sqrt(distSquared / 2));
            mesh.rotation.y = Math.PI;
            moonGroup.add(mesh);
            moonGroup.position.y = 1000;
            moonGroup.rotation.x = this.inclination;
            moonGroup.scale.set(size, size, size);
            this.object3D = moonGroup;
            this._mesh = mesh;
            this._distance = distance;
        }
    }


    app.view.milkyway.earth.Earth = class extends app.view.milkyway.Planet {
        constructor(config) {
            super(config);
            this.initAtmosphere();
            this.initMoon();
        }
        get rotationY() {
            return 0.003;
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
        get autoInit() {
            return this._autoInit;
        }
        get moon() {
            return this._moon;
        }
        update() {
            if (this.animateOrbit) {
                this.object3D.rotation.y += this.revolutionSpeed / this.period;
            }
            if (this.globeMesh) {
                this.globeMesh.rotation.y += this.rotationY;
            }
            if (this.cloudsMesh) {
                this.cloudsMesh.rotation.y += this.cloudRotationY;
            }
            if (this.planetGroup.position.y <= 0) {
                this.animateChildren();
            } else {
                this.updateChildren();
            }
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
            this.planetGroup.add(cloudsMesh);
            this._cloudsMesh = cloudsMesh;
        }
        initMoon() {
            let moon = new app.view.milkyway.earth.Moon({
                earth: this,
                autoInit: true
            });
            this.addChild(moon);
        }
    };


    app.view.Viewport = class extends app.toolkit.three.R {
        config() {
            return {
                planetSpecs: [{
                    type: app.view.milkyway.Planet,
                    size: 1 / 2.54,
                    distance: 0.4,
                    period: 0.24,
                    map: metadata.urls.mercury.surfaceMaterial
                }, {
                    type: app.view.milkyway.Planet,
                    size: 1 / 1.05,
                    distance: 0.7,
                    period: 0.62,
                    map: metadata.urls.venus.surfaceMaterial
                }, {
                    type: app.view.milkyway.earth.Earth,
                    size: 1,
                    distance: 1,
                    period: 1,
                    map: metadata.urls.earth.surfaceMaterial
                }, {
                    type: app.view.milkyway.Planet,
                    size: 1 / 1.88,
                    distance: 1.6,
                    period: 1.88,
                    map: metadata.urls.mars.surfaceMaterial
                }, {
                    type: app.view.milkyway.Planet,
                    size: 2.7,
                    distance: 2.6,
                    period: 2,
                    map: metadata.urls.jupiter.surfaceMaterial
                }, {
                    type: app.view.milkyway.saturn.Saturn,
                    size: 2.14,
                    distance: 5,
                    period: 3,
                    map: metadata.urls.saturn.surfaceMaterial
                }, {
                    type: app.view.milkyway.Planet,
                    size: 1,
                    distance: 9.8,
                    period: 4,
                    map: metadata.urls.uranus.surfaceMaterial
                }, {
                    type: app.view.milkyway.Planet,
                    size: 1.94,
                    distance: 19.4,
                    period: 5,
                    map: metadata.urls.neptune.surfaceMaterial
                }, {
                    type: app.view.milkyway.Planet,
                    size: 10 / 5.55,
                    distance: 38.6,
                    period: 6,
                    map: metadata.urls.pluto.surfaceMaterial
                }],
                mouseDown: function(x, y) {
                    this.lastX = x;
                    this.lastY = y;
                    this.mouseDown = true;
                },
                mouseUp: function(x, y) {
                    this.lastX = x;
                    this.lastY = y;
                    this.mouseDown = false;
                },
                mouseMove: function(x, y) {
                    if (this.mouseDown) {
                        let dx = x - this.lastX;
                        if (Math.abs(dx) > metadata.constants.MOUSE_MOVE_TOLERANCE) {
                            this.root.rotation.y -= (dx * 0.01);
                        }
                        this.lastX = x;
                    }
                },
                mouseScroll: function(delta) {
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
        get sun() {
            return this._sun;
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
        addOrbits() {
            let me = this;
            this.orbits.forEach(function(orbit) {
                me.addObject(orbit);
            });
            this._orbits = [];
        }
        updateCamera() {
            let newposZ = this.camera.position.z - 1;
            new TWEEN.Tween(this.camera.position)
                .to({
                    z: newposZ
                }, 10).start();
        }
        isCameraPositionFinal() {
            return this.camera.position.z <= (metadata.constants.SUN_SIZE_IN_EARTHS * 10);
        }
        rotateRoot() {
            let deltaX = (Math.PI / 8) / 4,
                newRotationX = this.root.rotation.x + deltaX;
            new TWEEN.Tween(this.root.rotation)
                .to({
                    x: newRotationX
                }, 100).start();
        }
        isRootRotationFinal() {
            return this.root.rotation.x >= (Math.PI / 8);
        }
        update() {
            TWEEN.update();
            let hiddenPlanets = this.planets.filter(function(planet) {
                return planet.planetGroup.position.y > 0;
            });
            if (this.sun.object3D.position.y <= 0) {
                if (hiddenPlanets.length) {
                    hiddenPlanets[0].animate();
                } else if (this.orbits.length) {
                    this.addOrbits();
                } else if (!this.isCameraPositionFinal()) {
                    this.updateCamera();
                } else if (!this.isRootRotationFinal()) {
                    this.rotateRoot();
                }
            }
            this.planets.forEach(function(planet) {
                planet.update();
            });
            this.sun.animate();
        }
        createPlanets() {
            this.planetSpecs.forEach(function(spec) {
                let planet = new spec.type({
                        animateOrbit: true,
                        animateRotation: true,
                        showOrbit: true,
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
                this.orbits.push(orbit);
            }, this);
        }
        render() {
            let sun = new app.view.milkyway.Sun({
                    autoInit: true
                }),
                starDistance = metadata.constants.SUN_SIZE_IN_EARTHS +
                metadata.constants.EARTH_DISTANCE *
                metadata.constants.PLUTO_DISTANCE_IN_EARTHS,
                stars = new app.view.milkyway.Stars({
                    autoInit: true,
                    distance: starDistance
                }),
                ambientLight = new THREE.AmbientLight(0x676767);
            this._sun = sun;
            this.root.rotation.y = -0.81;
            this.addObject(sun);
            this.addObject(stars);
            this.createPlanets();
            this.camera.position.set(0, 0, 500);
            this.scene.add(ambientLight);
        }
    }


    /**
     * Provides requestAnimationFrame in a cross browser way.
     * http://paulirish.com/2011/requestanimationframe-for-smart-animating/
     */
    if (!window.requestAnimationFrame) {
        window.requestAnimationFrame = (function() {
            return window.webkitRequestAnimationFrame ||
                window.mozRequestAnimationFrame ||
                window.oRequestAnimationFrame ||
                window.msRequestAnimationFrame ||
                function(callback, element) {
                    window.setTimeout(callback, 1000 / 60);
                };
        })();
    }
    app.controller = app.controller || {
        onDOMContentLoaded: function() {
            let hook = document.getElementById("fiddleHook"),
                container = document.createElement("div");
            this.configConsole();
            container.setAttribute('style', "width: 98%; height: 98%; overflow:hidden; position:absolute; background-color:#000000; cursor: hand;");
            container.setAttribute('id', 'container');
            hook.appendChild(container);
            let view = new app.view.Viewport({
                hook: hook
            });
            view.init({
                container: container
            });
            view.render();
            view.run();
        },
        configConsole: function() {
            console.log("%c" + metadata.consoleTag, 'font-style: italic; font-size: 20px;');
            console.log("%c" + metadata.urls.github, "color: blue; font-style: italic; text-decoration: underline; background-color: #FFFF00;");
            console.group();
        }
    };
    app.test = window.location.pathname.match('test') ? app.test || {
        publisher: function() {
            return new app.toolkit.three.Publisher();
        },
        r: function(config) {
            return new app.toolkit.three.R(config);
        },
        toolkit: function() {
            return app.toolkit;
        },
        metadata: function() {
            return metadata
        },
        object: function(config) {
            return new app.toolkit.three.Object(config);
        },
        viewport: function(config) {
            return new app.view.Viewport(config);
        },
        sun: function(config) {
            return new app.view.milkyway.Sun(config);
        }
    } : null;
    if (!window.location.pathname.match('test')) {
        document.body.addEventListener('DOMContentLoaded', app.controller.onDOMContentLoaded(), false);
    }
})(window.app = window.app || {})
