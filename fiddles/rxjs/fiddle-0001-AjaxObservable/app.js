(function (app, $, undefined) {
    "use strict";

    app.request = function(url) {
        return Rx.Observable.create(function(observer){
            var req = new XMLHttpRequest();
            req.open('GET', url);
            req.onload = function() {
                if (req.status == 200) {
                    observer.onNext(req.response);
                    observer.onCompleted();
                } else {
                    observer.onError(req.statusText);
                }
            }
            req.onerror = function() {
                observer.onError(new Error("Unkown Error"));
            }
            req.send();
        });
    };

    app.start = app.request('data.json');

    app.start.subscribe(
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
    
})(window.app = window.app || {}, d3)
