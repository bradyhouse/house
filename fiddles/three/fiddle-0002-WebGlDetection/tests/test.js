
TestCase("fiddle-0002-WebGlDetection", {
    setUp: function () {

    },
    tearDown: function () {
    },
    "test app.util.webGl.exists": function () {
        assertEquals(window.app.util.webGl.exists, true);
    }
});
