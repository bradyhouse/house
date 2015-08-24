TestCase("Util.calculateColumnWidth Test", {
    setup: function() {
    },
    tearDown: function() {
    },
    "test - '9' is a digit": function() {
        assertEquals('9 is not a digit', app.test.isDigit('9'), true);
    },
    "test - 'C' is not a digit": function() {
        assertEquals('C is a digit', app.test.isDigit('C'), false);
    }
});