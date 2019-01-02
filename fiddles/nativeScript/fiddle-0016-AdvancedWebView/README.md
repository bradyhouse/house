fiddle-0016-AdvancedWebView
======

### Title

Advanced Web View Plugin


![iOS](https://i.imgur.com/YqQuk6r.gifv)


### Creation Date

12-27-18


### Location

Chicago, IL


### Issue

[Issue 277](https://github.com/bradyhouse/house/issues/277)


### Description

Okay, so why doesn't google authentication work when initiated from a web page loaded in a standard web view control?  
Google returns a `disallowed_useragent...` error.  Fortunately, there is a plug-in for that => 
[nativescript-advanced-webview](https://github.com/bradmartin/nativescript-advanced-webview). Riddle me a fiddle.

__Note, there is an additional twist here.  The app should start by loading a static web page displaying a loader 
animation.  After several seconds to simulate background processing, it should then open an external website having a 
link that requires google authentication. The packaged demo (aka example app), just uses a simple button tap event.__


### Pre-Requisite

*   A Mac loaded XCode and NativeScript
*   Mobile Test Device


### Use Case

1.  On your (android or iphone) device install `NativeScript Playground` and `NativeScript Preview`
2.  Using your terminal app of choice, complete the [Bash Setup Procedure](https://github.com/bradyhouse/house/wiki/Setup-(Mac-OS))
3.  Startup the POC `fiddle start nativescript 0016`
4.  On your test device, launch `NativeScript Playground`
5.  Scan the QR Code visible in the terminal output (3)


### Tags

{N}, nativescript, advanced-webview, google, authentication
