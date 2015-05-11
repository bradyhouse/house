(function (app, $, undefined) {
    "use strict";

    var eases = [
        createjs.Ease.none,
        createjs.Ease.quadIn];

    function init() {
        var canvas = document.getElementById("fiddleCanvas"),
            stage = new createjs.Stage(canvas);

        var graph = new createjs.Shape();
        var g = graph.graphics;
        stage.addChild(graph);

        var w = canvas.width - 10;
        var h = canvas.height - 10;

        for (var j = 0, l = eases.length; j < l; j++) {
            g.beginFill(createjs.Graphics.getHSL(j / l * 360, 50, 50));
            var ease = eases[j];
            for (var i = 0; i < 100; i++) {
                var x = i / 100 * w + 5;
                var y = h - ease(i / 100) * h + 5;
                g.drawCircle(x, y, 3);
                g.closePath();
            }
        }
        stage.update();

    }


    $(document).ready(function () {
        init();
    });


})(window.app = window.app || {}, jQuery)

