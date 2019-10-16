(function (app, $, undefined) {
  "use strict";

  app.isBeautifulString = function (inputString) {
    console.log(inputString);
    var alphabet = String('abcdefghijklmnopqrstuvwxyz').split(''),
      occurrences = 0,
      prevOccurrences = 0,
      regs = {
          a: /a/g,
          b: /b/g,
          c: /c/g,
          d: /d/g,
          e: /e/g,
          f: /f/g,
          g: /g/g,
          h: /h/g,
          i: /i/g,
          j: /j/g,
          k: /k/g,
          l: /l/g,
          m: /m/g,
          n: /n/g,
          o: /o/g,
          p: /p/g,
          q: /q/g,
          r: /r/g,
          s: /s/g,
          t: /t/g,
          u: /u/g,
          v: /v/g,
          w: /w/g,
          x: /x/g,
          y: /y/g,
          z: /z/g
      },
      i = 0,
      ii = i + 1,
      rc = true,
      reg = regs['a'],
      nextReg = regs['b'];

    if (reg.test(inputString)) {
      while(occurrences <= prevOccurrences && i < alphabet.length && rc === true) {
        var l = alphabet[i],
          ll = ii < alphabet.length ? alphabet[ii] : null,
          reg = new RegExp(regs[l]),
          nextReg = ll ? new RegExp(regs[ll]) : null;

        if (reg.test(inputString) === true) {
          if (l=='a') {
            prevOccurrences = inputString.match(reg).length;
            occurrences = inputString.match(reg).length;
          } else {
            prevOccurrences = occurrences;
            occurrences = inputString.match(reg).length;
            console.log('l = ' + l);
            console.log('prev = ' + prevOccurrences);
            console.log('occ = ' + occurrences);
            if (occurrences > prevOccurrences) {
              rc = false;
            }
          }
          inputString = inputString.replace(reg, '');
          console.log('inputString = ' + inputString);
          if (inputString && inputString.length > 0 && nextReg) {
            if (!nextReg.test(inputString)){
              rc = false;
            }
          }
        }
        i++;
        ii++;
      }
    } else {
      return false;
    }





    return rc;

  }


  $(document).ready(function () {
    let fiddle = document.getElementById('fiddleHook');
    fiddle.innerHTML = '<pre>variableName = ' + app.isBeautifulString.toString() + '</pre>' +
      '<hr>' +
      '<h4>Test 2: isBeautifulString("abcdefghijklmnopqrstuvwxy"):</h4>' +
      '<pre>' + JSON.stringify(app.isBeautifulString('abcdefghijklmnopqrstuvwxy')) +'</pre>';
  });
})(window.app = window.app || {}, jQuery)
