"use strict";
var application = require("application");
var platform = require("platform");
var utils = require("utils/utils");
function setStatusBarColors() {
    // Make the iOS status bar transparent with white text.
    // See https://github.com/burkeholland/nativescript-statusbar/issues/2
    // for details on the technique used.
    if (application.ios) {
        var AppDelegate = UIResponder.extend({
            applicationDidFinishLaunchingWithOptions: function () {
                utils.ios.getter(UIApplication, UIApplication.sharedApplication).statusBarStyle = UIStatusBarStyle.LightContent;
                return true;
            }
        }, {
            name: "AppDelegate",
            protocols: [UIApplicationDelegate]
        });
        application.ios.delegate = AppDelegate;
    }
    // Make the Android status bar transparent.
    // See http://bradmartin.net/2016/03/10/fullscreen-and-navigation-bar-color-in-a-nativescript-android-app/
    // for details on the technique used.
    if (application.android) {
        application.android.onActivityStarted = function () {
            if (application.android && platform.device.sdkVersion >= "21") {
                var View = android.view.View;
                var window_1 = application.android.startActivity.getWindow();
                window_1.setStatusBarColor(0x000000);
                var decorView = window_1.getDecorView();
                decorView.setSystemUiVisibility(View.SYSTEM_UI_FLAG_LAYOUT_STABLE
                    | View.SYSTEM_UI_FLAG_LAYOUT_HIDE_NAVIGATION
                    | View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN
                    | View.SYSTEM_UI_FLAG_IMMERSIVE_STICKY);
            }
        };
    }
}
exports.setStatusBarColors = setStatusBarColors;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhdHVzLWJhci11dGlsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic3RhdHVzLWJhci11dGlsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSx5Q0FBMkM7QUFDM0MsbUNBQXFDO0FBQ3JDLG1DQUFxQztBQVFyQztJQUNFLHVEQUF1RDtJQUN2RCxzRUFBc0U7SUFDdEUscUNBQXFDO0lBQ3JDLEVBQUUsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ3BCLElBQUksV0FBVyxHQUFHLFdBQVcsQ0FBQyxNQUFNLENBQUM7WUFDbkMsd0NBQXdDLEVBQUU7Z0JBQ3hDLEtBQUssQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLGFBQWEsRUFBRSxhQUFhLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxjQUFjLEdBQUcsZ0JBQWdCLENBQUMsWUFBWSxDQUFDO2dCQUNoSCxNQUFNLENBQUMsSUFBSSxDQUFDO1lBQ2QsQ0FBQztTQUNGLEVBQUU7WUFDQyxJQUFJLEVBQUUsYUFBYTtZQUNuQixTQUFTLEVBQUUsQ0FBQyxxQkFBcUIsQ0FBQztTQUNuQyxDQUFDLENBQUM7UUFDTCxXQUFXLENBQUMsR0FBRyxDQUFDLFFBQVEsR0FBRyxXQUFXLENBQUM7SUFDekMsQ0FBQztJQUVELDJDQUEyQztJQUMzQywwR0FBMEc7SUFDMUcscUNBQXFDO0lBQ3JDLEVBQUUsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1FBQ3hCLFdBQVcsQ0FBQyxPQUFPLENBQUMsaUJBQWlCLEdBQUc7WUFDdEMsRUFBRSxDQUFDLENBQUMsV0FBVyxDQUFDLE9BQU8sSUFBSSxRQUFRLENBQUMsTUFBTSxDQUFDLFVBQVUsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDO2dCQUM5RCxJQUFJLElBQUksR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztnQkFDN0IsSUFBSSxRQUFNLEdBQUcsV0FBVyxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsU0FBUyxFQUFFLENBQUM7Z0JBQzNELFFBQU0sQ0FBQyxpQkFBaUIsQ0FBQyxRQUFRLENBQUMsQ0FBQztnQkFFbkMsSUFBSSxTQUFTLEdBQUcsUUFBTSxDQUFDLFlBQVksRUFBRSxDQUFDO2dCQUN0QyxTQUFTLENBQUMscUJBQXFCLENBQzdCLElBQUksQ0FBQyw0QkFBNEI7c0JBQy9CLElBQUksQ0FBQyxxQ0FBcUM7c0JBQzFDLElBQUksQ0FBQyxnQ0FBZ0M7c0JBQ3JDLElBQUksQ0FBQywrQkFBK0IsQ0FBQyxDQUFDO1lBQzVDLENBQUM7UUFDSCxDQUFDLENBQUM7SUFDSixDQUFDO0FBQ0gsQ0FBQztBQXBDRCxnREFvQ0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBhcHBsaWNhdGlvbiBmcm9tIFwiYXBwbGljYXRpb25cIjtcbmltcG9ydCAqIGFzIHBsYXRmb3JtIGZyb20gXCJwbGF0Zm9ybVwiO1xuaW1wb3J0ICogYXMgdXRpbHMgZnJvbSBcInV0aWxzL3V0aWxzXCI7XG5cbmRlY2xhcmUgdmFyIGFuZHJvaWQ6IGFueTtcbmRlY2xhcmUgdmFyIFVJUmVzcG9uZGVyOiBhbnk7XG5kZWNsYXJlIHZhciBVSVN0YXR1c0JhclN0eWxlOiBhbnk7XG5kZWNsYXJlIHZhciBVSUFwcGxpY2F0aW9uOiBhbnk7XG5kZWNsYXJlIHZhciBVSUFwcGxpY2F0aW9uRGVsZWdhdGU6IGFueTtcblxuZXhwb3J0IGZ1bmN0aW9uIHNldFN0YXR1c0JhckNvbG9ycygpIHtcbiAgLy8gTWFrZSB0aGUgaU9TIHN0YXR1cyBiYXIgdHJhbnNwYXJlbnQgd2l0aCB3aGl0ZSB0ZXh0LlxuICAvLyBTZWUgaHR0cHM6Ly9naXRodWIuY29tL2J1cmtlaG9sbGFuZC9uYXRpdmVzY3JpcHQtc3RhdHVzYmFyL2lzc3Vlcy8yXG4gIC8vIGZvciBkZXRhaWxzIG9uIHRoZSB0ZWNobmlxdWUgdXNlZC5cbiAgaWYgKGFwcGxpY2F0aW9uLmlvcykge1xuICAgIGxldCBBcHBEZWxlZ2F0ZSA9IFVJUmVzcG9uZGVyLmV4dGVuZCh7XG4gICAgICBhcHBsaWNhdGlvbkRpZEZpbmlzaExhdW5jaGluZ1dpdGhPcHRpb25zOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdXRpbHMuaW9zLmdldHRlcihVSUFwcGxpY2F0aW9uLCBVSUFwcGxpY2F0aW9uLnNoYXJlZEFwcGxpY2F0aW9uKS5zdGF0dXNCYXJTdHlsZSA9IFVJU3RhdHVzQmFyU3R5bGUuTGlnaHRDb250ZW50O1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICB9LCB7XG4gICAgICAgIG5hbWU6IFwiQXBwRGVsZWdhdGVcIixcbiAgICAgICAgcHJvdG9jb2xzOiBbVUlBcHBsaWNhdGlvbkRlbGVnYXRlXVxuICAgICAgfSk7XG4gICAgYXBwbGljYXRpb24uaW9zLmRlbGVnYXRlID0gQXBwRGVsZWdhdGU7XG4gIH1cblxuICAvLyBNYWtlIHRoZSBBbmRyb2lkIHN0YXR1cyBiYXIgdHJhbnNwYXJlbnQuXG4gIC8vIFNlZSBodHRwOi8vYnJhZG1hcnRpbi5uZXQvMjAxNi8wMy8xMC9mdWxsc2NyZWVuLWFuZC1uYXZpZ2F0aW9uLWJhci1jb2xvci1pbi1hLW5hdGl2ZXNjcmlwdC1hbmRyb2lkLWFwcC9cbiAgLy8gZm9yIGRldGFpbHMgb24gdGhlIHRlY2huaXF1ZSB1c2VkLlxuICBpZiAoYXBwbGljYXRpb24uYW5kcm9pZCkge1xuICAgIGFwcGxpY2F0aW9uLmFuZHJvaWQub25BY3Rpdml0eVN0YXJ0ZWQgPSBmdW5jdGlvbigpIHtcbiAgICAgIGlmIChhcHBsaWNhdGlvbi5hbmRyb2lkICYmIHBsYXRmb3JtLmRldmljZS5zZGtWZXJzaW9uID49IFwiMjFcIikge1xuICAgICAgICBsZXQgVmlldyA9IGFuZHJvaWQudmlldy5WaWV3O1xuICAgICAgICBsZXQgd2luZG93ID0gYXBwbGljYXRpb24uYW5kcm9pZC5zdGFydEFjdGl2aXR5LmdldFdpbmRvdygpO1xuICAgICAgICB3aW5kb3cuc2V0U3RhdHVzQmFyQ29sb3IoMHgwMDAwMDApO1xuXG4gICAgICAgIGxldCBkZWNvclZpZXcgPSB3aW5kb3cuZ2V0RGVjb3JWaWV3KCk7XG4gICAgICAgIGRlY29yVmlldy5zZXRTeXN0ZW1VaVZpc2liaWxpdHkoXG4gICAgICAgICAgVmlldy5TWVNURU1fVUlfRkxBR19MQVlPVVRfU1RBQkxFXG4gICAgICAgICAgfCBWaWV3LlNZU1RFTV9VSV9GTEFHX0xBWU9VVF9ISURFX05BVklHQVRJT05cbiAgICAgICAgICB8IFZpZXcuU1lTVEVNX1VJX0ZMQUdfTEFZT1VUX0ZVTExTQ1JFRU5cbiAgICAgICAgICB8IFZpZXcuU1lTVEVNX1VJX0ZMQUdfSU1NRVJTSVZFX1NUSUNLWSk7XG4gICAgICB9XG4gICAgfTtcbiAgfVxufVxuIl19