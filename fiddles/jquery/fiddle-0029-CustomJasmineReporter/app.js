(function (app, $, undefined) {
    "use strict";
    app.util = function () {
        return {
            request: function (url, onSuccess, onError) {
                $(document).load(url);
                $(document).ajaxComplete(onSuccess);
            }
        }
    };
    app.model = function (config) {
        var localFields = [];
        return {
            self: this,
            fields: localFields
        }
    };
    app.store = function (config) {
        var localData = [];
        return {
            self: this,
            data: localData,
            load: function (model) {
                localData.push(model);
            }
        }
    };
    app.view = app.view || {
            render: function (hook) {
                hook.append('hi there!');
            },
            init: function () {
                var hook = $('#sandboxIframe');
                this.render(hook);
            }
        };
    $(document).ready(function () {
        app.view.init();
    });
})(window.app = window.app || {}, jQuery)
