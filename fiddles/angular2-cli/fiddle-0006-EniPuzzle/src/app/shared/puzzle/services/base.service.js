"use strict";
var config_1 = require("../../config");
var BaseService = (function () {
    function BaseService() {
        this.subscriptions = [];
    }
    BaseService.prototype.ngOnDestroy = function () {
        this.clearSubscriptions();
    };
    BaseService.prototype.clearSubscriptions = function () {
        this.subscriptions.map(function (subscription) {
            subscription.unsubscribe();
        });
        this.subscriptions = [];
    };
    BaseService.prototype.handleErrors = function (error) {
        this.consoleLogMsg('ERROR', error);
    };
    BaseService.prototype.consoleLogMsg = function (tag, msg) {
        if (config_1.Config.isDev === true) {
            console.log(tag + ': ' + msg);
        }
    };
    BaseService.prototype.consoleLogRecord = function (i, model) {
        if (config_1.Config.isDev === true) {
            console.log('record #' + i + ' = ' + model.toString());
        }
    };
    return BaseService;
}());
exports.BaseService = BaseService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYmFzZS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFFQSx1Q0FBb0M7QUFJcEM7SUFJRTtRQUNFLElBQUksQ0FBQyxhQUFhLEdBQUcsRUFBRSxDQUFDO0lBQzFCLENBQUM7SUFFRCxpQ0FBVyxHQUFYO1FBQ0UsSUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUM7SUFDNUIsQ0FBQztJQUVTLHdDQUFrQixHQUE1QjtRQUNFLElBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLFVBQUMsWUFBMkI7WUFDakQsWUFBWSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQzdCLENBQUMsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLGFBQWEsR0FBRyxFQUFFLENBQUM7SUFDMUIsQ0FBQztJQUVTLGtDQUFZLEdBQXRCLFVBQXVCLEtBQVU7UUFDL0IsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDckMsQ0FBQztJQUVTLG1DQUFhLEdBQXZCLFVBQXdCLEdBQVcsRUFBRSxHQUFXO1FBQzlDLEVBQUUsQ0FBQyxDQUFDLGVBQU0sQ0FBQyxLQUFLLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQztZQUMxQixPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxJQUFJLEdBQUcsR0FBRyxDQUFDLENBQUM7UUFDaEMsQ0FBQztJQUNILENBQUM7SUFFUyxzQ0FBZ0IsR0FBMUIsVUFBMkIsQ0FBQyxFQUFFLEtBQXFCO1FBQ2pELEVBQUUsQ0FBQyxDQUFDLGVBQU0sQ0FBQyxLQUFLLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQztZQUMxQixPQUFPLENBQUMsR0FBRyxDQUFDLFVBQVUsR0FBRyxDQUFDLEdBQUcsS0FBSyxHQUFHLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO1FBQ3pELENBQUM7SUFDSCxDQUFDO0lBR0gsa0JBQUM7QUFBRCxDQUFDLEFBcENELElBb0NDO0FBcENZLGtDQUFXIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtPbkRlc3Ryb3l9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtJU3Vic2NyaXB0aW9ufSBmcm9tICdyeGpzL1N1YnNjcmlwdGlvbic7XG5pbXBvcnQge0NvbmZpZ30gZnJvbSAnLi4vLi4vY29uZmlnJztcbmltcG9ydCB7TW9kZWxJbnRlcmZhY2V9IGZyb20gJy4uLy4uL21vZGVsLmludGVyZmFjZSc7XG5cblxuZXhwb3J0IGNsYXNzIEJhc2VTZXJ2aWNlIGltcGxlbWVudHMgT25EZXN0cm95IHtcblxuICBzdWJzY3JpcHRpb25zOiBBcnJheTxJU3Vic2NyaXB0aW9uPjtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMgPSBbXTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuY2xlYXJTdWJzY3JpcHRpb25zKCk7XG4gIH1cblxuICBwcm90ZWN0ZWQgY2xlYXJTdWJzY3JpcHRpb25zKCk6IHZvaWQge1xuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5tYXAoKHN1YnNjcmlwdGlvbjogSVN1YnNjcmlwdGlvbikgPT4ge1xuICAgICAgc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgfSk7XG4gICAgdGhpcy5zdWJzY3JpcHRpb25zID0gW107XG4gIH1cblxuICBwcm90ZWN0ZWQgaGFuZGxlRXJyb3JzKGVycm9yOiBhbnkpOiBhbnkge1xuICAgIHRoaXMuY29uc29sZUxvZ01zZygnRVJST1InLCBlcnJvcik7XG4gIH1cblxuICBwcm90ZWN0ZWQgY29uc29sZUxvZ01zZyh0YWc6IHN0cmluZywgbXNnOiBzdHJpbmcpOiB2b2lkIHtcbiAgICBpZiAoQ29uZmlnLmlzRGV2ID09PSB0cnVlKSB7XG4gICAgICBjb25zb2xlLmxvZyh0YWcgKyAnOiAnICsgbXNnKTtcbiAgICB9XG4gIH1cblxuICBwcm90ZWN0ZWQgY29uc29sZUxvZ1JlY29yZChpLCBtb2RlbDogTW9kZWxJbnRlcmZhY2UpOiB2b2lkIHtcbiAgICBpZiAoQ29uZmlnLmlzRGV2ID09PSB0cnVlKSB7XG4gICAgICBjb25zb2xlLmxvZygncmVjb3JkICMnICsgaSArICcgPSAnICsgbW9kZWwudG9TdHJpbmcoKSk7XG4gICAgfVxuICB9XG5cblxufVxuIl19