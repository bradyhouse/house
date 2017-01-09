"use strict";
var Base = (function () {
    function Base() {
        this.subscriptions = [];
    }
    Base.prototype.ngOnDestroy = function () {
        this.clearSubscriptions();
    };
    Base.prototype.clearSubscriptions = function () {
        this.subscriptions.map(function (subscription) {
            subscription.unsubscribe();
        });
        this.subscriptions = [];
    };
    return Base;
}());
exports.Base = Base;
//# sourceMappingURL=base.js.map