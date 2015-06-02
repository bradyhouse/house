(function (app, $, undefined) {
    "use strict";

    $(document).ready(function () {
        // fiddle
        console.log('document.ready');
        var hook = $('#fiddleHook');
        hook.html("<div style='width: 100px; height: 100px; color: #ffffff !important;'><i> Hi There! </i></div>");
        // boiler plate
        addSomeBling(hook);
    });

    function addSomeBling(ctrl) {
        ctrl.addClass('enter-stage-south');
    }


})(window.app = window.app || {}, jQuery)
