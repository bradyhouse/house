"use strict";
var Config = (function () {
    function Config() {
    }
    return Config;
}());
Config.title = '15 Puzzle';
Config.isDev = true;
Config.dbFile = 'highscore.db';
Config.defaultLevel = 1;
Config.transitionWithoutHistory = {
    transition: {
        name: "flip",
        curve: "linear"
    },
    clearHistory: true
};
Config.transitionWithHistory = {
    transition: {
        name: "flip",
        curve: "linear"
    },
    clearHistory: false
};
exports.Config = Config;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtJQUFBO0lBb0JBLENBQUM7SUFBRCxhQUFDO0FBQUQsQ0FBQyxBQXBCRDtBQUNTLFlBQUssR0FBVyxXQUFXLENBQUM7QUFDNUIsWUFBSyxHQUFZLElBQUksQ0FBQztBQUN0QixhQUFNLEdBQVcsY0FBYyxDQUFDO0FBQ2hDLG1CQUFZLEdBQVcsQ0FBQyxDQUFDO0FBQ3pCLCtCQUF3QixHQUFXO0lBQ3hDLFVBQVUsRUFBRTtRQUNWLElBQUksRUFBRSxNQUFNO1FBQ1osS0FBSyxFQUFFLFFBQVE7S0FDaEI7SUFDRCxZQUFZLEVBQUUsSUFBSTtDQUNuQixDQUFDO0FBQ0ssNEJBQXFCLEdBQVc7SUFDckMsVUFBVSxFQUFFO1FBQ1YsSUFBSSxFQUFFLE1BQU07UUFDWixLQUFLLEVBQUUsUUFBUTtLQUNoQjtJQUNELFlBQVksRUFBRSxLQUFLO0NBQ3BCLENBQUM7QUFsQlMsd0JBQU0iLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY2xhc3MgQ29uZmlnIHtcbiAgc3RhdGljIHRpdGxlOiBzdHJpbmcgPSAnMTUgUHV6emxlJztcbiAgc3RhdGljIGlzRGV2OiBib29sZWFuID0gdHJ1ZTtcbiAgc3RhdGljIGRiRmlsZTogc3RyaW5nID0gJ2hpZ2hzY29yZS5kYic7XG4gIHN0YXRpYyBkZWZhdWx0TGV2ZWw6IG51bWJlciA9IDE7XG4gIHN0YXRpYyB0cmFuc2l0aW9uV2l0aG91dEhpc3Rvcnk6IE9iamVjdCA9IHtcbiAgICB0cmFuc2l0aW9uOiB7XG4gICAgICBuYW1lOiBcImZsaXBcIixcbiAgICAgIGN1cnZlOiBcImxpbmVhclwiXG4gICAgfSxcbiAgICBjbGVhckhpc3Rvcnk6IHRydWVcbiAgfTtcbiAgc3RhdGljIHRyYW5zaXRpb25XaXRoSGlzdG9yeTogT2JqZWN0ID0ge1xuICAgIHRyYW5zaXRpb246IHtcbiAgICAgIG5hbWU6IFwiZmxpcFwiLFxuICAgICAgY3VydmU6IFwibGluZWFyXCJcbiAgICB9LFxuICAgIGNsZWFySGlzdG9yeTogZmFsc2VcbiAgfTtcblxufVxuIl19