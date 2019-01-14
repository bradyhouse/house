const Observable = require('tns-core-modules/data/observable').Observable,
      gestures = require('tns-core-modules/ui/gestures'),
      socialShare = require("nativescript-social-share"),
      frame = require('tns-core-modules/ui/frame'),
      webViewModule = require("tns-core-modules/ui/web-view"),
      platform = require('tns-core-modules/platform');

let page = null,
    wbv = null,
    grid = null,
    nav = null,
    url = null;


// region Page Bindings

function onPageLoaded(args) {

  if (!page) {
    _init(args);
  }

}

// endregion

// region WebView Bindings

function onLoadStarted(args) {
  console.log('onLoadStarted');
  console.log(args);
  url = args.url;
}

function onPageSwipe(args) {
  if (args && args.hasOwnProperty('direction')) {
    switch (args.direction) {
      case 1: //left
        return onGoBack();
      case 2: //right
        return onGoForward();
    }
  }
}

//endregion

//region Internal

function _init(args) {
  page = args.object;
  page.bindingContext = new Observable();
  wbv = page.getViewById('browser');
  grid = page.getViewById('body');
  nav = page.getViewById('bottomNavBar');

  if (wbv) {
    wbv.on(webViewModule.WebView.loadFinishedEvent, (args) => {
      if (args && args.hasOwnProperty('url')) {
        url = args.url;
      }
    });
  }

  if (grid) {
    grid.on(gestures.GestureTypes.swipe, onPageSwipe);
  }

  if (nav) {
    nav.backgroundColor = 'black';
    nav.activeColor = 'white';
    nav.inactiveColor = 'white';
    nav.on('tabPressed', (args) => {
      if(args && args.hasOwnProperty('index')) {
        switch (args.index) {
          case 0:
            return _onGoBack();
          case 1:
            return _onShare(url);
          case 2:
            return _onGoForward();
        }
      }
    })
  }

  if (platform.isIOS) {
    let navigationBar = frame.topmost().ios.controller.navigationBar;
    navigationBar.barStyle = UIBarStyle.UIBarStyleBlack;
    navigationBar.translucent = false;
    navigationBar.setBackgroundImageForBarMetrics(UIImage.new(), UIBarMetrics.Default);
    navigationBar.shadowImage = UIImage.new();
  }
}

function _onGoBack() {
  console.log('onGoBack');
  if (wbv && wbv.canGoBack) {
    wbv.goBack();
  }
}

function _onGoForward() {
  console.log('onGoForward');
  if (wbv && wbv.canGoForward) {
    wbv.goForward();
  }
}

function _onShare(url) {
  console.log('_onShare');
  return socialShare.shareUrl(url, 'Fiddle #18', '');
}

//endregion

//region Exports

exports.onPageLoaded = onPageLoaded;
exports.onLoadStarted = onLoadStarted;

// endregion