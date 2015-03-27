(function (app, $, undefined) {


    $(document).ready(function () {
        console.log('document.ready');

        var fiddleHook = $("#fiddleHook"),
            json = {
                uglyParameter: "'This is a horrible query string parameter `@!@#!'''''' 03/28/2015"
            };

        require(["dojo/io-query"], function (ioQuery) {
            queryString = ioQuery.objectToQuery(json);
            fiddleHook.text(queryString);
            });

    });


})(window.app = window.app || {}, jQuery)



