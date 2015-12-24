

app.controller = app.controller || {
        onDOMContentLoaded: function () {
            var fiddleHook = document.getElementById('fiddleHook');
            new app.view.Viewport({
                hook: fiddleHook
            });
        }
    };

document.body.addEventListener('DOMContentLoaded', app.controller.onDOMContentLoaded(), false);

