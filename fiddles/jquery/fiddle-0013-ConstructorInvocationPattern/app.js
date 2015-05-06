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
        ButtonController: function (btn, id) {
            var me = this;
            me.id = id;
            btn.addController(me);
            me.onClick = function (btn) {
                alert('Controller \"' + btn.controller.id + '\" says that you clicked the \"' + btn.text + '\" button');
            };
            btn.click = function () {
                btn.controller.onClick.apply(btn, [btn]);
            };
        }
    };
    app.view = app.view || {
        Button: function (cls, id, title) {
            var me = this;
            me.baseCls = 'btn';
            me.cls = cls;
            me.id = id;
            me.text = title,
                me.title = title;
            me.render = function (container) {
                var me = this,
                    renderedCls = me.cls ? (me.baseCls + ' ' + me.cls) : me.baseCls,
                    button = $('<a/>', {
                        id: me.id,
                        class: renderedCls,
                        title: me.title,
                        text: me.text,
                        click: me.controller.onClickButton
                    });
                if (me.click) {
                    button.on('click', me.click);
                }
                button.appendTo(container);
            };
            me.toString = function () {
                var me = this;
                return 'id: ' + me.id + ', ' +
                    'cls: ' + me.cls + ', ' +
                    'text: ' + me.text + ', ' +
                    'title: ' + me.title;
            };
            me.addController = function (controller) {
                this.controller = controller;
            };
        },
        init: function () {
            var container = $('#fiddleHook'),
                i = 0,
                btn = null,
                btnController = null,
                btnControllerId = '',
                btnType = '',
                btnCls = '',
                btnId = '',
                btnText = '';
            for (i; i < app.store.buttonTypes.length; i++) {
                btnType = app.store.buttonTypes[i];
                btnCls = 'btn-' + btnType;
                btnId = 'btn' + (i + 1);
                btnControllerId = btnId + "Controller";
                btnText = btnCls;
                btn = new app.view.Button(btnCls, btnId, btnText);
                btnController = new app.controller.ButtonController(btn, btnControllerId);
                btn.render(container);
            }
        }
    };
    $(document).ready(function () {
        app.view.init();
    });
})(window.app = window.app || {}, jQuery)
