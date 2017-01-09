(function (undefined) {
  "use strict";

  this.metadata = {
    fiddleHeader: 'Rx - fiddle-0006-FlatMap',
    urls: {
      github: 'https://github.com/bradyhouse/house/tree/master/fiddles/rxjs/fiddle-0006-FlatMap',
      data: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/297733/data.json"
    },
    consoleTag: 'H O U S E ~ f i d d l e s'
  };


  var results = document.getElementById('results'),
    showHTML = function (html) {
      results.insertAdjacentHTML('beforeend', html);
    },
    show = function (text, obj) {
      showHTML("<p>" + text + (obj !== undefined ? ': ' + JSON.stringify(obj) : '') + "<p>");
    },
    showObject = function (obj) {
      show("<p>" + JSON.stringify(obj) + "<p>");
    },
    button1 = document.querySelector('#button1'),
    buttonClickStream = Rx.Observable.fromEvent(button1, 'click');


  buttonClickStream
    .flatMap(function (e, i) {
      return Rx.Observable
        .interval(1000).take(5)
        .flatMap(function (x, j) {
          return Rx.Observable.of(i + ' ' + j)
        });
    })
    .subscribe(function (v) {
      show("Button 2", v)
    });


  console.log("%c" + metadata.consoleTag, 'font-style: italic; font-size: 20px;');
  console.log("%c" + metadata.urls.github, "color: blue; font-style: italic; text-decoration: underline; background-color: #FFFF00;");
  console.group();

}.call(this));

