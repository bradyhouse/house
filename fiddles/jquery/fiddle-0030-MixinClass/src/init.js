

app.controller = app.controller || {
    onDomContentLoaded: function() {
        var superMan = new SuperMan();
        superMan.fly();
        superMan.flex();
        superMan.destroy();
    }
};


document.body.addEventListener('DOMContentLoaded', app.controller.onDomContentLoaded(), false);
