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
        if(this.object3D.position.y > 0) {
            let newposY = this.object3D.position.y + this.deltaY;
            new TWEEN.Tween(this.object3D.position)
                .to({
                    y: newposY
                }, 100).easing(TWEEN.Easing.Quadratic.EaseOut).start()
        } else {
            if(this.moves.length > 50 && (this.object3D.position.x > 6 || this.object3D.position.x < -6)) {
                this._deltaX = this._deltaX * -1;
                console.log(this.moves);
                this._moves = [];
            }
            let newposX = this.object3D.position.x + this.deltaX;
            this._moves.push(newposX);
            new TWEEN.Tween(this.object3D.position)
                .to({
                    x: newposX
                }, 100).easing(TWEEN.Easing.Quadratic.EaseIn).start();
        }
    }

    init() {
        let texture = metadata.urls.ball.surfaceMaterial,
            geometry = new THREE.SphereGeometry(1, 32, 32),
            material = new THREE.MeshPhongMaterial({
                map: THREE.ImageUtils.loadTexture(texture)}),
            mesh = new THREE.Mesh(geometry, material);
        mesh.position.y = 10;
        mesh.position.x = -3.333;
        this.object3D = mesh;
    }

}
