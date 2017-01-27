app.controller = app.controller || {
        onDomContentLoaded: function() {
            var docElement = window.document.getElementById('fiddleHook');
            app.docElement = new Board({
                hook: docElement,
                autoBind: true
            })
        }
    };

document.body.addEventListener('DOMContentLoaded', app.controller.onDomContentLoaded(), false);

