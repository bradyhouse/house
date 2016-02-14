app.view.Viewport = class extends app.toolkit.three.R {

    config() {
        return {
            mouseDown: function (x, y) {
                this.lastX = x;
                this.lastY = y;
                this.mouseDown = true;
            },
            mouseMove: function (x, y) {
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
            mouseScroll: function (delta) {
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
