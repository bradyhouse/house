var gridLayout = require('ui/layouts/grid-layout');
var enums = require("ui/enums");
var common = require('./drawerpage-common');
var observableModule = require('data/observable');
var DependencyObservable = require('ui/core/dependency-observable');
var DrawerPage = (function (_super) {
    __extends(DrawerPage, _super);
    function DrawerPage() {
        _super.call(this);
    }
    Object.defineProperty(DrawerPage.prototype, "android", {
        get: function () {
            return this.topContainer;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DrawerPage.prototype, "_nativeView", {
        get: function () {
            return this.topContainer;
        },
        enumerable: true,
        configurable: true
    });
    DrawerPage.prototype.updateDrawerContentLayoutParams = function (drawer) {
        var child = drawer.drawerContent;
        if (!child) {
            return;
        }
        var location = drawer.drawerLocation.toLowerCase();
        if (location === "top" || location === "bottom") {
            child.horizontalAlignment = enums.HorizontalAlignment.stretch;
            if (location === "bottom") {
                child.verticalAlignment = enums.VerticalAlignment.bottom;
            }
            else {
                child.verticalAlignment = enums.VerticalAlignment.top;
            }
            if (drawer.drawerSize && drawer.drawerSize !== 0) {
                child.height = drawer.drawerSize;
            }
            else {
                child.height = DependencyObservable.unsetValue;
            }
        }
        else {
            if (location === "left") {
                child.horizontalAlignment = enums.HorizontalAlignment.left;
            }
            else {
                child.horizontalAlignment = enums.HorizontalAlignment.right;
            }
            child.verticalAlignment = enums.VerticalAlignment.stretch;
            if (drawer.drawerSize && drawer.drawerSize !== 0) {
                child.width = drawer.drawerSize;
            }
            else {
                child.width = DependencyObservable.unsetValue;
            }
        }
    };
    DrawerPage.prototype._createUI = function () {
        _super.prototype._createUI.call(this);
        if (this.topContainer) {
            this._removeView(this._rootLayout);
            this.mainContainer.android.removeView(this._grid);
            if (this._drawer) {
                // Close the drawer properly before recreating the view hierarchy. Otherwise the fade layer remains visible sometimes and handles tap gestures causing buttons to
                // stop working.
                if (this._drawer.android) {
                    this._drawer.android.setIsOpen(false, false);
                }
                this._removeView(this._drawer);
                if (this._drawer.drawerContent) {
                    this._rootLayout._removeView(this._drawer.drawerContent);
                }
            }
        }
        // Normally this view hierarchy is maintained by the drawer itself. However, the Page class takes the view hierarchy control away from
        // the side drawer because it dictates where the action bar is displayed. Since the drawer wants to
        // display on top of the action bar, DrawerPage now needs to maintain the view hierarchy and put the drawer on top of the action bar.  
        this._rootLayout = new gridLayout.GridLayout();
        this.mainContainer = new gridLayout.GridLayout();
        this.topContainer = new android.widget.FrameLayout(this._context);
        this._addView(this._rootLayout);
        if (this._drawer) {
            this._addView(this._drawer);
        }
        this._rootLayout._addView(this.mainContainer);
        // Add the drawer content on top of the fade layer and main content.
        if (this._drawer && this._drawer.drawerContent) {
            this._rootLayout._addView(this._drawer.drawerContent);
            this._drawer.android.setDrawerContent(this._drawer.drawerContent.android);
            var that = this;
            this._drawer.on(observableModule.Observable.propertyChangeEvent, function (args) {
                if (args.propertyName === "drawerLocation") {
                    that.updateDrawerContentLayoutParams(args.object);
                }
            });
        }
        this.mainContainer.android.addView(this._grid); // Add main content at the bottom.
        if (this._drawer) {
            this.mainContainer.android.addView(this._drawer.android.resolveFadeLayer().view()); // Add fade layer on top of main content.
            this._drawer.android.resolveFadeLayer().view().setClickable(true);
            this._drawer.android.setMainContent(this.mainContainer.android);
            this._drawer.android.resolveFadeLayer().view().bringToFront();
            this.updateDrawerContentLayoutParams(this._drawer);
        }
    };
    DrawerPage.prototype._eachChildView = function (callback) {
        _super.prototype._eachChildView.call(this, callback);
        if (this._rootLayout) {
            callback(this._rootLayout);
        }
        if (this._drawer) {
            callback(this._drawer);
            if (this._drawer.drawerContent) {
                callback(this._drawer.drawerContent);
            }
        }
    };
    DrawerPage.prototype._addViewToNativeVisualTree = function (child, atIndex) {
        if (child === this._rootLayout) {
            this.topContainer.addView(this._rootLayout.android);
            return true;
        }
        if (child === this._drawer) {
            // Add the drawer itself on top of everything so that intercepts gestures.
            this.topContainer.addView(this._drawer.android);
            return true;
        }
        if (!this._grid || !child._nativeView) {
            return false;
        }
        if (child === this.actionBar) {
            gridLayout.GridLayout.setRow(child, 0);
            child.horizontalAlignment = enums.HorizontalAlignment.stretch;
            child.verticalAlignment = enums.VerticalAlignment.top;
        }
        else {
            gridLayout.GridLayout.setRow(child, 1);
        }
        this._grid.addView(child._nativeView);
        return true;
    };
    return DrawerPage;
})(common.DrawerPage);
exports.DrawerPage = DrawerPage;
