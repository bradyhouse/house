(function (app, $, undefined) {


    $(document).ready(function () {

        $(".trigger" ).click(function() {
            $( ".result" ).load( "data.json" );
        });

        $(document).ajaxComplete(function (event, xhr, settings) {
            if (settings.url === "data.json") {
                $(".log").text("Triggered ajaxComplete handler. The result is " +
                    xhr.responseText);
            }
        })
    });


})(window.app = window.app || {}, jQuery)
