var page = require("ui/page");
var DrawerPage = (function (_super) {
    __extends(DrawerPage, _super);
    function DrawerPage() {
        _super.call(this);
    }
    Object.defineProperty(DrawerPage.prototype, "sideDrawer", {
        get: function () {
            return this._drawer;
        },
        set: function (value) {
            this._drawer = value;
            if (this._drawer) {
                this._drawer.showOverNavigation = true;
            }
        },
        enumerable: true,
        configurable: true
    });
    DrawerPage.prototype.onLoaded = function () {
        _super.prototype.onLoaded.call(this);
        if (this._drawer && this._drawer.showOverNavigation) {
            this._drawer.drawerContent.bindingContext = this.bindingContext;
        }
    };
    DrawerPage.prototype._addChildFromBuilder = function (name, value) {
        if (name === "sideDrawer") {
            this.sideDrawer = value;
        }
        else {
            _super.prototype._addChildFromBuilder.call(this, name, value);
        }
    };
    return DrawerPage;
})(page.Page);
exports.DrawerPage = DrawerPage;
