describe ("{{classname}}", function () {
    var clsInstance = null;
    beforeEach (function () {
        clsInstance = Ext.create('{{classname}}');
    });
    afterEach(function() {
        clsInstance.destroy();
    });
    describe('no config', function() {
        it ('should have a constructor without dependencies', function () {
            expect (clsInstance).toBeTruthy();
        });
    });
});
