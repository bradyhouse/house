(function (app, $, undefined) {

    $(document).ready(function () {
        console.log('document.ready');
        var hook = $('#fiddleHook');
        hook.html("<div style='width: 100px; height: 100px; color: #ffffff !important;'><i> Hi There! </i></div>");
        hook.addClass('enter-stage-right');
    });


})(window.app = window.app || {}, jQuery)
