(function (undefined) {
    "use strict";

    this.metadata = {
        fiddleHeader: 'Rx - fiddle-0007-OnErrorHandler',
        urls: {
            github: 'https://github.com/bradyhouse/house/tree/master/fiddles/rxjs/fiddle-0007-OnErrorHandler',
        },
        consoleTag: 'H O U S E ~ f i d d l e s'
    };


    this.getJSON = function(arr) {
        return Rx.Observable.from(arr).map(function(str) {
            var parsedJSON = JSON.parse(str);
            return parsedJSON;
        });
    };

    this.getJSON([
      '{ "_id": 5519c4bac66c1b41b108c655", "checkingBalance": "-$39,084.92", "savingsBalance": "$826,240.37" }'
      ]).subscribe(
      function(json) {
          d3.select("div#target").text(json);
      },
      function(err) {
          d3.select("div#target").text(err);
      }
    );


    console.log("%c" + metadata.consoleTag, 'font-style: italic; font-size: 20px;');
    console.log("%c" + metadata.urls.github, "color: blue; font-style: italic; text-decoration: underline; background-color: #FFFF00;");
    console.group();

}.call(this));

