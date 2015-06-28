(function (app, $, undefined) {

    app.model = {

    };

    app.store = {

    };

    app.util = {
        webGl: {
            exists: (
                function () {
                    try {
                        var canvas = document.createElement( 'canvas' );
                        return !! ( window.WebGLRenderingContext && ( canvas.getContext( 'webgl' ) || canvas.getContext( 'experimental-webgl' ) ) );
                    }
                    catch ( e ) {
                        return false;
                    }
                }
            )()
        }
    };

    app.initComponent = function (hook) {
        if (app.util.webGl.exists) {

        }
    };

    $(document).ready(function () {
        app.initComponent($('#viewport'));
    });

})(window.app = window.app || {}, jQuery)
