(function (undefined) {
    "use strict";

    this.metadata = {
        fiddleHeader: 'Rx - fiddle-0003-Disposable',
        urls: {
            github: 'https://github.com/bradyhouse/house/tree/master/fiddles/rxjs/fiddle-0003-Disposable',
            data: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/297733/data.json"
        },
        consoleTag: 'H O U S E ~ f i d d l e s'
    };


    let counter = Rx.Observable.interval(1000);


    let subscription1 = counter.subscribe(function(i) {
        d3.select("div#subscription1")
            .text('Subscription 1: ' + i);
    });

    let subscription2 = counter.subscribe(function(i) {
        d3.select("div#subscription2")
            .text('Subscription 2:  ' + i);
    });


    setTimeout(function() {
        d3.select("div#subscription2")
            .text('Subscription 2: Stopped!');
        subscription2.dispose();
    }, 5000);


    console.log("%c" + metadata.consoleTag, 'font-style: italic; font-size: 20px;');
    console.log("%c" + metadata.urls.github, "color: blue; font-style: italic; text-decoration: underline; background-color: #FFFF00;");
    console.group();

}.call(this));

