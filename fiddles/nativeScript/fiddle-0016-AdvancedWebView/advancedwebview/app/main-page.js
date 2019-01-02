const Observable = require('tns-core-modules/data/observable').Observable,
  advancedWebView = require('nativescript-advanced-webview'),
  gestures = require('tns-core-modules/ui/gestures');

let startingUrl = 'https://www.312area.com',
  page = null,
  wbv = null,
  grid = null;


function onPageLoaded(args) {

  if (!page) {
    page = args.object;
    const vm = new Observable();
    vm.set('startingUrl', startingUrl);
    page.bindingContext = vm;
    wbv = page.getViewById('webView');
    grid = page.getViewById('gridLayout');
    grid.on(gestures.GestureTypes.swipe, (args) => {
      console.log('Swipe Direction: ' + args.direction);
      switch (args.direction) {
        case 1:
          return onGoBack();
        case 2:
          return onGoForward();
      }
    });
  }
}

function onLoadStarted(args) {
  console.log('onLoadStarted');
  console.log('args.url = ' + args.url);
  let targetUrl = args.url;
  if (args.url.indexOf('oauth2') !== -1) {
    setTimeout(() => {
      wbv.goBack();
    }, 500);
    googleAuthenticate(targetUrl, wbv, startingUrl);

  }
}

function onGoBack() {
  console.log('onGoBack');
  if (wbv && wbv.canGoBack) {
    wbv.goBack();
  }
}

function onGoForward() {
  console.log('onGoForward');
  if (wbv && wbv.canGoForward) {
    wbv.goForward();
  }
}

function googleAuthenticate(url, webView, closeUrl) {
  try {
    let opt = {
      url: url,
      showTitle: false,
      toolbarColor: 'black',
      toolbarControlsColor: 'white',
      isClosed: closed => {
        console.log('isClosed');
        webView.src = closeUrl;
      }
    };
    advancedWebView.openAdvancedUrl(opt);
  }
  catch (error) {
    console.log(error);
  }
}

exports.onPageLoaded = onPageLoaded;
exports.onLoadStarted = onLoadStarted;
