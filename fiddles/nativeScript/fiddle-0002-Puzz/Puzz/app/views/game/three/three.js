var view = require("ui/core/view"),
    base = require("../../base"),
    btnIds = [1, 2, 3, 4, 5, 6, 7, 8, 9];

exports.pageLoaded = function(args) {
    var sender = args.object,
        parent = sender.parent,
        seq = base.generateGameSequence(1, 8, 8);
    base.resizeButtons(view, parent, btnIds, 3, 4);
    base.sequenceButtons(view, parent, btnIds, seq);
};
