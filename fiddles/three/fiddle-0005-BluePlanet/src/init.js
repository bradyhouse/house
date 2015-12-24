
app.controller = app.controller || {
        onDOMContentLoaded: function () {
            new app.view.Viewport({
            });
        }
    };

if (!window.location.pathname.match('test')) {
    document.body.addEventListener('DOMContentLoaded', app.controller.onDOMContentLoaded(), false);
}


