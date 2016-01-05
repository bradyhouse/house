(function(app) {
    "use strict";


    let metadata = {
        urls: {
            earth: {
                normalMaterial: 'resources/images/earthSurfaceNormal.jpg',
                surfaceMaterial: 'resources/images/earthSurface.jpg',
                specularMaterial: 'resources/images/earthSurfaceSpecular.jpg',
                cloudsMaterial: 'resources/images/earthAtmosphere.png'
            },
            stars: 'resources/images/stars.png',
            moon: 'resources/images/moon.jpg'
        }
    };


    app.toolkit = app.toolkit || {};
    app.toolkit.three = app.toolkit.three || {};
    app.view = app.view || {};
    app.view.milkyway = app.view.milkyway || {};
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
                objects: []
            }
        }
        constructor(config) {
            super(config);
            this._objects = config && config.hasOwnProperty('objects') ? config.objects : this.config().objects;
            this._handleKeyUp = config && config.hasOwnProperty('keyUp') ? config.keyUp : this.config().keyUp;
            this._handleKeyDown = config && config.hasOwnProperty('keyDown') ? config.keyDown : this.config().keyDown;
            this._handleKeyPress = config && config.hasOwnProperty('keyPress') ? config.keyPress : this.config().keyPress;
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
            this.objects.push(obj);
            if (obj.object3D) {
                this.root.add(obj.object3D);
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
            camera.position.set(0, 0, 3.3333);
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
            var i, len;
            len = this.children.length;
            for (i = 0; i < len; i++) {
                this.children[i].update();
            }
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


    app.view.milkyway.earth.Earth = class extends app.toolkit.three.Object {
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


    app.view.milkyway.earth.Moon = class extends app.toolkit.three.Object {
        config() {
            return {
                earth: null
            }
        }
        constructor(config) {
            super();
            this._earth = config && config.hasOwnProperty('earth') ? config.earth : this.config().earth;
        }
        get earth() {
            return this._earth;
        }
        get size() {
            return 1 / 3.7 * this.scale;
        }
        get scale() {
            return 1.2;
        }
        get orbit() {
            return 356400;
        }
        get period() {
            return 13;
        }
        get inclination() {
            return 0.089;
        }
        update() {
            if (this.earth) {
                this.object3D.rotation.y += (this.earth.rotationY / this.period);
            }
        }
        init() {
            let geometry = new THREE.SphereGeometry(this.size, 32, 32),
                texture = THREE.ImageUtils.loadTexture(metadata.urls.moon),
                material = new THREE.MeshPhongMaterial({
                    map: texture,
                    ambient: 0x888888
                }),
                mesh = new THREE.Mesh(geometry, material),
                distance = this.earth ? this.orbit / this.earth.radius : 0,
                moonGroup = new THREE.Object3D();
            mesh.position.set(Math.sqrt(distance / 2), 0, -Math.sqrt(distance / 2));
            mesh.rotation.y = Math.PI;
            moonGroup.add(mesh);
            moonGroup.rotation.x = this.inclination;
            this.object3D = moonGroup;
        }
    }


    app.view.milkyway.Sun = class extends app.toolkit.three.Object {
        constructor() {
            super();
        }
        update() {}
        init() {
            let light = new THREE.PointLight(0xffffff, 2, 100);
            light.position.set(-10, 0, 20);
            this.object3D = light;
        }
    };


    app.view.Viewport = class extends app.toolkit.three.R {
        constructor() {
            super();
        }
        render() {
            let sun = new app.view.milkyway.Sun({});
            let earth = new app.view.milkyway.earth.Earth({});
            sun.init();
            this.addObject(sun);
            earth.init();
            this.addObject(earth);
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
                function( /* function FrameRequestCallback */ callback, /* DOMElement Element */ element) {
                    window.setTimeout(callback, 1000 / 60);
                };
        })();
    }
    app.controller = app.controller || {
        onDOMContentLoaded: function() {
            let hook = document.getElementById("fiddleHook"),
                container = document.createElement("div");
            container.setAttribute('style', "width: 98%; height: 98%; overflow:hidden; position:absolute; background-color:#000000");
            container.setAttribute('id', 'container');
            hook.appendChild(container);
            let view = new app.view.Viewport({});
            view.init({
                container: container
            });
            view.render();
            view.run();
        }
    };
    app.test = window.location.pathname.match('test') ? app.test || {
        publisher: function() {
            return new app.toolkit.three.Publisher();
        },
        r: function(config) {
            return new app.toolkit.three.R(config);
        },
        object: function(config) {
            return new app.toolkit.three.Object(config);
        },
        viewport: function(config) {
            return new app.view.Viewport(config);
        }
    } : null;
    if (!window.location.pathname.match('test')) {
        document.body.addEventListener('DOMContentLoaded', app.controller.onDOMContentLoaded(), false);
    }
})(window.app = window.app || {})
