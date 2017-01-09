(function (undefined) {
    "use strict";

    this.metadata = {
        fiddleHeader: 'Rx - fiddle-0004-SequenceReduce',
        urls: {
            github: 'https://github.com/bradyhouse/house/tree/master/fiddles/rxjs/fiddle-0004-SequenceReduce',
            data: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/297733/data.json"
        },
        consoleTag: 'H O U S E ~ f i d d l e s'
    };


    this.avg = Rx.Observable.range(0,5)
      .reduce(function(prev, cur) {
          return {
              sum: prev.sum +cur,
              count: prev.count + 1
          };
      }, {sum: 0, count: 0})
      .map(function(o) {
          return o.sum / o.count;
      });


    this.avg.subscribe(function(x) {
        d3.select("div#target")
          .text("Average of 0 to 5 is " + x);
    })


    console.log("%c" + metadata.consoleTag, 'font-style: italic; font-size: 20px;');
    console.log("%c" + metadata.urls.github, "color: blue; font-style: italic; text-decoration: underline; background-color: #FFFF00;");
    console.group();

}.call(this));

