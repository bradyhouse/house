(function (undefined) {
    "use strict";

    this.metadata = {
        fiddleHeader: 'Rx - {{FiddleName}}',
        urls: {
            github: 'https://github.com/bradyhouse/house/tree/master/fiddles/rxjs/{{FiddleName}}',
            data: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/297733/data.json"
        },
        consoleTag: 'H O U S E ~ f i d d l e s'
    };


    this.request = function (url) {
        return Rx.Observable.create(function (observer) {
            var req = new XMLHttpRequest();
            req.open('GET', url);
            req.onload = function () {
                if (req.status == 200) {
                    observer.onNext(req.response);
                    observer.onCompleted();
                } else {
                    observer.onError(req.statusText);
                }
            }
            req.onerror = function () {
                observer.onError(new Error("Unkown Error"));
            }
            req.send();
        });
    };

    this.start = this.request(this.metadata.urls.data);

    this.start.subscribe(
        function onNext(res) {
            console.log(res);
            d3.select("p#target")
                .text(res);
        },
        function onError(err) {
            console.log(err);
            d3.select("p#target")
                .text(err);
        },
        function onCompleted() {
            console.log('request complete');
        }
    );

    console.log("%c" + meta.consoleTag, 'font-style: italic; font-size: 20px;');
    console.log("%c" + meta.urls.github, "color: blue; font-style: italic; text-decoration: underline; background-color: #FFFF00;");
    console.group();

}.call(this));

