var RootNodeService = (function () {
    function RootNodeService() {
    }
    Object.defineProperty(RootNodeService.prototype, "root", {
        get: function () {
            return this._root;
        },
        set: function (value) {
            this._root = value;
        },
        enumerable: true,
        configurable: true
    });
    return RootNodeService;
})();
exports.RootNodeService = RootNodeService;
//# sourceMappingURL=RootNodeService.js.map