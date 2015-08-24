TestCase("Util.convertToColumnName Test", {
    setup: function() {
    },
    tearDown: function() {
    },
    "test convertToColumnName for index 1": function() {
        assertEquals('Column name is incorrect', 'cA', app.test.convertToColumnName(1));
    },
    "test convertToColumnName for index 2": function() {
        assertEquals('Column name is incorrect', 'cB', app.test.convertToColumnName(2));
    },
    "test convertToColumnName for index 3": function() {
        assertEquals('Column name is incorrect', 'cC', app.test.convertToColumnName(3));
    },
    "test convertToColumnName for index 4": function() {
        assertEquals('Column name is incorrect', 'cD', app.test.convertToColumnName(4));
    },
    "test convertToColumnName for index 5": function() {
        assertEquals('Column name is incorrect', 'cE', app.test.convertToColumnName(5));
    },
    "test convertToColumnName for index 28": function() {
        assertEquals('Column name is incorrect', 'cAA', app.test.convertToColumnName(28));
    },
    "test convertToColumnName for index 54": function() {
        assertEquals('Column name is incorrect', 'cABA', app.test.convertToColumnName(54));
    }
});
