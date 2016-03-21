var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('angular2/core');
var TreeNodeSearchPipe = (function () {
    function TreeNodeSearchPipe() {
        this.store = [];
    }
    TreeNodeSearchPipe.prototype.transform = function (value, _a) {
        var queryString = _a[0];
        this.store.length = 0;
        (_b = this.store).push.apply(_b, value.filter(function (node) {
            return node.name.includes(queryString) ||
                node.containsName(queryString) ||
                node.parent.name.includes(queryString);
        }));
        return this.store;
        var _b;
    };
    TreeNodeSearchPipe = __decorate([
        core_1.Pipe({
            name: 'treeNodeSearch',
            pure: false
        }), 
        __metadata('design:paramtypes', [])
    ], TreeNodeSearchPipe);
    return TreeNodeSearchPipe;
})();
exports.TreeNodeSearchPipe = TreeNodeSearchPipe;
//# sourceMappingURL=TreeNodeSearchPipe.js.map