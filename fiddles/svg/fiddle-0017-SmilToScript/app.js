$(document).ready(function () {
    $('#canvas').height(window.innerHeight);
});

function stuff(evt) {
    var obj = evt.target.parentNode;
    obj.setAttributeNS(null, "fill", "red");
}
