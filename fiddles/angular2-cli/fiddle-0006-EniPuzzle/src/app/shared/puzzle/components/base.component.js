"use strict";
var config_1 = require("../../config");
var BaseComponent = (function () {
    function BaseComponent() {
        this.subscriptions = [];
    }
    BaseComponent.prototype.ngOnDestroy = function () {
        this.clearSubscriptions();
    };
    BaseComponent.prototype.clearSubscriptions = function () {
        this.subscriptions.map(function (subscription) {
            subscription.unsubscribe();
        });
        this.subscriptions = [];
    };
    BaseComponent.prototype.handleErrors = function (error) {
        this.consoleLogMsg('ERROR', error);
    };
    BaseComponent.prototype.consoleLogMsg = function (tag, msg) {
        if (config_1.Config.isDev === true) {
            console.log(tag + ': ' + msg);
        }
    };
    return BaseComponent;
}());
exports.BaseComponent = BaseComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJiYXNlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBRUEsdUNBQW9DO0FBR3BDO0lBSUU7UUFDRSxJQUFJLENBQUMsYUFBYSxHQUFHLEVBQUUsQ0FBQztJQUMxQixDQUFDO0lBRUQsbUNBQVcsR0FBWDtRQUNFLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO0lBQzVCLENBQUM7SUFFUywwQ0FBa0IsR0FBNUI7UUFDRSxJQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxVQUFDLFlBQTJCO1lBQ2pELFlBQVksQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUM3QixDQUFDLENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxhQUFhLEdBQUcsRUFBRSxDQUFDO0lBQzFCLENBQUM7SUFFUyxvQ0FBWSxHQUF0QixVQUF1QixLQUFVO1FBQy9CLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQ3JDLENBQUM7SUFFUyxxQ0FBYSxHQUF2QixVQUF3QixHQUFXLEVBQUUsR0FBVztRQUM5QyxFQUFFLENBQUMsQ0FBQyxlQUFNLENBQUMsS0FBSyxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDMUIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsSUFBSSxHQUFHLEdBQUcsQ0FBQyxDQUFDO1FBQ2hDLENBQUM7SUFDSCxDQUFDO0lBRUgsb0JBQUM7QUFBRCxDQUFDLEFBN0JELElBNkJDO0FBN0JZLHNDQUFhIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtPbkRlc3Ryb3l9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtJU3Vic2NyaXB0aW9ufSBmcm9tICdyeGpzL1N1YnNjcmlwdGlvbic7XG5pbXBvcnQge0NvbmZpZ30gZnJvbSAnLi4vLi4vY29uZmlnJztcblxuXG5leHBvcnQgY2xhc3MgQmFzZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG5cbiAgc3Vic2NyaXB0aW9uczogQXJyYXk8SVN1YnNjcmlwdGlvbj47XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5zdWJzY3JpcHRpb25zID0gW107XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLmNsZWFyU3Vic2NyaXB0aW9ucygpO1xuICB9XG5cbiAgcHJvdGVjdGVkIGNsZWFyU3Vic2NyaXB0aW9ucygpOiB2b2lkIHtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMubWFwKChzdWJzY3JpcHRpb246IElTdWJzY3JpcHRpb24pID0+IHtcbiAgICAgIHN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIH0pO1xuICAgIHRoaXMuc3Vic2NyaXB0aW9ucyA9IFtdO1xuICB9XG5cbiAgcHJvdGVjdGVkIGhhbmRsZUVycm9ycyhlcnJvcjogYW55KTogYW55IHtcbiAgICB0aGlzLmNvbnNvbGVMb2dNc2coJ0VSUk9SJywgZXJyb3IpO1xuICB9XG5cbiAgcHJvdGVjdGVkIGNvbnNvbGVMb2dNc2codGFnOiBzdHJpbmcsIG1zZzogc3RyaW5nKTogdm9pZCB7XG4gICAgaWYgKENvbmZpZy5pc0RldiA9PT0gdHJ1ZSkge1xuICAgICAgY29uc29sZS5sb2codGFnICsgJzogJyArIG1zZyk7XG4gICAgfVxuICB9XG5cbn1cbiJdfQ==