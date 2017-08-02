(function (app, $, undefined) {
    "use strict";

  app.variableName = function (name) {
    var isLowerCase = function(str) {
        return (/[a-z]/.test(str)) || str.split('').indexOf('_') !== -1;
      },
      containsSpecial = function(str){
        var re = /[~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/,
          matches = re.exec(str);
        return matches && matches.length > 0 ? true : false;
      },
      isNumeric = function(str) {
        return (/[0-9]/.test(str));
      },
      firstCharacter = name.slice(0,1);

    if (!isLowerCase(firstCharacter) || isNumeric(firstCharacter) || containsSpecial(name) || containsSpecial(firstCharacter)) {
      return false;
    }


    if(name.indexOf(' ') >= 0){
      return false;
    }

    if (!isNaN(name)) {
      return false;
    }

    try {
      eval('var ' + name + ' = true;');
      var str = String(name);
    } catch(err) {
      return false;
    }
    return true;

  }


  $(document).ready(function () {
    let fiddle = document.getElementById('fiddleHook');
    fiddle.innerHTML = '<pre>variableName = ' + app.variableName.toString() + '</pre>' +
      '<hr>' +
      '<h4>Test 9: variableName("_Aas_23"):</h4>' +
      '<pre>' + JSON.stringify(app.variableName('_Aas_23')) +'</pre>' +

      '<hr>' +
      '<h4>Test 10: variableName("a a_2"):</h4>' +
      '<pre>' + JSON.stringify(app.variableName('a a_2')) +'</pre>' +
      '<hr>' +
      '<h4>Test 11: variableName("0ss"):</h4>' +
      '<pre>' + JSON.stringify(app.variableName('0ss')) +'</pre>' +
        '<hr>' +

        '<h4>Test 12: variableName("&ss"):</h4>' +
        '<pre>' + JSON.stringify(app.variableName('&ss')) +'</pre>' +
          '<hr>' +

          '<h4>Test 13: variableName("s0s"):</h4>' +
          '<pre>' + JSON.stringify(app.variableName('s0s')) +'</pre>';
  });
})(window.app = window.app || {}, jQuery)
