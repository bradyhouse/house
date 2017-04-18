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

    init() {

    }

}
