(function (undefined) {
    "use strict";

    this.text = '';

    this.metadata = {
        fiddleHeader: 'Rx - fiddle-0005-ScanOperator',
        urls: {
            github: 'https://github.com/bradyhouse/house/tree/master/fiddles/rxjs/fiddle-0005-ScanOperator',
        },
        consoleTag: 'H O U S E ~ f i d d l e s'
    };


    this.avg = Rx.Observable.interval(10)
      .scan(function(prev,cur) {
        return {
            sum: prev.sum + cur,
            count: prev.count + 1
        };
      }, {sum: 0, count: 0})
      .map(function(o) {
        return o.sum / o.count;
      });


    this.avg.subscribe(function(x) {
        if (x) {
            this.text += ' ' + x;
            d3.select("div#target").text(this.text);
            window.scrollTo(0,document.body.scrollHeight);
        }
    }, this);


    console.log("%c" + metadata.consoleTag, 'font-style: italic; font-size: 20px;');
    console.log("%c" + metadata.urls.github, "color: blue; font-style: italic; text-decoration: underline; background-color: #FFFF00;");
    console.group();

}.call(this));

