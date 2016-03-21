var Observable_1 = require("rxjs/Observable");
function asObservable(subject) {
    return new Observable_1.Observable(function (fn) { return subject.subscribe(fn); });
}
exports.asObservable = asObservable;
//# sourceMappingURL=asObservable.js.map