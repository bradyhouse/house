StartTest(function(t) {
    t.diag("Santity");
    t.ok(Ext, 'ExtJS is here');
    t.ok(Ext.Window, 'Ext.Window as well');
    t.ok(House, 'House namespace is here');
    t.done();
});