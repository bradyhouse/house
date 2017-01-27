"use strict";
var config_1 = require("./shared/config");
var Base = (function () {
    function Base() {
        this.subscriptions = [];
    }
    Base.prototype.ngOnDestroy = function () {
        this.clearSubscriptions();
    };
    Base.prototype.clearSubscriptions = function () {
        this.subscriptions.map(function (subscription) {
            subscription.unsubscribe();
        });
        this.subscriptions = [];
    };
    Base.prototype.handleErrors = function (error) {
        this.consoleLogMsg('ERROR', error);
    };
    Base.prototype.consoleLogMsg = function (tag, msg) {
        if (config_1.Config.isDev === true) {
            console.log(tag + ': ' + msg);
        }
    };
    Base.prototype.consoleLogRecord = function (i, model) {
        if (config_1.Config.isDev === true) {
            console.log('record #' + i + ' = ' + model.toString());
        }
    };
    Base.prototype.consoleLogArray = function (models) {
        var _this = this;
        var i = 0;
        if (config_1.Config.isDev === true) {
            models.map(function (model) {
                _this.consoleLogRecord(i, model);
                i++;
            });
        }
    };
    return Base;
}());
exports.Base = Base;
