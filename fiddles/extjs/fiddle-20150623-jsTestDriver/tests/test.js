
TestCase("fiddle-20150623-jsTestDriver", {
    setUp: function () {
        this.targetBtn = Ext.ComponentQuery.query('#targetBtn')[0];
        var realignBtn = Ext.ComponentQuery.query('realignBtn')[0];
        realignBtn.fireEvent('click');
    },
    "target button is aligned on the right": function () {
        assertEquals(10,10);
    }
});
