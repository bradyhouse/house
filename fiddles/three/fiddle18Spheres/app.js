(function (app, $, undefined) {

    app.model = {
        Sphere: {
            location: {
                x: 0,
                y: 0,
                z: 0
            },
            segments: {
                width: 22,
                height: 22
            },
            radius: 10,
            colorIndex: 0,
            mesh: null,
            getMesh: function () {
                var me = this;
                if (!me.mesh) {
                    me.inflateMesh();
                }
                return me.mesh;
            },
            setColor: function (id) {
                var me = this;
                me.colorIndex = id;
            },
            inflateMesh: function () {
                var me = this,
                    colorId = me.colorIndex,
                    material = new THREE.MeshLambertMaterial({
                        color: app.util.colors.blueGray.spectrum[colorId],
                        side: THREE.DoubleSide
                    }),
                    widthSegments = me.segments.width,
                    heightSegments = me.segments.height,
                    sphereRadius = me.radius,
                    geometry = new THREE.SphereGeometry(sphereRadius, widthSegments, heightSegments);
                me.mesh = new THREE.Mesh(geometry, material);
                geometry.computeFaceNormals();
                geometry.computeVertexNormals();
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

    app.store = {
        spheres: {
            data: [],
            inflate: function (count) {
                var i = 0,
                    sphere = null,
                    sphereColorIndex = 0,
                    sphereLocation = {
                        x: 0,
                        y: 0,
                        z: 0
                    };
                for (i = 0; i < count; i++) {
                    sphereColorIndex = app.util.getRandomBlueId();
                    sphere = Object.create(app.model.Sphere);
                    sphere.setColor(sphereColorIndex);
                    sphere.setLocation(sphereLocation.x, sphereLocation.y, sphereLocation.z);
                    app.store.spheres.data.push(sphere);
                }
            },
            render: function (scene) {
                var i = 0,
                    sphere = null;
                sphereMesh = null,
                    direction = 1;
                for (i = 0; i < app.store.spheres.data.length; i++) {
                    sphere = app.store.spheres.data[i];
                    if (sphere) {
                        sphere.inflateMesh();
                        sphereMesh = sphere.getMesh();
                        if (sphereMesh) {
                            scene.add(sphereMesh);
                            if (i >= 2) {
                                if ((i) % 2 == 0) {
                                    sphere.move('x', direction);
                                } else if (i % 3 == 0) {
                                    sphere.move('y', direction);
                                } else {
                                    sphere.move('z', direction);
                                }
                            } else {
                                sphere.move('z', direction);

                            }
                            direction = (sphere.radius * 2) * -1;
                        }
                    }
                }
            },
            move: function () {
                var direction = 1,
                    sphere = null;
                for (var i = 0; i < app.store.spheres.data.length; i++) {
                    var sphere = app.store.spheres.data[i];
                    if (sphere) {
                        if (i >= 2) {
                            if ((i) % 2 == 0) {
                                sphere.move('x', direction);
                            } else if (i % 3 == 0) {
                                sphere.move('y', direction);
                            } else {
                                sphere.move('z', direction);
                            }
                        } else {
                            sphere.move('z', direction);
                        }
                        direction = (sphere.radius * 2) * -1;
                    }
                }
            }
        }
    };

    app.util = {
        colors: {
            /**
             * 19 blue gray shades lifted from
             * http://www.color-hex.com/color/4172b3
             *
             */
            blueGray: {
                spectrum: [
                    0x4172b3,
                    0x5480ba,
                    0x668ec2,
                    0x7a9cc9,
                    0x8daad1,
                    0xa0b8d9,
                    0xb3c6e0,
                    0xc6d4e8,
                    0xd9e2ef,
                    0xecf0f7,
                    0x4172b3,
                    0x3a66a1,
                    0x345b8f,
                    0x2d4f7d,
                    0x27446b,
                    0x203959,
                    0x1a2d47,
                    0x132235,
                    0x0d1623],
                cache: []


            }
        },
        calcBoundRandomNumber: function (uBound, usedCache) {
            var i = Math.floor(Math.random() * uBound) + 1;
            if (usedCache.length) {
                while (usedCache.indexOf(i) >= 0) {
                    i = Math.floor(Math.random() * uBound) + 1;
                }
            }
            return i;
        },
        getRandomBlueId: function () {
            var uBound = app.util.colors.blueGray.spectrum.length,
                cache = app.util.colors.blueGray.cache;
            i = app.util.calcBoundRandomNumber(uBound, cache);
            cache.push(i);
            console.log('getRandomBlueId');
            console.log('i = ' + i);
            return i;
        }
    };

    app.initComponent = function (hook) {

        // ToDo ~ Refactor - Too Many variables!
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
            directionalLight = new THREE.DirectionalLight(0x00EE00, 1.0),
            ambientLight = new THREE.AmbientLight(0x3a66a1),
            controls = new THREE.TrackballControls(camera),
            renderLoop = function () {
                renderer.render(scene, camera);
                window.requestAnimationFrame(renderLoop);
                controls.update();
                app.store.spheres.move();
            };

        renderer.setClearColorHex(0x000000, 1);
        renderer.setSize(WIDTH, HEIGHT);
        app.store.spheres.inflate(19);
        app.store.spheres.render(scene);
        camera.position.z = 200;
        camera.position.x = -60;
        camera.position.y = -100;

        directionalLight.position.set(100, 100, 300);
        controls.target.set(0, 0, 0);
        scene.add(directionalLight);
        scene.add(ambientLight);
        scene.add(camera);

        hook.append(renderer.domElement);
        window.requestAnimationFrame(renderLoop);
    };

    $(document).ready(function () {
        app.initComponent($('#viewport'));
    });

})(window.app = window.app || {}, jQuery)
