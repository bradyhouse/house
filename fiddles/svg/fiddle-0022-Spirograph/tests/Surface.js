TestCase("Surface class", {
    setUp: function() {
        this.surface1 = new Surface();
    },
    tearDown: function() {
        delete this.surface1;
    },
    "test - Verify default width is 500px": function() {
        assertEquals('width is not 500px', '500px', this.surface1.width);
    },
    "test - Verify default height is 500px": function() {
        assertEquals('height is not 500px', '500px', this.surface1.height);
    }

});
