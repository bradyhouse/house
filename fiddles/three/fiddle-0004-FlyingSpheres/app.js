(function (app, $, undefined) {

    var me = app;

    app.model = {
        Sphere: {
            location: {
                x: 0,
                y: 0,
                z: 0
            },
            dimensions: {
                w: 18,
                h: 18,
                d: 18
            },
            color: 0x0EEE00,
            mesh: null,
            getMesh: function () {
                var me = this;
                if (!me.mesh) {
                    me.inflateMesh();
                }
                return me.mesh;
            },
            setColor: function (hex) {
                this.color = hex;
            },
            inflateMesh: function () {
                var me = this,
                    hexColor = me.color,
                    material = new THREE.MeshLambertMaterial({
                        color: hexColor,
                        side: THREE.DoubleSide
                    }),
                    width = me.dimensions.w,
                    height = me.dimensions.h,
                    depth = me.dimensions.d,
                    geometry = new THREE.SphereGeometry(width, height, depth);
                this.mesh = new THREE.Mesh(geometry, material);
            },
            setLocation: function (x, y, z) {
                this.location.x = x;
                this.location.y = y;
                this.location.z = z;
            },
            getLocation: function () {
                return this.location;
            },
            move: function (axis, direction) {
                var vector = this.getLocation(),
                    mesh = this.getMesh();
                if (mesh != null) {
                    switch (axis) {
                        case 'x':
                            vector.x += 1 * direction;
                            mesh.position.x = vector.x % 200;
                            mesh.rotation.z = vector.x / 18;
                            break;
                        case 'z':
                            vector.z += 1 * direction;
                            mesh.position.z = vector.z % 200;
                            mesh.rotation.x = vector.z / 18;
                            break;
                        default:
                            vector.y += 1 * direction;
                            mesh.position.y = vector.y % 200;
                            mesh.rotation.z = vector.y / 18;
                            break;
                    }
                    this.setLocation(vector.x, vector.y, vector.z);
                }
            }
        }
    };

    app.init = function (hook) {

        var WIDTH = hook.width(),
            HEIGHT = window.screen.height / 3,
            ASPECT = WIDTH / HEIGHT,
            CAMERA_FOV = 65,
            CAMERA_NEAR = 0.1,
            CAMERA_FAR = 10000,

            camera = new THREE.PerspectiveCamera(CAMERA_FOV, ASPECT, CAMERA_NEAR, CAMERA_FAR),
            renderer = new THREE.WebGLRenderer({
                antialias: true
            }),
            scene = new THREE.Scene(),

            directionalLight = new THREE.DirectionalLight(0xFFFFFF, 1.0),
            ambientLight = new THREE.AmbientLight(0x555555),

            cubeMaterial = new THREE.MeshLambertMaterial({
                color: 0x00BBCC
            }),
            cubeGeometry = new THREE.CubeGeometry(55, 55, 55),
            cube = new THREE.Mesh(cubeGeometry, cubeMaterial),

            sphereA = Object.create(app.model.Sphere),
            sphereB = Object.create(app.model.Sphere),
            sphereC = Object.create(app.model.Sphere),

            renderLoop = function () {
                renderer.render(scene, camera);
                window.requestAnimationFrame(renderLoop);
                sphereA.move('y', 1);
                sphereB.move('x', 1);
                sphereC.move('z', 1);
            };

        sphereA.setColor(0x0EEE00);
        sphereB.setColor(0xEB3849);
        sphereC.setColor(0x9400D3); // Violet

        renderer.setClearColorHex(0x000000, 1.0);
        renderer.setSize(WIDTH, HEIGHT);

        camera.position.z = HEIGHT;
        camera.position.x = -10;
        camera.position.y = 50;

        directionalLight.position.set(100, 100, 300);

        //controls.target.set(0, 0, 0);

        scene.add(directionalLight);
        scene.add(ambientLight);
        scene.add(camera);
        scene.add(cube);
        scene.add(sphereA.getMesh());
        scene.add(sphereB.getMesh());
        scene.add(sphereC.getMesh());

        hook.append(renderer.domElement);
        window.requestAnimationFrame(renderLoop);
    };
    $(document).ready(function () {
        app.init($('#viewport'));
    });

})(window.app = window.app || {}, jQuery)
