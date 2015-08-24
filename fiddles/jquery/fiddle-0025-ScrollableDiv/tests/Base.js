TestCase("Base class", {
    setUp: function () {
        this.base = app.test.base({});
    },
    tearDown: function () {
        delete this.base;
    },
    "test 1": function () {
        return true;
    }
});
