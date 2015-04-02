var renderer = null,
    scene = null,
    camera = null,
    root = null,
    group = null,
    sphere = null,
    sphereEnvMapped = null,
    orbitControls = null,
    materials = {},
    mapUrl = "",
    map = null,
    envMapUrl = "resources/images/nx.jpg",
    envMap = null,
    duration = 10000, // ms
    currentTime = Date.now(),
    materialName = "phong-envmapped",
    envMapOn = true;

function animate() {

    var now = Date.now();
    var deltat = now - currentTime;
    currentTime = now;
    var fract = deltat / duration;
    var angle = Math.PI * 2 * fract;

    // Rotate the sphere group about its Y axis
    group.rotation.y += angle;
}
function run() {
    requestAnimationFrame(function () {
        run();
    });
    renderer.render(scene, camera);
    animate();
    orbitControls.update();
}
function createMaterials() {
    map = null; // THREE.ImageUtils.loadTexture(mapUrl);

    var path = "resources/images/";

    var urls = [ path + "px.jpg", path + "nx.jpg",
            path + "py.jpg", path + "ny.jpg",
            path + "pz.jpg", path + "nz.jpg" ];

    envMap = THREE.ImageUtils.loadTextureCube(urls);

    materials["phong"] = new THREE.MeshBasicMaterial({ color: 0xffffff, map: map });
    materials["phong-envmapped"] = new THREE.MeshBasicMaterial({ color: 0xffffff, envMap: envMap,
        map: map, reflectivity: 1.3});
}
function setMaterialColor(r, g, b) {
    r /= 255;
    g /= 255;
    b /= 255;

    materials["phong"].color.setRGB(r, g, b);
    materials["phong-envmapped"].color.setRGB(r, g, b);
}
function setMaterial(name) {
    materialName = name;
    if (envMapOn) {
        sphere.visible = false;
        sphereEnvMapped.visible = true;
        sphereEnvMapped.material = materials[name];
    }
    else {
        sphere.visible = true;
        sphereEnvMapped.visible = false;
        sphere.material = materials[name];
    }
}
function toggleEnvironmentMap() {
    envMapOn = !envMapOn;
    var names = materialName.split("-");
    if (!envMapOn) {
        setMaterial(names[0]);
    }
    else {
        setMaterial(names[0] + "-envmapped");
    }
}
function createScene(canvas) {

    renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
    renderer.setSize(canvas.width, canvas.height);
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(45, canvas.width / canvas.height, 1, 4000);
    camera.position.z = 10;
    scene.add(camera);
    root = new THREE.Object3D;
    var light = new THREE.DirectionalLight(0xffffff, 2);
    light.position.set(.5, 0, 1);
    root.add(light);
    light = new THREE.AmbientLight(0);
    root.add(light);
    group = new THREE.Object3D;
    root.add(group);
    createMaterials();
    geometry = new THREE.SphereGeometry(2, 20, 20);
    sphere = new THREE.Mesh(geometry, materials["phong"]);
    sphere.visible = false;
    geometry = new THREE.SphereGeometry(2, 20, 20);
    sphereEnvMapped = new THREE.Mesh(geometry, materials["phong-envmapped"]);
    sphereEnvMapped.visible = true;
    setMaterial("phong-envmapped");
    group.add(sphere);
    group.add(sphereEnvMapped);
    var shader = THREE.ShaderLib[ "cube" ];
    shader.uniforms[ "tCube" ].value = envMap;
    var material = new THREE.ShaderMaterial({
            fragmentShader: shader.fragmentShader,
            vertexShader: shader.vertexShader,
            uniforms: shader.uniforms,
            side: THREE.BackSide
        }),
    mesh = new THREE.Mesh(new THREE.CubeGeometry(1000, 1000, 1000), material);
    scene.add(mesh);
    scene.add(root);
}
function initControls() {
    $('#diffuseColor').ColorPicker({
        color: '#ffffff',
        onShow: function (colpkr) {
            $(colpkr).fadeIn(500);
            return false;
        },
        onHide: function (colpkr) {
            $(colpkr).fadeOut(500);
            return false;
        },
        onChange: function (hsb, hex, rgb) {
            $('#diffuseColor div').css('backgroundColor', '#' + hex);
            setMaterialColor(rgb.r, rgb.g, rgb.b);
        },
        onSubmit: function (hsb, hex, rgb, el) {
            $(el).val(hex);
            $('#diffuseColor div').css("background-color", "#" + hex);
            setMaterialColor(rgb.r, rgb.g, rgb.b);
            $(el).ColorPickerHide();
        },
    });
    var diffuseHex = "#ffffff";
    $('#diffuseColor').ColorPickerSetColor(diffuseHex);
    $('#diffuseColor div').css("background-color", diffuseHex);

    $("#textureUrl").html(envMapUrl);
    $("#texture").css("background-image", "url(" + envMapUrl + ")");

    $("#textureCheckbox").click(
        function () {
            toggleEnvironmentMap();
        }
    );

    orbitControls = new THREE.OrbitControls(camera, renderer.domElement);
}
$(document).ready(
    function () {

        var canvas = document.getElementById("webglcanvas");

        // create the scene
        createScene(canvas);

        // initialize the controls
        initControls();

        // Run the run loop
        run();
    }
);