TestCase("Util.getAsyncPromise Test", {
    setup: function() {
    },
    tearDown: function() {
    },
    "test promise is an object": function() {
        app.test.getAsyncPromise('data.json').then(function(json) {
            assertObject('json is not an object', json);
            assertEquals('json contains 782 records', json.total, 782);
        })
    }
});
