var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var common = require("./svg.common");
var types = require("utils/types");
var style = require("ui/styling/style");
var background = require("ui/styling/background");
global.moduleMerge(common, exports);
var utils;
function ensureUtils() {
    if (!utils) {
        utils = require("utils/utils");
    }
}
var fs;
function ensureFS() {
    if (!fs) {
        fs = require("file-system");
    }
}
var enums;
function ensureEnums() {
    if (!enums) {
        enums = require("ui/enums");
    }
}
var ImageSourceSVG = (function () {
    function ImageSourceSVG() {
    }
    ImageSourceSVG.prototype.loadFromResource = function (name) {
        this.android = null;
        ensureUtils();
        var res = utils.ad.getApplicationContext().getResources();
        if (res) {
            var identifier = res.getIdentifier(name, 'drawable', utils.ad.getApplication().getPackageName());
            if (0 < identifier) {
                this.android = new com.larvalabs.svgandroid.SVGParser.getSVGFromResource(res, identifier);
            }
        }
        return this.android != null;
    };
    ImageSourceSVG.prototype.fromResource = function (name) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            resolve(_this.loadFromResource(name));
        });
    };
    ImageSourceSVG.prototype.loadFromFile = function (path) {
        ensureFS();
        var fileName = types.isString(path) ? path.trim() : "";
        if (fileName.indexOf("~/") === 0) {
            fileName = fs.path.join(fs.knownFolders.currentApp().path, fileName.replace("~/", ""));
        }
        this.android = new com.larvalabs.svgandroid.SVGParser.getSVGFromInputStream(new java.io.FileInputStream(new java.io.File(fileName)));
        return this.android != null;
    };
    ImageSourceSVG.prototype.fromFile = function (path) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            resolve(_this.loadFromFile(path));
        });
    };
    ImageSourceSVG.prototype.loadFromData = function (data) {
        this.android = new com.larvalabs.svgandroid.SVGParser.getSVGFromString(data);
        return this.android != null;
    };
    ImageSourceSVG.prototype.fromData = function (data) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            resolve(_this.loadFromData(data));
        });
    };
    ImageSourceSVG.prototype.loadFromBase64 = function (source) {
        var bytes = android.util.Base64.decode(source, android.util.Base64.DEFAULT);
        this.android = new com.larvalabs.svgandroid.SVGParser.getSVGFromString(new java.lang.String(bytes));
        return this.android != null;
    };
    ImageSourceSVG.prototype.fromBase64 = function (data) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            resolve(_this.loadFromBase64(data));
        });
    };
    ImageSourceSVG.prototype.loadFromUrl = function (url) {
        var httpUrl = new java.net.URL(url);
        var urlConnection = httpUrl.openConnection();
        return this.setNativeSource(new com.larvalabs.svgandroid.SVGParser.getSVGFromInputStream(urlConnection.getInputStream()));
    };
    ImageSourceSVG.prototype.fromUrl = function (url) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            resolve(_this.loadFromUrl(url));
        });
    };
    ImageSourceSVG.prototype.setNativeSource = function (source) {
        this.android = source;
        return source != null;
    };
    ImageSourceSVG.prototype.saveToFile = function (path) {
        return false;
    };
    ImageSourceSVG.prototype.toBase64String = function (format) {
        if (!this.android) {
            return null;
            ;
        }
        return android.util.Base64.encodeToString(format, android.util.Base64.DEFAULT);
    };
    Object.defineProperty(ImageSourceSVG.prototype, "height", {
        get: function () {
            if (this.android) {
                return this.android.getPitcture().getHeight();
            }
            return NaN;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ImageSourceSVG.prototype, "width", {
        get: function () {
            if (this.android) {
                return this.android.getPitcture().getWidth();
            }
            return NaN;
        },
        enumerable: true,
        configurable: true
    });
    return ImageSourceSVG;
}());
exports.ImageSourceSVG = ImageSourceSVG;
function onImageSourcePropertyChanged(data) {
    var image = data.object;
    if (!image.android) {
        return;
    }
    image._setNativeImage(data.newValue ? data.newValue.android : null);
}
common.SVGImage.imageSourceProperty.metadata.onSetNativeValue = onImageSourcePropertyChanged;
var SVGImage = (function (_super) {
    __extends(SVGImage, _super);
    function SVGImage() {
        _super.call(this);
    }
    Object.defineProperty(SVGImage.prototype, "android", {
        get: function () {
            return this._android;
        },
        enumerable: true,
        configurable: true
    });
    SVGImage.prototype._createUI = function () {
        this._android = new org.nativescript.widgets.ImageView(this._context);
    };
    SVGImage.prototype._setNativeImage = function (nativeImage) {
        this._drawable = nativeImage.createPictureDrawable();
        this._android.setLayerType(android.view.View.LAYER_TYPE_SOFTWARE, null);
        this._android.setImageDrawable(this._drawable);
    };
    return SVGImage;
}(common.SVGImage));
exports.SVGImage = SVGImage;
var ImageStyler = (function () {
    function ImageStyler() {
    }
    ImageStyler.setBorderRadiusProperty = function (v, newValue, defaultValue) {
        if (!v._nativeView) {
            return;
        }
        var val = Math.round(newValue * utils.layout.getDisplayDensity());
        v._nativeView.setCornerRadius(val);
        background.ad.onBackgroundOrBorderPropertyChanged(v);
    };
    ImageStyler.resetBorderRadiusProperty = function (v, nativeValue) {
        if (!v._nativeView) {
            return;
        }
        v._nativeView.setCornerRadius(0);
        background.ad.onBackgroundOrBorderPropertyChanged(v);
    };
    ImageStyler.setBorderWidthProperty = function (v, newValue, defaultValue) {
        if (!v._nativeView) {
            return;
        }
        var val = Math.round(newValue * utils.layout.getDisplayDensity());
        v._nativeView.setBorderWidth(val);
        background.ad.onBackgroundOrBorderPropertyChanged(v);
    };
    ImageStyler.resetBorderWidthProperty = function (v, nativeValue) {
        if (!v._nativeView) {
            return;
        }
        v._nativeView.setBorderWidth(0);
        background.ad.onBackgroundOrBorderPropertyChanged(v);
    };
    ImageStyler.registerHandlers = function () {
        style.registerHandler(style.borderRadiusProperty, new style.StylePropertyChangedHandler(ImageStyler.setBorderRadiusProperty, ImageStyler.resetBorderRadiusProperty), "SVGImage");
        style.registerHandler(style.borderWidthProperty, new style.StylePropertyChangedHandler(ImageStyler.setBorderWidthProperty, ImageStyler.resetBorderWidthProperty), "SVGImage");
    };
    return ImageStyler;
}());
exports.ImageStyler = ImageStyler;
ImageStyler.registerHandlers();
//# sourceMappingURL=svg.js.map