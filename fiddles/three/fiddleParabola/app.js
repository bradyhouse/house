var camera, scene, renderer,
    cameraControls, effectController,
    clock = new THREE.Clock(),
    gridX = true,
    gridY = true,
    gridZ = true,
    axes = true,
    ground = true,
    canvasWidth = 1110,
    canvasHeight = 494;

(function (app, $, undefined) {
    function init() {
        var canvasRatio = canvasWidth / canvasHeight;

        // RENDERER
        renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.gammaInput = true;
        renderer.gammaOutput = true;
        renderer.setSize(canvasWidth, canvasHeight);
        renderer.setClearColorHex(0xAAAAAA, 1.0);

        // CAMERA
        camera = new THREE.PerspectiveCamera(45, canvasRatio, 1, 40000);
        // CONTROLS
        cameraControls = new THREE.OrbitAndPanControls(camera, renderer.domElement);

        camera.position.set(-480, 659, -619);
        cameraControls.target.set(4, 301, 92);

        fillScene();
    }
    function createParabola() {

        // Triangle Mesh
        var material, geometry, mesh;
        material = new THREE.MeshBasicMaterial({ vertexColors: THREE.VertexColors, side: THREE.DoubleSide });
        geometry = new THREE.Geometry();

        var red = new THREE.Color(0xFF0000);
        var green = new THREE.Color(0x00FF00);
        var blue = new THREE.Color(0x0000FF);

        var x = 0.0;
        var y = 0.0;
        var z = 0.0;
        var face = 0;
        var v0 = 0;
        var v1 = 1;
        var v2 = 2;
        var v3 = 3;

        for (var z = 0; z < 10; z++) {
            for (var x = -17; x < 17; x++) {
                var x1 = x;
                var x2 = (x + 1);
                var y1 = x1 * x1;
                var y2 = x2 * x2;
                var z1 = z;
                var z2 = (z + 1);

                geometry.vertices.push(new THREE.Vector3(x1, y1, z1));
                geometry.vertices.push(new THREE.Vector3(x2, y2, z1));
                geometry.vertices.push(new THREE.Vector3(x1, y1, z2));
                geometry.faces.push(new THREE.Face3(v0, v1, v2));
                geometry.faces[face].vertexColors = [ green, green, green ];
                face++;
                geometry.vertices.push(new THREE.Vector3(x2, y2, z2));
                geometry.faces.push(new THREE.Face3(v2, v3, v1));
                geometry.faces[face].vertexColors = [ red, red, red ];
                face++;

                v0 = v0 + 4;
                v1 = v1 + 4;
                v2 = v2 + 4;
                v3 = v3 + 4;


            } // end:for
        } // end:for

        mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);
    }
    function fillScene() {
        // SCENE
        scene = new THREE.Scene();
        scene.fog = new THREE.Fog(0x808080, 3000, 6000);
        // LIGHTS
        var ambientLight = new THREE.AmbientLight(0x222222);
        var light = new THREE.DirectionalLight(0xFFFFFF, 1.0);
        light.position.set(200, 400, 500);

        var light2 = new THREE.DirectionalLight(0xFFFFFF, 1.0);
        light2.position.set(-400, 200, -300);

        scene.add(ambientLight);
        scene.add(light);
        scene.add(light2);

        if (ground) {
            Coordinates.drawGround({size: 1000});
        }
        if (gridX) {
            Coordinates.drawGrid({size: 1000, scale: 0.01});
        }
        if (gridY) {
            Coordinates.drawGrid({size: 1000, scale: 0.01, orientation: "y"});
        }
        if (gridZ) {
            Coordinates.drawGrid({size: 1000, scale: 0.01, orientation: "z"});
        }
        if (axes) {
            Coordinates.drawAllAxes({axisLength: 300, axisRadius: 2, axisTess: 50});
        }
        createParabola();
    }
    function addToDOM() {
        var container = document.getElementById('container');
        var canvas = container.getElementsByTagName('canvas');
        if (canvas.length > 0) {
            container.removeChild(canvas[0]);
        }
        container.appendChild(renderer.domElement);
    }
    function animate() {
        window.requestAnimationFrame(animate);
        render();
    }
    function render() {
        var delta = clock.getDelta();
        cameraControls.update(delta);
        if (effectController.newGridX !== gridX || effectController.newGridY !== gridY || effectController.newGridZ !== gridZ || effectController.newGround !== ground || effectController.newAxes !== axes) {
            gridX = effectController.newGridX;
            gridY = effectController.newGridY;
            gridZ = effectController.newGridZ;
            ground = effectController.newGround;
            axes = effectController.newAxes;

            fillScene();
        }
        renderer.render(scene, camera);
    }
    function setupGui() {

        effectController = {

            newGridX: gridX,
            newGridY: gridY,
            newGridZ: gridZ,
            newGround: ground,
            newAxes: axes
        };

        var gui = new dat.GUI();
        gui.add(effectController, "newGridX").name("Show XZ grid");
        gui.add(effectController, "newGridY").name("Show YZ grid");
        gui.add(effectController, "newGridZ").name("Show XY grid");
        gui.add(effectController, "newGround").name("Show ground");
        gui.add(effectController, "newAxes").name("Show axes");
    }
    $(document).ready(function () {
        try {
            init();
            setupGui();
            addToDOM();
            animate();
        } catch (e) {
            var errorReport = "Your program encountered an unrecoverable error, can not draw on canvas. Error was:<br><br>";
            window.alert(errorReport + e);
        }
    });
})(window.app = window.app || {}, jQuery)


