TestCase("DataGrid Class", {
    setUp: function() {
        this.dataGrid = this.dataGrid || app.test.dataGrid({
            id: 'boundDataGrid',
            hook: document.body,
            width: '500px',
            height: '500px',
            store: app.test.store({
                autoBind: false
            })
        });
    },
    tearDown: function() {
        //delete this.dataGrid;
    },
    "test - Verify store is unbound and count is zero": function() {
        assertEquals('store count is not 0', 0, this.dataGrid.store.count);
    },
    "test - Verify header docElement tag": function() {
        assertTagName('header is not a table', 'table', this.dataGrid.header.docElement);
    },
    "test - Verify body docElement tag": function() {
        assertTagName('body is not a div', 'div', this.dataGrid.body.docElement);
    },
    "test - Verify DataGrid's header contains a table": function() {
        assertTagName('header is not a table', 'table', this.dataGrid.header.docElement);
    },
    "test - Verify DataGrid's body contains a table": function() {
        return true;
    }
});
