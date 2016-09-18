var view = require("ui/core/view"),
    base = require("../../base"),
    btnIds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12,13,14,15,16];

exports.pageLoaded = function(args) {
    var sender = args.object,
        parent = sender.parent,
        seq = base.generateGameSequence(1, 15, 15);
    base.resizeButtons(view, parent, btnIds, 4, 5);
    base.sequenceButtons(view, parent, btnIds, seq);
};
