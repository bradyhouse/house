"use strict";
var core_1 = require("@angular/core");
var ItemStatusPipe = (function () {
    function ItemStatusPipe() {
        this.value = [];
    }
    ItemStatusPipe.prototype.transform = function (items, deleted) {
        if (items && items.length) {
            this.value = items.filter(function (grocery) {
                return grocery.deleted === deleted;
            });
        }
        return this.value;
    };
    ItemStatusPipe = __decorate([
        core_1.Pipe({
            name: "itemStatus"
        }), 
        __metadata('design:paramtypes', [])
    ], ItemStatusPipe);
    return ItemStatusPipe;
}());
exports.ItemStatusPipe = ItemStatusPipe;
