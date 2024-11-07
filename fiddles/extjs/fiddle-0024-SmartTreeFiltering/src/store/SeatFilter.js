Ext.define('Fiddle.SeatFilter', {
    extend: 'Ext.util.Filter',
    config: {
        seat: null,
        filterFn: function(node) {
            var ret = false,
                seat = this.getSeat();
            if (node.isFlight) {
               ret = this.filterFlight(node, seat);
            }
            if (node.isPackage && node.data.Passenger.Seat == seat) {
                ret = true;
            }
            return ret;
        },
        id: 'seatFilter'
    },
    filterFlight(node, seat) {
        var ret = false;
        ret = node.childNodes ? node.childNodes.filter(function(package){
            return  package.data.Passenger.Seat == seat;
        }).length > 0 : false;

        if (ret && node.data.checked && !node.isVisibleChildChecked()) {
            node.deselectHiddenChildren();
        }
        return ret;
    }
});
