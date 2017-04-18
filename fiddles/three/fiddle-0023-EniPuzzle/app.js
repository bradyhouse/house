(function(app) {
    "use strict";


    let metadata = {
        urls: {
            github: 'https://github.com/bradyhouse/house/tree/master/fiddles/three/fiddle-0014-EniPuzzle',
            ball: {
                surfaceMaterial: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/297733/neptuneSurfaceMaterial.jpg'
            }
        },
        consoleTag: 'H O U S E ~ f i d d l e s'
    };


    app.toolkit = app.toolkit || {};
    app.toolkit.three = app.toolkit.three || {};
    app.view = app.view || {};


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


    app.view.Viewport = class extends app.toolkit.three.R {
        config() {
            return {
                mouseDown: function(x, y) {
                    this.lastX = x;
                    this.lastY = y;
                    this.mouseDown = true;
                },
                mouseMove: function(x, y) {
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
            this._lastX = config && config.hasOwnProperty('lastX') ? config.lastX : this.config().lastX;
            this._lastY = config && config.hasOwnProperty('lastY') ? config.lastY : this.config().lastY;
            this._mouseDown = false;
        }
        get ball() {
            return this._ball;
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
        get mouseUp() {
            return this._mouseUp;
        }
        get mouseDown() {
            return this._mouseDown;
        }
        set mouseDown(val) {
            this._mouseDown = val;
        }
        update() {
            TWEEN.update();
            this.ball.animate();
            this.ball.updateChildren();
        }
        render() {
            let ball = new app.view.Ball(),
                light = new THREE.PointLight(0xffffff, 1.2, 100000);
            light.position.set(0, 0, 20);
            this.scene.add(light);
            this.camera.position.z = 6.667;
            this.addObject(ball);
            this._ball = ball;
        }
    }


    app.view.Ball = class extends app.toolkit.three.Object {
        constructor() {
            super();
            this._moves = [];
            this._deltaX = 1;
            this._deltaY = -1;
            this.init();
        }
        get moves() {
            return this._moves;
        }
        get deltaX() {
            return this._deltaX;
        }
        get deltaY() {
            return this._deltaY;
        }
        animate() {
            if (this.object3D.position.y > 0) {
                let newposY = this.object3D.position.y + this.deltaY;
                new TWEEN.Tween(this.object3D.position)
                    .to({
                        y: newposY
                    }, 100).easing(TWEEN.Easing.Quadratic.EaseOut).start()
            } else {
                if (this.moves.length > 50 && (this.object3D.position.x > 6 || this.object3D.position.x < -6)) {
                    this._deltaX = this._deltaX * -1;
                    this._moves = [];
                }
                let newposX = this.object3D.position.x + this.deltaX;
                this._moves.push(newposX);
                new TWEEN.Tween(this.object3D.position)
                    .to({
                        x: newposX
                    }, 100).easing(TWEEN.Easing.Quadratic.EaseIn).start();
            }
            let newRotationZ = this.object3D.rotation.z + this.deltaX * -1;
            new TWEEN.Tween(this.object3D.rotation)
                .to({
                    z: newRotationZ
                }, 210).start();
        }
        init() {
            let texture = metadata.urls.ball.surfaceMaterial,
                geometry = new THREE.SphereGeometry(1, 32, 32),
                material = new THREE.MeshPhongMaterial({
                    map: THREE.ImageUtils.loadTexture(texture)
                }),
                mesh = new THREE.Mesh(geometry, material);
            mesh.position.y = 10;
            mesh.position.x = -3.333;
            this.object3D = mesh;
        }
    }


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
        }
    } : null;
    if (!window.location.pathname.match('test')) {
        document.body.addEventListener('DOMContentLoaded', app.controller.onDOMContentLoaded(), false);
    }
})(window.app = window.app || {})
