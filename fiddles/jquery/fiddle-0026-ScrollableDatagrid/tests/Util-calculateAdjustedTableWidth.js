TestCase("Util.calculateAdjustedTableWidth Test", {
    "test - '1290px by 11 columns' returns 1298px": function() {
        assertEquals('table width is not 1298px', app.test.calculateAdjustedTableWidth('1290px', 11), '1298px');
    }
});