var renderer = null,
    scene = null,
    camera = null,
    root = null,
    group = null,
    sphere = null,
    sphereTextured = null,
    duration = 10000, // ms
    previousTime = Date.now(),
    materials = {},
    mapUrl = "resources/images/moon.jpg",
    map = null,
    bumpMapUrl = "resources/images/cloud.png",
    bumpMap = null,
    materialName = "phong-textured",
    textureOn = true,
    mouseDown = false,
    pageX = 0;


function createMaterials() {
    // Create a textre phong material for the cube
    // First, create the texture map
    map = THREE.ImageUtils.loadTexture(mapUrl);
    bumpMap = THREE.ImageUtils.loadTexture(bumpMapUrl);
    materials["phong"] = new THREE.MeshPhongMaterial({ bumpMap: bumpMap });
    materials["phong-textured"] = new THREE.MeshPhongMaterial({ map: map, bumpMap: bumpMap });
}
function setMaterialColor(r, g, b) {
    r /= 255;
    g /= 255;
    b /= 255;

    materials["phong"].color.setRGB(r, g, b);
    materials["phong-textured"].color.setRGB(r, g, b);
}
function setMaterialSpecular(r, g, b) {
    r /= 255;
    g /= 255;
    b /= 255;

    materials["phong"].specular.setRGB(r, g, b);
    materials["phong-textured"].specular.setRGB(r, g, b);
}
function setMaterial(name) {
    materialName = name;
    if (textureOn) {
        sphere.visible = false;
        sphereTextured.visible = true;
        sphereTextured.material = materials[name];
    }
    else {
        sphere.visible = true;
        sphereTextured.visible = false;
        sphere.material = materials[name];
    }
}
function toggleTexture() {
    textureOn = !textureOn;
    var names = materialName.split("-");
    if (!textureOn) {
        setMaterial(names[0]);
    }
    else {
        setMaterial(names[0] + "-textured");
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
    light = new THREE.AmbientLight(0); // 0x222222 );
    root.add(light);
    group = new THREE.Object3D;
    root.add(group);

    createMaterials();

    geometry = new THREE.SphereGeometry(2, 20, 20);
    sphere = new THREE.Mesh(geometry, materials["phong"]);
    sphere.visible = false;
    geometry = new THREE.SphereGeometry(2, 20, 20);
    sphereTextured = new THREE.Mesh(geometry, materials["phong-textured"]);
    sphereTextured.visible = true;
    setMaterial("phong-textured");
    group.add(sphere);
    group.add(sphereTextured);
    scene.add(root);
}
function rotateScene(deltax) {
    root.rotation.y += deltax / 100;
    $("#rotation").html("rotation: 0," + root.rotation.y.toFixed(2) + ",0");
}
function scaleScene(scale) {
    root.scale.set(scale, scale, scale);
    $("#scale").html("scale: " + scale);
}
function onMouseMove(evt) {
    if (!mouseDown)
        return;

    evt.preventDefault();

    var deltax = evt.pageX - pageX;
    pageX = evt.pageX;
    rotateScene(deltax);
}
function onMouseDown(evt) {
    evt.preventDefault();

    mouseDown = true;
    pageX = evt.pageX;
}
function onMouseUp(evt) {
    evt.preventDefault();

    mouseDown = false;
}
function addMouseHandler(canvas) {
    canvas.addEventListener('mousemove',
        function (e) {
            onMouseMove(e);
        }, false);
    canvas.addEventListener('mousedown',
        function (e) {
            onMouseDown(e);
        }, false);
    canvas.addEventListener('mouseup',
        function (e) {
            onMouseUp(e);
        }, false);
}
function animate() {
    var currentTime = Date.now(),
        period = currentTime - previousTime,
        delta = period / duration,
        angle = Math.PI * 2 * delta;
    cube.rotation.y += angle;
    this.previousTime = currentTime;
}
function run() {
    requestAnimationFrame(function () {
        run();
    });
    renderer.render(scene, camera);
    animate();
}

$(document).ready(
    function () {
        var canvas = document.getElementById("webglcanvas");
        createScene(canvas);
        addMouseHandler(canvas);
        //initControls();
        run();
    }
);