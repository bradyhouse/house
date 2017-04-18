(function (app, $, undefined) {
    app.init = function (hook) {

        var houseToAnimate = undefined,
            WIDTH = 400,
            HEIGHT = 300,
            renderer = new THREE.WebGLRenderer(),
            VIEW_ANGLE = 65, //65 FOV is most 'natural' FOV
            ASPECT = WIDTH / HEIGHT,
            NEAR = 0.1,		//these elements are needed for cameras to
            FAR = 10000,		//partition space correctly
            camera =
            new THREE.PerspectiveCamera(
                VIEW_ANGLE,
                ASPECT,
                NEAR,
                FAR),
            controls = new THREE.TrackballControls(camera),
            scene = new THREE.Scene(),
            loader = new THREE.JSONLoader(),
            pointLight =
                new THREE.PointLight(0xFFFFFF);

        renderer.setSize(WIDTH, HEIGHT);
        hook.append(renderer.domElement);
        camera.position.z = 200;
        controls.target.set(0, 0, 0);
        scene.add(camera);

        loader.load("data.json", function (geometry) {
            mesh = new THREE.Mesh(geometry, new THREE.MeshNormalMaterial());
            //modify mesh position, scale, rotation here in
            //this callback

            mesh.scale.set(60, 60, 60);
            mesh.position = new THREE.Vector3(0, 0, 0);

            //add it to the scene
            scene.add(mesh)
        });

        pointLight.position = new THREE.Vector3(-10, 30, 100);
        scene.add(pointLight);

        function renderLoop() {

            renderer.render(scene, camera);
            controls.update();
            window.requestAnimationFrame(renderLoop);
        }

        window.requestAnimationFrame(renderLoop);
    }

})(window.app = window.app || {}, jQuery);

app.init($('#hook'));
