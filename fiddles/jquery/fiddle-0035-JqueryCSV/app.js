(function (app, $, undefined) {
    "use strict";

    $(document).ready(function () {

        $(document).load( "dates.csv" );

        $(document).ajaxComplete(function (event, xhr, settings) {
            if (settings.url === "dates.csv") {
                var hook = window.document.getElementById('fiddleHook'),
                    container = window.document.createElement('pre'),
                    data = $.csv.toObjects(xhr.responseText),
                    raw = JSON.stringify(data);
                container.innerText = raw;
                hook.appendChild(container);
            }
        })
    });

})(window.app = window.app || {}, jQuery)
