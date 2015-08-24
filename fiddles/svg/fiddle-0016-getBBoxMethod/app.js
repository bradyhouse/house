$(document).ready(function () {
    $('#canvas').height(window.innerHeight);
});

function displayBB(evt) {
    var P = evt.target,
        BB = P.getBBox(),
        msg1 = "This " + P.nodeName + " has upperleft corner at (" + BB.x + "," + BB.y + ")",
        msg2 = "and it has width and height of " + BB.width + " and " + BB.height;
    alert(msg1 + "\n" + msg2);
}
