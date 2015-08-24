

TestCase("DataGridRow Class", {
    setUp: function () {
        this.dataGridRow1 = new app.test.dataGridRow({id: 100, fields: ['colA', 'colB', 'colC'], colA: 1, colB: 'hi mom'});
        this.dataGridRow2 = new app.test.dataGridRow({fields: ['colA', 'colB', 'colC']});
    },
    tearDown: function () {
        delete this.dataGridRow1;
        delete this.dataGridRow2;
    },
    "test DataGridRow1 Column A": function() {
        assertNumber('Column A is not a number', this.dataGridRow1.colA);
        assertEquals('Column A is not equal to 1', this.dataGridRow1.colA, 1);
    },
    "test DataGridRow1 Column B": function() {
        assertString('Column B is not a string', this.dataGridRow1.colB);
        assertEquals('Column B is not equal to "hi mom"', 'hi mom', this.dataGridRow1.colB);
    },
    "test DataGridRow1 Column C": function() {
        assertString('Column C is not a string', this.dataGridRow1.colC);
    },
    "test DataGridRow1 Fields": function() {
        assertArray('Fields is not an array', this.dataGridRow1.fields);
        assertEquals('Fields length is not 3', this.dataGridRow1.fields.length, 3);
    },
    "test DataGridRow1 Element": function() {
        assertTagName('Document element does not contain a "tr" tag', 'tr', this.dataGridRow1.docElement);
    },
    "test DataGrowRow1 element has 3 child td tags": function() {
        var element = this.dataGridRow1.docElement,
            children = element.getElementsByTagName('td');
        assertEquals('Document element does not contain 3 "td" tags', 3, children.length);
    },
    "test DataGridRow1 numeric id assignment": function() {
        assertEquals('Id was not assigned correctly', 'datagridrow-100', this.dataGridRow1.id);
    },
    "test DataGridRow2 default id assignment": function() {
        assertEquals('Id is incorrect', 'datagridrow1', this.dataGridRow2.id);
    }
});
