(function (app, $, undefined) {
    app.store = app.store || {
        buttonTypes: [
            'primary',
            'info',
            'warning',
            'danger',
            'default',
            'link'
        ]
    };
    app.controller = app.controller || {
        onClickButton: function (btn) {
            alert('hi there!');
        }
    };
    app.view = app.view || {
        button: {
            baseCls: 'btn',
            cls: '',
            text: 'btn',
            id: 'btn1',
            title: 'click here',
            controller: app.controller,
            render: function (container) {
                var me = this,
                    renderedCls = me.cls ? (me.baseCls + ' ' + me.cls) : me.baseCls,
                    button = $('<a/>', {
                        id: me.id,
                        class: renderedCls,
                        title: me.title,
                        text: me.text,
                        click: me.controller.onClickButton
                    });
                button.appendTo(container);
            },
            toString: function () {
                var me = this;
                return 'id: ' + me.id + ', ' +
                    'cls: ' + me.cls + ', ' +
                    'text: ' + me.text + ', ' +
                    'title: ' + me.title;
            }
        },
        init: function () {
            var container = $('#fiddleHook'),
                i = 0,
                btn = null,
                btnType = '';

            for (i; i < app.store.buttonTypes.length; i++) {
                btnType = app.store.buttonTypes[i];
                btn = Object.create(app.view.button);
                btn.cls = 'btn-' + btnType;
                btn.text = btn.cls;
                btn.id = 'btn' + i;
                btn.render(container);
            }
        }
    };
    $(document).ready(function () {
        app.view.init();
    });
})(window.app = window.app || {}, jQuery)
