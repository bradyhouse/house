var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var dependencyObservable = require("ui/core/dependency-observable");
var view = require("ui/core/view");
var proxy = require("ui/core/proxy");
var platform = require("platform");
var utils = require("utils/utils");
var types = require("utils/types");
var definition = require("nativescript-svg");
var SRC = "src";
var IMAGE_SOURCE = "imageSourceSVG";
var LOAD_MODE = "loadMode";
var SYNC = "sync";
var ASYNC = "async";
var IMAGE = "SVGImage";
var ISLOADING = "isLoading";
var AffectsLayout = platform.device.os === platform.platformNames.android ? dependencyObservable.PropertyMetadataSettings.None : dependencyObservable.PropertyMetadataSettings.AffectsLayout;
function onSrcPropertyChanged(data) {
    var image = data.object;
    image._createImageSourceFromSrc();
}
var SVGImage = (function (_super) {
    __extends(SVGImage, _super);
    function SVGImage(options) {
        _super.call(this, options);
    }
    Object.defineProperty(SVGImage.prototype, "src", {
        get: function () {
            return this._getValue(SVGImage.srcProperty);
        },
        set: function (value) {
            this._setValue(SVGImage.srcProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SVGImage.prototype, "imageSource", {
        get: function () {
            return this._getValue(SVGImage.imageSourceProperty);
        },
        set: function (value) {
            this._setValue(SVGImage.imageSourceProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SVGImage.prototype, "isLoading", {
        get: function () {
            return this._getValue(SVGImage.isLoadingProperty);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SVGImage.prototype, "loadMode", {
        get: function () {
            return this._getValue(SVGImage.loadModeProperty);
        },
        set: function (value) {
            this._setValue(SVGImage.loadModeProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    SVGImage.prototype._setNativeImage = function (nativeImage) {
    };
    SVGImage.prototype._createImageSourceFromSrc = function () {
        var _this = this;
        var value = this.src;
        if (types.isString(value)) {
            value = value.trim();
            this.imageSource = null;
            this["_url"] = value;
            this._setValue(SVGImage.isLoadingProperty, true);
            var source = new definition.ImageSourceSVG();
            var imageLoaded = function () {
                var currentValue = _this.src;
                if (!types.isString(_this.src) || value !== currentValue.trim()) {
                    return;
                }
                _this.imageSource = source;
                _this._setValue(SVGImage.isLoadingProperty, false);
            };
            if (utils.isDataURI(value)) {
                var base64Data = value.split(",")[1];
                if (types.isDefined(base64Data)) {
                    if (this.loadMode === SYNC) {
                        source.loadFromBase64(base64Data);
                        imageLoaded();
                    }
                    else if (this.loadMode === ASYNC) {
                        source.fromBase64(base64Data).then(imageLoaded);
                    }
                }
            }
            else if (definition.isFileOrResourcePath(value)) {
                if (value.indexOf(utils.RESOURCE_PREFIX) === 0) {
                    var resPath = value.substr(utils.RESOURCE_PREFIX.length);
                    if (this.loadMode === SYNC) {
                        source.loadFromResource(resPath);
                        imageLoaded();
                    }
                    else if (this.loadMode === ASYNC) {
                        this.imageSource = null;
                        source.fromResource(resPath).then(imageLoaded);
                    }
                }
                else {
                    if (this.loadMode === SYNC) {
                        source.loadFromFile(value);
                        imageLoaded();
                    }
                    else if (this.loadMode === ASYNC) {
                        this.imageSource = null;
                        source.fromFile(value).then(imageLoaded);
                    }
                }
            }
            else {
                this.imageSource = null;
                definition.fromUrl(value).then(function (r) {
                    if (_this["_url"] === value) {
                        _this.imageSource = r;
                        _this._setValue(SVGImage.isLoadingProperty, false);
                    }
                });
            }
        }
        else if (value instanceof definition.ImageSourceSVG) {
            this.imageSource = value;
            this._setValue(SVGImage.isLoadingProperty, false);
        }
        else {
            this.imageSource = definition.fromNativeSource(value);
            this._setValue(SVGImage.isLoadingProperty, false);
        }
    };
    SVGImage.srcProperty = new dependencyObservable.Property(SRC, IMAGE, new dependencyObservable.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.None, onSrcPropertyChanged));
    SVGImage.imageSourceProperty = new dependencyObservable.Property(IMAGE_SOURCE, IMAGE, new proxy.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.None));
    SVGImage.isLoadingProperty = new dependencyObservable.Property(ISLOADING, IMAGE, new dependencyObservable.PropertyMetadata(false, dependencyObservable.PropertyMetadataSettings.None));
    SVGImage.loadModeProperty = new dependencyObservable.Property(LOAD_MODE, IMAGE, new proxy.PropertyMetadata(SYNC, 0, null, function (value) { return value === SYNC || value === ASYNC; }, null));
    return SVGImage;
}(view.View));
exports.SVGImage = SVGImage;
function fromResource(name) {
    var image = new definition.ImageSourceSVG();
    return image.loadFromResource(name) ? image : null;
}
exports.fromResource = fromResource;
function fromFile(path) {
    var image = new definition.ImageSourceSVG();
    return image.loadFromFile(path) ? image : null;
}
exports.fromFile = fromFile;
function fromData(data) {
    var image = new definition.ImageSourceSVG();
    return image.loadFromData(data) ? image : null;
}
exports.fromData = fromData;
function fromBase64(source) {
    var image = new definition.ImageSourceSVG();
    return image.loadFromBase64(source) ? image : null;
}
exports.fromBase64 = fromBase64;
function fromNativeSource(source) {
    var image = new definition.ImageSourceSVG();
    return image.setNativeSource(source) ? image : null;
}
exports.fromNativeSource = fromNativeSource;
function fromUrl(url) {
    var image = new definition.ImageSourceSVG();
    return image.loadFromUrl(url) ? image : null;
}
exports.fromUrl = fromUrl;
function fromFileOrResource(path) {
    if (!isFileOrResourcePath(path)) {
        throw new Error("Path \"" + "\" is not a valid file or resource.");
    }
    if (path.indexOf(utils.RESOURCE_PREFIX) === 0) {
        return fromResource(path.substr(utils.RESOURCE_PREFIX.length));
    }
    return fromFile(path);
}
exports.fromFileOrResource = fromFileOrResource;
function isFileOrResourcePath(path) {
    return utils.isFileOrResourcePath(path);
}
exports.isFileOrResourcePath = isFileOrResourcePath;
//# sourceMappingURL=svg.common.js.map