var core_1 = require("@angular/core");
var sidedrawer_1 = require("./../sidedrawer");
var page_1 = require("ui/page");
var elementRegistry = require('nativescript-angular/element-registry');
var TKDRAWERCONTENT = "TKDrawerContent";
var TKMAINCONTENT = "TKMainContent";
var RadSideDrawerComponent = (function () {
    function RadSideDrawerComponent(elementRef, page, viewContainer) {
        this.elementRef = elementRef;
        this.page = page;
        this.viewContainer = viewContainer;
        this.sideDrawerMovedToPage = false;
        this.drawerOpening = new core_1.EventEmitter();
        this.drawerOpen = new core_1.EventEmitter();
        this.drawerClosing = new core_1.EventEmitter();
        this.drawerClosed = new core_1.EventEmitter();
        this.sideDrawer = this.elementRef.nativeElement;
    }
    Object.defineProperty(RadSideDrawerComponent.prototype, "transition", {
        set: function (transition) {
            this.sideDrawer.drawerTransition = transition;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RadSideDrawerComponent.prototype, "drawerContentSize", {
        set: function (value) {
            this._drawerContentSize = value;
            this.updateContentSize();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RadSideDrawerComponent.prototype, "showOverNavigation", {
        set: function (value) {
            this._showOverNavigation = value;
            this.updateShowOverNavigation();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RadSideDrawerComponent.prototype, "gesturesEnabled", {
        set: function (value) {
            this._gesturesEnabled = value;
            this.updateGesturesEnabled();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RadSideDrawerComponent.prototype, "drawerTransition", {
        set: function (value) {
            this._drawerTransition = value;
            this.updateDrawerTransition();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RadSideDrawerComponent.prototype, "drawerLocation", {
        set: function (value) {
            this._drawerLocation = value;
            this.updateDrawerLocation();
        },
        enumerable: true,
        configurable: true
    });
    RadSideDrawerComponent.prototype.updateDrawerLocation = function () {
        this.sideDrawer.drawerLocation = this._drawerLocation;
    };
    RadSideDrawerComponent.prototype.updateDrawerTransition = function () {
        this.sideDrawer.drawerTransition = this._drawerTransition;
    };
    RadSideDrawerComponent.prototype.updateGesturesEnabled = function () {
        this.sideDrawer.gesturedEnabled = this._gesturesEnabled;
    };
    RadSideDrawerComponent.prototype.updateShowOverNavigation = function () {
        this.sideDrawer.showOverNavigation = this._showOverNavigation;
    };
    RadSideDrawerComponent.prototype.updateContentSize = function () {
        this.sideDrawer.drawerContentSize = this._drawerContentSize;
    };
    __decorate([
        core_1.Output()
    ], RadSideDrawerComponent.prototype, "drawerOpening");
    __decorate([
        core_1.Output()
    ], RadSideDrawerComponent.prototype, "drawerOpen");
    __decorate([
        core_1.Output()
    ], RadSideDrawerComponent.prototype, "drawerClosing");
    __decorate([
        core_1.Output()
    ], RadSideDrawerComponent.prototype, "drawerClosed");
    Object.defineProperty(RadSideDrawerComponent.prototype, "transition",
        __decorate([
            core_1.Input()
        ], RadSideDrawerComponent.prototype, "transition", Object.getOwnPropertyDescriptor(RadSideDrawerComponent.prototype, "transition")));
    RadSideDrawerComponent = __decorate([
        core_1.Component({
            selector: 'RadSideDrawer',
            template: "<ng-content></ng-content>"
        }),
        __param(0, core_1.Inject(core_1.ElementRef)),
        __param(1, core_1.Inject(page_1.Page)),
        __param(2, core_1.Inject(core_1.ViewContainerRef))
    ], RadSideDrawerComponent);
    return RadSideDrawerComponent;
})();
exports.RadSideDrawerComponent = RadSideDrawerComponent;
var TKDrawerContentDirective = (function () {
    function TKDrawerContentDirective(_elementRef) {
        this._elementRef = _elementRef;
        this._elementRef.nativeElement.id = TKDRAWERCONTENT;
    }
    TKDrawerContentDirective = __decorate([
        core_1.Directive({
            selector: "[tkDrawerContent]"
        }),
        __param(0, core_1.Inject(core_1.ElementRef))
    ], TKDrawerContentDirective);
    return TKDrawerContentDirective;
})();
exports.TKDrawerContentDirective = TKDrawerContentDirective;
var TKMainContentDirective = (function () {
    function TKMainContentDirective(_elementRef) {
        this._elementRef = _elementRef;
        this._elementRef.nativeElement.id = TKMAINCONTENT;
    }
    TKMainContentDirective = __decorate([
        core_1.Directive({
            selector: "[tkMainContent]"
        }),
        __param(0, core_1.Inject(core_1.ElementRef))
    ], TKMainContentDirective);
    return TKMainContentDirective;
})();
exports.TKMainContentDirective = TKMainContentDirective;
var sideDrawerMeta = {
    insertChild: function (parent, child, atIndex) {
        var drawer = parent;
        var childView = child;
        if (childView.id == TKMAINCONTENT) {
            drawer.mainContent = childView;
        }
        if (childView.id == TKDRAWERCONTENT) {
            drawer.drawerContent = childView;
        }
    },
    removeChild: function (parent, child) {
        var drawer = parent;
        var childView = child;
        if (childView.id == TKMAINCONTENT) {
            drawer.mainContent = null;
        }
        if (childView.id == TKDRAWERCONTENT) {
            drawer.drawerContent = null;
        }
    },
};
exports.SIDEDRAWER_DIRECTIVES = [RadSideDrawerComponent, TKDrawerContentDirective, TKMainContentDirective];
elementRegistry.registerElement("RadSideDrawer", function () { return sidedrawer_1.RadSideDrawer; }, sideDrawerMeta);
