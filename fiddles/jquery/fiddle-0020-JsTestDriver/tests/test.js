
TestCase("strftimeTest", {
    setUp: function () {
        this.date = new Date(2009, 9, 2, 22, 14, 45);
    },
    tearDown: function () {
        delete this.date;
    },
    "test format specifier %Y": function () {
        var year = Date.formats.Y(this.date);
        assertNumber(year);
        assertEquals(2009, year);
    },
    "test format specifier %m": function () {
        var month = Date.formats.m(this.date);
        assertString(month);
        assertEquals("10", month);
    },
    "test format specifier %d": function () {
        assertEquals("02", Date.formats.d(this.date));
    },
    "test format specifier %y": function () {
        assertEquals("09", Date.formats.y(this.date));
    },
    "test format specifier %F": function () {
        assertEquals("%Y-%m-%d", Date.formats.F);
    }
});
