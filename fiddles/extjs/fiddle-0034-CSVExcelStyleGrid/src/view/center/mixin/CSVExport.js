Ext.define('Fiddle.mixin.CSVExport', {
    extend: 'Ext.Mixin',
    mixinConfig: {
        id: 'csvexport',
        after: {
            addTools: 'onAfterAddTools'
        }
    },
    onAfterAddTools: function () {
        var me = this;
        me.addTool([{
            type: 'save',
            tooltip: 'Export to CSV'
        }]);
    },
    downloadCSVFile: function(url, filename) {
        Ext.Ajax.request({
            url: url,
            method: 'GET',
            success: function (response, opts) {
                 var uri = 'data:text/csv;charset=utf-8,' + escape(response.responseText),
                    link = document.createElement("a");
                 link.href = uri;
                 link.style = "visibility:hidden";
                 link.download = filename + ".csv";
                 link.click();
                 delete link;
            },
            failure: function (response, opts) {
                console.log(response);
            }
        });
    }
});
