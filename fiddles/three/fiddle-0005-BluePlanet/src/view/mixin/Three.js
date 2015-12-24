app.view.mixin.Three = class {
    constructor() {
        this.prototype = new Object();
        this.init();
    }

    init() {
        var WIDTH = window.innerWidth,
            HEIGHT = window.innerHeight,
            renderer = new THREE.WebGLRenderer({antialias: true}),
            scene = new THREE.Scene(),
            earthGeometry = new THREE.SphereGeometry(20, 20, 20),
            moonGeometry = new THREE.SphereGeometry(3, 20, 20),
            atmosphereGeometry = new THREE.SphereGeometry(20.5, 20, 20),
            starFieldGeometry = new THREE.PlaneGeometry(WIDTH, HEIGHT, 20, 20),
            atmosphereMaterial = null,
            starFieldMaterial = null,
            earthReliefMaterial = null,
            earthSurfaceMaterial = null,
            moonSurfaceMaterial = null,
            moon = null,
            earth = null,
            stars = null,
            atmosphere = null,
            light = new THREE.PointLight(0xFFFFFF),
            camera = new THREE.PerspectiveCamera(45, WIDTH / HEIGHT),
            loader = new THREE.TextureLoader();

        renderer.setSize(WIDTH, HEIGHT);
        renderer.setClearColor(0x000000, 1);

        document.body.appendChild(renderer.domElement);
        document.body.setAttribute('style', 'overflow: hidden;');

        camera.position.z = 1000;
        scene.add(camera);

        loader.load(
            meta.urls.earth.atmosphereMaterial,
            function (texture) {
                atmosphereMaterial = new THREE.MeshLambertMaterial({
                    color: 0xffffff,
                    map: texture,
                    transparent: true
                });
                atmosphere = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);
                loader.load(
                    meta.urls.earth.reliefMaterial,
                    function (texture) {
                        earthReliefMaterial = texture;
                        loader.load(
                            meta.urls.earth.surfaceMaterial,
                            function (texture) {
                                earthSurfaceMaterial = new THREE.MeshPhongMaterial({
                                    map: texture,
                                    normalMap: earthReliefMaterial
                                });
                                earth = new THREE.Mesh(earthGeometry, earthSurfaceMaterial);
                                loader.load(
                                    meta.urls.moon,
                                    function (texture) {
                                        moonSurfaceMaterial = new THREE.MeshPhongMaterial({map: texture});
                                        moon = new THREE.Mesh(moonGeometry, moonSurfaceMaterial);
                                        loader.load(
                                            meta.urls.stars,
                                            function (texture) {
                                                starFieldMaterial = new THREE.MeshBasicMaterial({
                                                    map: texture
                                                });
                                                stars = new THREE.Mesh(starFieldGeometry, starFieldMaterial);
                                                scene.add(stars);
                                                stars.position.x = 0;
                                                stars.position.y = 0;
                                                scene.add(earth);
                                                scene.add(atmosphere);
                                                scene.add(moon);
                                                moon.position.x = -50;
                                                moon.position.y = 50;
                                                scene.add(light);
                                                scene.add(new THREE.AmbientLight(0x505050));
                                                light.position.set(-25, 100, 100);
                                                var render = function () {
                                                    requestAnimationFrame(render);
                                                    if (earth.position.z == 1000) {
                                                        light.position.z = 100;
                                                        earth.position.z = 0;
                                                        atmosphere.position.z = 0;
                                                        moon.position.z = 0;
                                                    } else {
                                                        light.position.z += 1;
                                                        earth.position.z += 1;
                                                        atmosphere.position.z += 1;
                                                        moon.position.z += 1;
                                                    }
                                                    earth.rotation.y += .009;
                                                    moon.rotation.y += .009;
                                                    atmosphere.rotation.y += .009;
                                                    renderer.render(scene, camera);
                                                };
                                                render();
                                            },
                                            function (xhr) {
                                                console.log((xhr.loaded / xhr.total * 100) + '% loaded');
                                            },
                                            function (xhr) {
                                                console.log('An error happened');
                                            }
                                        );
                                    },
                                    function (xhr) {
                                        console.log((xhr.loaded / xhr.total * 100) + '% loaded');
                                    },
                                    function (xhr) {
                                        console.log('An error happened');
                                    }
                                );
                            },
                            function (xhr) {
                                console.log((xhr.loaded / xhr.total * 100) + '% loaded');
                            },
                            function (xhr) {
                                console.log('An error happened');
                            }
                        );
                    },
                    function (xhr) {
                        console.log((xhr.loaded / xhr.total * 100) + '% loaded');
                    },
                    function (xhr) {
                        console.log('An error happened');
                    }
                );
            },
            function (xhr) {
                console.log((xhr.loaded / xhr.total * 100) + '% loaded');
            },
            function (xhr) {
                console.log('An error happened');
            }
        );
    }
}
