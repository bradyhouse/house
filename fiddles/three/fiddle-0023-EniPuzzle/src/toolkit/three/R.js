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
        }
        else {
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

        let vpx = ( eltx / this.hook.offsetWidth ) * 2 - 1;
        let vpy = -( elty / this.hook.offsetHeight ) * 2 + 1;

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
        }
        else {
            return {object: null, point: null, normal: null};
        }
    }

    findObjectFromIntersected(object, point, normal) {
        if (object.data) {
            return {object: object.data, point: point, normal: normal};
        }
        else if (object.parent) {
            return this.findObjectFromIntersected(object.parent, point, normal);
        }
        else {
            return {object: null, point: null, normal: null};
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
            function (e) {
                that.onDocumentMouseMove(e);
            }, false);
        dom.addEventListener('mousedown',
            function (e) {
                that.onDocumentMouseDown(e);
            }, false);
        dom.addEventListener('mouseup',
            function (e) {
                that.onDocumentMouseUp(e);
            }, false);

        $(dom).mousewheel(
            function (e, delta) {
                that.onDocumentMouseScroll(e, delta);
            }
        );
    }

    initKeyboardListeners() {

        let dom = this.renderer.domElement;
        let that = this;

        dom.addEventListener('keydown',
            function (e) {
                that.onKeyDown(e);
            }, false);

        dom.addEventListener('keyup',
            function (e) {
                that.onKeyUp(e);
            }, false);

        dom.addEventListener('keypress',
            function (e) {
                that.onKeyPress(e);
            }, false);

        dom.setAttribute("tabindex", 1);
        dom.style.outline = 'none';
    }

    initWindowListeners() {
        let that = this;
        window.addEventListener('resize', function (event) {
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

        renderer = new THREE.WebGLRenderer({antialias: true, canvas: canvas});
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
        requestAnimationFrame(function () {
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
