(function (app, $, undefined) {

    $(document).ready(function () {
        console.log('document ready');
        $("#fiddleHook").on("mousemove", app.onCanvasMouseMove);
        $("#btnClear").on("click", app.onButtonClearClick);
    });

    app.onCanvasMouseMove = function (e) {
        if (e.which === 1) {
            var c = document.getElementById("fiddleHook"),
                ctx = c.getContext("2d"),
                rect = c.getBoundingClientRect(),
                x = e.clientX - rect.left,
                y = e.clientY - rect.top;
            ctx.fillRect(x, y, 8, 6);

        }
    }

    app.onButtonClearClick = function (ctrl) {
        var c = document.getElementById("fiddleHook"),
            ctx = c.getContext('2d');
        ctx.clearRect(0, 0, c.width, c.height);
    }


})(window.app = window.app || {}, jQuery)
