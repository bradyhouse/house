TestCase("DataGridHeader Class", {
    setUp: function() {
        this.dataGridHeader = app.test.dataGridHeader({fields: ['colA', 'colB', 'colC']});
    },
    tearDown: function() {
        delete this.dataGridHeader;
    },
    "test DataGridHeader doc element is a table": function() {
        assertTagName('Document element does not contain a "table" tag', 'table', this.dataGridHeader.docElement);
    },
    "test DataGridHeader doc element has 1 table row": function() {
        var tableElement = this.dataGridHeader.docElement,
            rowElements = tableElement.getElementsByTagName('tr');
        assertEquals('Document element does not contain a row', 1, rowElements.length);
    },
    "test DataGridHeader doc element has 3 cells": function() {
        var tableElement = this.dataGridHeader.docElement,
            headerCellElements = tableElement.getElementsByTagName('th');
        assertEquals('Document element does not contain 3 cells', 3, headerCellElements.length);
    },
    "test DataGridHeader doc element cell id's are 'cA', 'cB', and 'cC'": function() {
        var tableElement = this.dataGridHeader.docElement,
            headerCellElements = tableElement.getElementsByTagName('th');
        assertEquals('header cell id is not "cA"', 'cA', headerCellElements[0].id);
        assertEquals('header cell id is not "cB"', 'cB', headerCellElements[1].id);
        assertEquals('header cell id is not "cC"', 'cC', headerCellElements[2].id);
    }
});
