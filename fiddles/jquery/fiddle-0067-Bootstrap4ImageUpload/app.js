(function (app, $, undefined) {
    "use strict";

    app.view = app.view || {
        render: function (hook) {
            hook.append('hi there!');
        },
        init: function () {
            var hook = $('#fiddleHook');
            this.render(hook);
        }
    };
    $(document).ready(function () {
      $('#imageUpload').change(function(x) {
        alert(x);
      });
    });
})(window.app = window.app || {}, jQuery)
