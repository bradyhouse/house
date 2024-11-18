Ext.define('Fiddle.Flights', {
    extend: 'Ext.data.TreeStore',
    requires: [
        'Fiddle.Flight',
        'Fiddle.SeatFilter'
    ],
    model: 'Fiddle.Flight',
    proxy: {
        type: 'ajax',
        url: 'data.json',
        reader: {
            type: 'json'
        }
    },
    addSeatFilter: function(seat) {
        var filter = new Fiddle.SeatFilter({
                seat: seat
            }),
            tree = this.ownerTree;

        this.addFilter(filter);

        if (tree) {
            tree.getChecked().map (function(node) {
                if (node.isFlight && (!node.data.visible || !node.isVisibleChildChecked())) {
                    tree.fireEvent('checkchange', node, false);
                }
            });
        }

    }
}, function () {
    flights = Ext.create('Fiddle.Flights', {
        storeId: 'flights'
    });
});
