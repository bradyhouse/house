(function (app, $, undefined) {
    "use strict";

    $(document).ready(function () {

        $(document).load( "data.csv" );

        $(document).ajaxComplete(function (event, xhr, settings) {
            if (settings.url === "data.csv") {
                var hook = window.document.getElementById('fiddleHook'),
                    container = window.document.createElement('pre'),
                    data = $.csv.toObjects(xhr.responseText),
                    raw = JSON.stringify(data);
                container.innerText = raw;
                console.log(JSON.stringify(data));
                hook.appendChild(container);
            }
        })
    });

})(window.app = window.app || {}, jQuery)
