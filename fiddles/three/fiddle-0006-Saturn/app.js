(function(app) {
    "use strict";


    let metadata = {
        urls: {
            github: 'https://github.com/bradyhouse/house/tree/master/fiddles/three/fiddle-0006-Saturn',
            saturn: {
                surfaceMaterial: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/297733/saturnSurface.jpg',
                ringsMaterial: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/297733/saturnRings.png'
            }
        }
    };


    app.toolkit = app.toolkit || {};
    app.toolkit.three = app.toolkit.three || {};
    app.view = app.view || {};
    app.view.milkyway = app.view.milkyway || {};
    app.view.milkyway.saturn = app.view.milkyway.saturn || {};


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
            camera.position.set(0, 0, 40);
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


    app.view.milkyway.saturn.Saturn = class extends app.view.milkyway.Planet {
        constructor() {
            super({
                type: app.view.milkyway.Saturn,
                size: 9.41,
                distance: 10,
                period: 2, // 29.46
                map: metadata.urls.saturn.surfaceMaterial
            });
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
        get planetGroup() {
            return this._planetGroup;
        }
        get planetOrbitGroup() {
            return this._planetOrbitGroup;
        }
        get tilt() {
            return -0.466;
        }
        get rotationY() {
            return 0.003;
        }
        createGlobe() {
            let geometry = new THREE.SphereGeometry(7, 32, 32),
                texture = THREE.ImageUtils.loadTexture(this.map),
                material = new THREE.MeshPhongMaterial({
                    map: texture
                }),
                globeMesh = new THREE.Mesh(geometry, material);
            globeMesh.rotation.z = .1;
            this.object3D.add(globeMesh);
            this._globeMesh = globeMesh;
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
                ringsMesh = new THREE.Mesh(geometry, material);
            ringsMesh.doubleSided = true;
            ringsMesh.rotation.x = 2.21;
            ringsMesh.rotation.y = .09;
            this.planetGroup.add(ringsMesh);
            this.planetGroup.position.x = -.2;
            this.planetGroup.position.z = -1;
            this.planetGroup.position.y = 1;
            this._ringsMesh = ringsMesh;
        }
        update() {
            if (this.globeMesh) {
                this.globeMesh.rotation.y += this.rotationY / this.period;
            }
            if (this.ringsMesh) {
                this.ringsMesh.rotation.z -= this.rotationY / this.period;
            }
            this.updateChildren();
        }
        init() {
            let planetOrbitGroup = new THREE.Object3D(),
                planetGroup = new THREE.Object3D(),
                distSquared = this.distance * this.distance;
            planetGroup.position.set(Math.sqrt(distSquared / 2), 0, -Math.sqrt(distSquared / 2));
            planetOrbitGroup.add(planetGroup);
            planetGroup.scale.set(this.size, this.size, this.size);
            planetGroup.rotation.x = this.tilt;
            this.object3D = planetOrbitGroup;
            this._planetGroup = planetGroup;
            this._planetOrbitGroup = planetOrbitGroup;
            this.createRings();
            this.createGlobe();
            this.revolutionSpeed = this.rotationY;
        }
    }


    app.view.milkyway.Sun = class extends app.toolkit.three.Object {
        constructor() {
            super();
        }
        update() {}
        init() {
            let light = new THREE.PointLight(0xfffff0, 2, 150);
            light.rotation.x = 2.21;
            light.rotation.y = .2;
            light.rotation.z = .1;
            light.position.set(-10, -20, 40);
            this.object3D = light;
        }
    };


    app.view.Viewport = class extends app.toolkit.three.R {
        constructor() {
            super();
        }
        render() {
            let sun = new app.view.milkyway.Sun({});
            let saturn = new app.view.milkyway.saturn.Saturn({});
            sun.init();
            this.addObject(sun);
            saturn.init();
            this.addObject(saturn);
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
            container.addEventListener('click', this.onContainerClick);
            hook.appendChild(container);
            let view = new app.view.Viewport({});
            view.init({
                container: container
            });
            view.render();
            view.run();
        },
        onContainerClick: function() {
            var link = document.createElement('a');
            link.setAttribute('href', metadata.urls.github);
            link.setAttribute('target', '_blank');
            link.click();
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
        planet: function(config) {
            return new app.view.milkyway.Planet(config);
        },
        saturn: function(config) {
            return new app.view.milkyway.saturn.Saturn(config);
        },
        rings: function(config) {
            return new app.view.milkyway.saturn.Rings(config);
        }
    } : null;
    if (!window.location.pathname.match('test')) {
        document.body.addEventListener('DOMContentLoaded', app.controller.onDOMContentLoaded(), false);
    }
})(window.app = window.app || {})
