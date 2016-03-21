var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var immutable_1 = require('immutable');
var RawDataRecord = immutable_1.Record({
    title: "",
    children: []
});
var RawData = (function (_super) {
    __extends(RawData, _super);
    function RawData(props) {
        _super.call(this, props);
    }
    return RawData;
})(RawDataRecord);
exports.RawData = RawData;
//# sourceMappingURL=RawData.js.map