(function (app, $, undefined) {
    "use strict";

    var canvas;
    var stage;

    function init() {
        canvas = document.getElementById("fiddleCanvas");
        stage = new createjs.Stage(canvas);
        stage.autoClear = true;

        var ball = new createjs.Shape();
        ball.graphics.beginFill("#FF0000").drawCircle(0, 0, 50);
        ball.graphics.endFill();
        ball.x = 200;
        ball.y = -50;

        var tween = createjs.Tween.get(ball, {loop: true})
            .to({x: ball.x, y: canvas.height - 55, rotation: -360}, 1500, createjs.Ease.bounceOut)
            .wait(1000).call(handleComplete);

        stage.addChild(ball);

        createjs.Ticker.addEventListener("tick", stage);
    }

    function handleComplete(tween) {
        var ball = tween._target;

    }


    $(document).ready(function () {
        init();
    });


})(window.app = window.app || {}, jQuery)

