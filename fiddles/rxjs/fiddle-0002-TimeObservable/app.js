(function (undefined) {
    "use strict";

    this.metadata = {
        fiddleHeader: 'Time Observable',
        urls: {
            github: 'https://github.com/bradyhouse/house/tree/master/fiddles/rxjs/fiddle-0002-TimeObservable',
        },
        consoleTag: 'H O U S E ~ f i d d l e s'
    };

    class Timer {
        constructor(fn, scope, args, ms) {
            this._fn = fn;
            this._scope = scope;
            this._args = args;
            this._ms = ms;
        }
        tick() {
            let me = this;
            return Rx.Observable.create(function (observer) {
                let onTimeout = function () {
                    try{
                        let res = me._fn(me._scope, me._args || []);
                        observer.onNext(res);
                        observer.onCompleted();
                    } catch (err) {
                        observer.onError(err);
                    }

                };
                window.setTimeout(onTimeout, me._ms);
            });
        }
    }

    this.seconds = 0;

    this.clock = new Timer(
        function (self) {
            return self.seconds += 1;
        },
        this, // scope
        null, // arguments
        1  // delay
    );

    this.tock = function () {
        var me = this;
        me.clock.tick().subscribe(
            function onNext(res) {
                let today = Date.now();
                me.step = res;

                d3.select("body")
                    .style("font-family", 'Courier, "Courier New"')
                    .style("text-align", 'center')
                    .style("background-color", '#0a001f')
                    .style("font-weight", '500')
                    .style("margin","0px")
                    .style("color", 'lime')
                    .style("vertical-align", "middle")
                    .style('font-size', function(d) {
                        let size = Math.ceil(50 * (window.innerWidth / window.innerHeight )) + 'px';
                        return size;
                    });
                d3.select("p#time")
                    .text(today);

            },
            function onError(err) {
                d3.select("p#target")
                    .append('div')
                    .text(err);

            },
            function onCompleted() {
                me.tock();
            }
        );
    };

    this.tock();

    console.log("%c" + metadata.consoleTag, 'font-style: italic; font-size: 20px;');
    console.log("%c" + metadata.urls.github, "color: blue; font-style: italic; text-decoration: underline; background-color: #FFFF00;");
    console.group();

}.call(this));

