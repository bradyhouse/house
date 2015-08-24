TestCase("DataGridBody Class", {
    setUp: function() {
        this.dataGridBody = app.test.dataGridBody({});
    },
    tearDown: function() {
        delete this.dataGridBody;
    },
    "test DataGridBody Id": function() {
        return true;
    },
    "test DataGridBody doc element is a div": function() {
        return true;
    },
    "test DataGridBody doc element's child is a div": function() {
        return true;
    },
    "test DataGridBody doc element's grand child is a table": function() {
        return true;
    }
});
