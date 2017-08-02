(function (app, $, undefined) {
    "use strict";

  app.reverseParentheses = (prefix, s) => {

    var oParIndex = s.search(/[(]/g),
      oParIndexNext = 0,
      oParCount = oParIndex !== -1 ? s.split('(').length - 1 : 0,
      prevSeg = '',
      nextSeg = s,
      cParIndex = nextSeg.search(/[)]/g),
      cParIndexNext = 0,
      cParCount = cParIndex !== -1 ? s.split(')').length - 1 : 0,
      innerSeg = '',
      rcStr = '',
      i = 0;

    if (oParCount == 0 || cParCount == 0) {
      return s;
    }

    while(i < 100) {

      if (oParCount === 1 && cParCount === 1) {
        prevSeg = nextSeg.substring(0, oParIndex);
        innerSeg = nextSeg.substring(oParIndex + 1, cParIndex);
        nextSeg = nextSeg.substring(cParIndex + 1);
        rcStr = prevSeg + innerSeg.split('').reverse().join('') + nextSeg;
        i == 1000;
      }

      oParIndexNext = nextSeg.search(/[(]/g);
      cParIndexNext = nextSeg.search(/[)]/g);


      if (oParIndexNext === -1) {
        prevSeg += nextSeg.substring(0, oParIndex);
        innerSeg = nextSeg.substring(oParIndex + 1, cParIndex);
        nextSeg = nextSeg.substring(cParIndex + 1);
        nextSeg = prevSeg.substring(0, prevSeg.length - 1) + innerSeg.split('').reverse().join('') + nextSeg;
        prevSeg = '';
      } else {
        prevSeg += nextSeg.substring(0, oParIndex + 1);
        nextSeg = nextSeg.substring(oParIndex + 1);
      }


      oParIndex = nextSeg.search(/[(]/g);
      oParCount = oParIndex !== -1 ? nextSeg.split('(').length - 1 : 0;
      cParIndex = nextSeg.search(/[)]/g);
      cParCount = cParIndex !== -1 ? nextSeg.split(')').length - 1 : 0;
      innerSeg = '';

      i++;
    }
    return rcStr;

  };

  $(document).ready(function () {

    let fiddle = document.getElementById('fiddleHook');
    fiddle.innerHTML = '<pre>reverseParentheses = ' + app.reverseParentheses.toString() + '</pre>' +

      '<hr>' +
      '<h4>Test 1: reverseParentheses("a(bc)de"):</h4>' +
      '<pre>' + JSON.stringify(app.reverseParentheses('test1', 'a(bc)de')) +'</pre>' +

      '<hr>' +
      '<h4>Test 2: reverseParentheses("a(bcdefghijkl(mno)p)q"):</h4>' +
      '<pre>' + JSON.stringify(app.reverseParentheses('test2', 'a(bcdefghijkl(mno)p)q')) +'</pre>'+

      '<hr>' +
      '<h4>Test 3: reverseParentheses([1, 2, 1, 2]):</h4>' +
      '<pre>' + JSON.stringify(app.reverseParentheses('test3', [1, 2, 1, 2])) +'</pre>' +

      '<hr>' +
      '<h4>Test 5: reverseParentheses([10, 1, 2, 3, 4, 5]):</h4>' +
      '<pre>' + JSON.stringify(app.reverseParentheses('test5', [10, 1, 2, 3, 4, 5])) +'</pre>' +

      '<hr>' +
      '<h4>Test 6: reverseParentheses([1, 1, 1, 2, 3]):</h4>' +
      '<pre>' + JSON.stringify(app.reverseParentheses('test6', [1, 1, 1, 2, 3])) +'</pre>';



  });
})(window.app = window.app || {}, jQuery)
