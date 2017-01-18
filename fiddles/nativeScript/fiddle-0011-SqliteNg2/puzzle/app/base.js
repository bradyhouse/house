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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImJhc2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUdBLDBDQUF1QztBQUl2QztJQUlFO1FBQ0UsSUFBSSxDQUFDLGFBQWEsR0FBRyxFQUFFLENBQUM7SUFDMUIsQ0FBQztJQUVELDBCQUFXLEdBQVg7UUFDRSxJQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztJQUM1QixDQUFDO0lBRVMsaUNBQWtCLEdBQTVCO1FBQ0UsSUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsVUFBQyxZQUEwQjtZQUNoRCxZQUFZLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDN0IsQ0FBQyxDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsYUFBYSxHQUFHLEVBQUUsQ0FBQztJQUMxQixDQUFDO0lBRVMsMkJBQVksR0FBdEIsVUFBdUIsS0FBVTtRQUMvQixJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsQ0FBQztJQUNyQyxDQUFDO0lBRVMsNEJBQWEsR0FBdkIsVUFBd0IsR0FBVyxFQUFFLEdBQVc7UUFDOUMsRUFBRSxDQUFDLENBQUMsZUFBTSxDQUFDLEtBQUssS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQzFCLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLElBQUksR0FBRyxHQUFHLENBQUMsQ0FBQztRQUNoQyxDQUFDO0lBQ0gsQ0FBQztJQUVTLCtCQUFnQixHQUExQixVQUEyQixDQUFDLEVBQUUsS0FBcUI7UUFDakQsRUFBRSxDQUFDLENBQUMsZUFBTSxDQUFDLEtBQUssS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQzFCLE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBVSxHQUFHLENBQUMsR0FBRyxLQUFLLEdBQUcsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7UUFDekQsQ0FBQztJQUNILENBQUM7SUFDUyw4QkFBZSxHQUF6QixVQUEwQixNQUF3QjtRQUFsRCxpQkFRQztRQVBDLElBQUksQ0FBQyxHQUFXLENBQUMsQ0FBQztRQUNsQixFQUFFLENBQUMsQ0FBQyxlQUFNLENBQUMsS0FBSyxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDMUIsTUFBTSxDQUFDLEdBQUcsQ0FBQyxVQUFDLEtBQXFCO2dCQUMvQixLQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDO2dCQUNoQyxDQUFDLEVBQUUsQ0FBQztZQUNOLENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQztJQUNILENBQUM7SUFHSCxXQUFDO0FBQUQsQ0FBQyxBQTdDRCxJQTZDQztBQTdDWSxvQkFBSSIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHtPbkRlc3Ryb3l9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtJU3Vic2NyaXB0aW9ufSBmcm9tICdyeGpzL1N1YnNjcmlwdGlvbic7XG5pbXBvcnQge0NvbmZpZ30gZnJvbSAnLi9zaGFyZWQvY29uZmlnJztcbmltcG9ydCB7TW9kZWxJbnRlcmZhY2V9IGZyb20gJy4vc2hhcmVkL21vZGVsLmludGVyZmFjZSc7XG5cblxuZXhwb3J0IGNsYXNzIEJhc2UgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuXG4gIHN1YnNjcmlwdGlvbnM6QXJyYXk8SVN1YnNjcmlwdGlvbj47XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5zdWJzY3JpcHRpb25zID0gW107XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLmNsZWFyU3Vic2NyaXB0aW9ucygpO1xuICB9XG5cbiAgcHJvdGVjdGVkIGNsZWFyU3Vic2NyaXB0aW9ucygpOnZvaWQge1xuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5tYXAoKHN1YnNjcmlwdGlvbjpJU3Vic2NyaXB0aW9uKSA9PiB7XG4gICAgICBzdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICB9KTtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMgPSBbXTtcbiAgfVxuXG4gIHByb3RlY3RlZCBoYW5kbGVFcnJvcnMoZXJyb3I6IGFueSk6IGFueSB7XG4gICAgdGhpcy5jb25zb2xlTG9nTXNnKCdFUlJPUicsIGVycm9yKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBjb25zb2xlTG9nTXNnKHRhZzogc3RyaW5nLCBtc2c6IHN0cmluZyk6IHZvaWQge1xuICAgIGlmIChDb25maWcuaXNEZXYgPT09IHRydWUpIHtcbiAgICAgIGNvbnNvbGUubG9nKHRhZyArICc6ICcgKyBtc2cpO1xuICAgIH1cbiAgfVxuXG4gIHByb3RlY3RlZCBjb25zb2xlTG9nUmVjb3JkKGksIG1vZGVsOiBNb2RlbEludGVyZmFjZSk6IHZvaWQge1xuICAgIGlmIChDb25maWcuaXNEZXYgPT09IHRydWUpIHtcbiAgICAgIGNvbnNvbGUubG9nKCdyZWNvcmQgIycgKyBpICsgJyA9ICcgKyBtb2RlbC50b1N0cmluZygpKTtcbiAgICB9XG4gIH1cbiAgcHJvdGVjdGVkIGNvbnNvbGVMb2dBcnJheShtb2RlbHM6IE1vZGVsSW50ZXJmYWNlW10pOiB2b2lkIHtcbiAgICBsZXQgaTogbnVtYmVyID0gMDtcbiAgICBpZiAoQ29uZmlnLmlzRGV2ID09PSB0cnVlKSB7XG4gICAgICBtb2RlbHMubWFwKChtb2RlbDogTW9kZWxJbnRlcmZhY2UpID0+IHtcbiAgICAgICAgdGhpcy5jb25zb2xlTG9nUmVjb3JkKGksIG1vZGVsKTtcbiAgICAgICAgaSsrO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cblxufVxuIl19