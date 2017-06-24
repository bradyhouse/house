(function (app, $, undefined) {
    "use strict";

    app.removeKFromList = (l, k) => {
      l = JSON.stringify(l).slice(1,-1).replace('"','').split(`,`);

      if (l && l.length > 0 && k >= 0) {
          return (l.filter((n) => {
            return n !== (k+"") ? true : false;
        })).map(Number);
      }

      return [];

    }

  $(document).ready(function () {
    let fiddle = document.getElementById('fiddleHook');
    fiddle.innerHTML = '<pre> removeKFromList = ' + app.removeKFromList.toString() + '</pre>' +

      '<hr>' +
      '<h4>Test 1: removeKFromList([3, 1, 2, 3, 4, 5], 3):</h4>' +
      '<pre>' + JSON.stringify(app.removeKFromList([3, 1, 2, 3, 4, 5], 3)) +'</pre>' ;







  });

})(window.app = window.app || {}, jQuery)
