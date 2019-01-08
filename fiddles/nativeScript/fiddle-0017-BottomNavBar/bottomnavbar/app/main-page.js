const Observable = require('tns-core-modules/data/observable').Observable,
      gestures = require('tns-core-modules/ui/gestures');

let page = null,
    wbv = null,
    grid = null,
    bar = null;


// region Page

function onPageLoaded(args) {

  if (!page) {
    page = args.object;
    const vm = new Observable();
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

// endregion

// region WebView

function onLoadStarted(args) {
  console.log('onLoadStarted');
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

//endregion

//region Bottom Navigation Bar

function onBottomNavigationLoaded(args) {
  console.log('onBottomNavigationLoaded');
  bar = args.object;

  if (bar) {
    bar.backgroundColor = 'black';
    bar.activeColor = 'white';
    bar.inactiveColor = 'white';
    bar.on('tabPressed', _onBottomNavigationTabPressed);
  }

}

function _onBottomNavigationTabPressed(args) {
  console.log('_onBottomNavigationTabPressed');
  console.log(args);
  if(args && args.hasOwnProperty('index')) {
    switch (args.index) {
      case 0:
        return onGoBack();
      case 1:
        return onGoForward();
    }
  }

}

//endregion


// region exports

exports.onPageLoaded = onPageLoaded;
exports.onLoadStarted = onLoadStarted;
exports.onBottomNavigationLoaded = onBottomNavigationLoaded;

// endregion