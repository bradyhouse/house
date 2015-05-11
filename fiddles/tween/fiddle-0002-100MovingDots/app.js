(function (app, $, undefined) {
    "use strict";

    var canvas;
    var stage;

    function init() {
        createjs.MotionGuidePlugin.install(createjs.Tween);
        canvas = document.getElementById("fiddleCanvas");
        stage = new createjs.Stage(canvas);
        stage.autoClear = true;
        var ball;
        var count = 100;
        while (count--) {
            ball = new createjs.Shape();
            ball.graphics.ss(1, 'round', 'round').s(('#000000')).f("#" + rc() + rc() + rc()).dc(0, 0, 5).ef().es();
            var path = [rx(), ry(), rx(), ry(), rx(), ry()];
            createjs.Tween.get(ball, {loop: true})
                .to({guide: {path: path, start: 0, end: 1}}, 5000)
                .wait(Math.random() * 4000)
                .to({guide: {path: path, start: 1, end: 0}}, 5000);
            stage.addChild(ball);
        }

        createjs.Ticker.addEventListener("tick", stage);
    }

    function rx() {
        return Math.random() * 940 + 10;
    }

    function ry() {
        return Math.random() * 380 + 10;
    }

    function rc() {
        return Math.round(Math.random() * 0xED + 0x12).toString(16);
    }

    function handleComplete(tween) {
        var ball = tween._target;

    }


    $(document).ready(function () {
        init();
    });


})(window.app = window.app || {}, jQuery)
