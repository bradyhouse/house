(function (app, $, undefined) {
    "use strict";

    app.model = {
        point: {
            x: 0,
            y: 0
        }
    };

    app.buffer = [];

    app.onCanvasMouseMove = function (e) {
        if (e.which === 1) {
            var rect = app.canvas.getBoundingClientRect(),
                pt = Object.create(app.model.point);
            pt.x = e.clientX - rect.left;
            pt.y = e.clientY - rect.top;
            app.buffer.push(pt);
            app.drawRect(pt);
        }
    };

    app.onButtonClearClick = function (ctrl) {
        app.clearCanvas();
        app.buffer = [];
    };

    app.onButtonRestoreClick = function (ctrl) {
        var i = 0,
            pt = null,
            delay = 100;

        app.clearCanvas();
        if (app.buffer.length > 0) {
            for (i; i < app.buffer.length; i++) {
                pt = app.buffer[i];
                app.drawRect(pt, delay);
                delay = delay + 50;
            }
        }

    };

    app.onButtonSaveClick = function (ctrl) {
        app.download(app.canvas.toDataURL(), "drawing.png");
    };

    app.drawRect = function (pt, delay) {
        var ctx = app.canvas.getContext("2d");
        if (delay) {
            setTimeout('app.canvas.getContext("2d").fillRect(' + pt.x + ',' + pt.y + ', 8, 6);', delay);
        } else {
            ctx.fillRect(pt.x, pt.y, 8, 6);
        }

    };

    app.clearCanvas = function () {
        var c = app.canvas,
            ctx = c.getContext('2d');
        ctx.clearRect(0, 0, c.width, c.height);
    };

    app.download = function (url, filename) {
        var link = document.createElement('a'),
            event = null;
        link.setAttribute('href', url);
        link.setAttribute('download', filename);
        if (document.createEvent) {
            event = document.createEvent('MouseEvents');
            event.initEvent('click', true, true);
            link.dispatchEvent(event);
        }
        else {
            link.click();
        }
    };

    app.isStorageSupported = function() {
        try {
            return 'localStorage' in window && window.localStorage !== null;
        } catch (e) {
            return false;
        }
    };

    $(document).ready(function () {
        $("#fiddleHook").on("mousemove", app.onCanvasMouseMove);
        $("#btnClear").on("click", app.onButtonClearClick);
        $("#btnRestore").on("click", app.onButtonRestoreClick);
        $("#btnSave").on("click", app.onButtonSaveClick);
        app.canvas = document.getElementById("fiddleHook");
    });


})(window.app = window.app || {}, jQuery)
