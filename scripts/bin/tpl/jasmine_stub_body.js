describe ("{{classname}} - Test Suite", function () {
    var clsInstance = null;
    beforeEach (function () {
        clsInstance = Ext.create('{{classname}}');
    });
    it ('{{classname}} is loaded', function () {
        expect (clsInstance != null).toBeTruthy ();
    });
});