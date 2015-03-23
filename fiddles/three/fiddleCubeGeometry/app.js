var renderer = null,
    scene = null,
    camera = null,
    cube = null;

var duration = 5000; // ms
var previousTime = Date.now();

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
        renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
        renderer.setSize(canvas.width, canvas.height);
        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(45, canvas.width / canvas.height, 1, 4000);
        scene.add(camera);
        var mapUrl = "resources/images/avatar.png";
        var map = THREE.ImageUtils.loadTexture(mapUrl);
        var material = new THREE.MeshBasicMaterial({ map: map });
        var geometry = new THREE.CubeGeometry(2, 2, 2);
        cube = new THREE.Mesh(geometry, material);
        cube.position.z = -8;
        cube.rotation.x = Math.PI / 5;
        cube.rotation.y = Math.PI / 5;
        scene.add(cube);
        run();
    }
);