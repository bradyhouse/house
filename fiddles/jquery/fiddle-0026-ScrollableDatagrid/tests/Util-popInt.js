TestCase("Util.popInt Test", {
    setup: function() {
    },
    tearDown: function() {
    },
    "test - '100px' is 100": function() {
        assertEquals('100px is not 100', app.test.popInt('100px'), 100);
    },
    "test - '100' is 100": function() {
        assertEquals('100 is not 100', app.test.popInt('100'), 100);
    }
});