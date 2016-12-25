"use strict";
function setHintColor(args) {
    if (args.view.android) {
        args.view.android.setHintTextColor(args.color.android);
    }
    if (args.view.ios) {
        var dictionary = new NSDictionary([args.color.ios], [NSForegroundColorAttributeName]);
        args.view.ios.attributedPlaceholder = NSAttributedString.alloc().initWithStringAttributes(args.view.hint, dictionary);
    }
}
exports.setHintColor = setHintColor;
//# sourceMappingURL=hint-util.js.map