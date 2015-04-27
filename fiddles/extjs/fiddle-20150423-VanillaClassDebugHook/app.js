var meta = {
        fiddleHeader: 'Vanilla Class ~ DebugHooks',
        fiddleSubHeader: 'Fiddle exploring how to use the new DebugHooks feature to test the methods of a vanilla class.' +
        '<br />'
    },
    util = {
        log: function (msg) {
            document.body.innerHTML += '<div class="console">' + msg + '</div>';
        }
    };
Ext.define('Fiddle.VanillaClass', {
    addMethod: function (a, b) {
        return a + b;
    },
    id: 'VanillaClass',
    debugHooks: {
        $enabled: true,
        addMethod: function (a, b) {
            var me = this,
                addMethodTestResult = me.callParent(arguments);
            util.log('debugHook');
            util.log(me.id+'.'+'addMethod');
            util.log('a = ' + a);
            util.log('b = ' + b);
            util.log('addMethodTestResult = ' + addMethodTestResult);
            return addMethodTestResult;
        }
    }
});

// Boiler plate
Ext.onReady(function () {
    var vanillaClass = Ext.create('Fiddle.VanillaClass'),
        addMethodResult = vanillaClass.addMethod(3, 4);
    Ext.Msg.alert('VanillaClass.addMethod(3,4)', addMethodResult);
    Ext.create('App.Box', {
        renderTo: Ext.getBody()
    });
});
