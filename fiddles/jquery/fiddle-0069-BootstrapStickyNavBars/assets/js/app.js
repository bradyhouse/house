(function (app, $, undefined) {
  "use strict";

  class Screen {
    constructor (innerWidth, innerHeight, media) {
      this.innerWidth = innerWidth;
      this.innerHeight = innerHeight;
      this.device = media;
    }
  }


  app.view = app.view || {
    mapMedia: (width) => {
      if (width > 1400) {
        return 'landscape-jumbo';
      }
      if (width >= 992) {
        return 'landscape-large';
      }
      if (width >= 800) {
        return 'landscape-medium';
      }
      if (width >= 768) {
        return 'landscape-small';
      }
      if (width >= 615) {
        return 'landscape-tiny';
      }
      if (width >= 480) {
        return 'portrait-iphone-x';
      }
      return 'portrait-tiny';
    },

    updateDOM: () => {
      let screenState = document.getElementById('screenState'),
        screen = new Screen(window.innerWidth, window.innerHeight, window.app.view.mapMedia(window.innerWidth));
      screenState.innerText = JSON.stringify(screen);
    },
    configureObservers: () => {
      window.onresize = (event) => {
        console.log(event);
        window.app.view.updateDOM();
      };
    }
  };

  window.setTimeout(() => {
    app.view.configureObservers();
    app.view.updateDOM();
  }, 1000);

})(window.app = window.app || {}, window.jQuery);