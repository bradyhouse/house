var system = require('system');
var url = system.args[1];
var page = require('webpage').create();
page.open(url, function(status) {
	if ( status === "success" ) {
		var data = page.evaluate(function() {
            return {
                title: document.title,
                numberOfNodes: document.getElementsByTagName('*').length,
                documentUrl: document.URL
            };
        });
        console.log('Page stats');
        console.log('---------------------------------------------------');
        console.log('Title          :' + data.title);
        console.log('URL            :' + data.documentUrl);
        console.log('Number of Nodes:' + data.numberOfNodes);
        console.log('---------------------------------------------------');
        phantom.exit(0);
	} else {
		console.log("Page failed to load");
		phantom.exit(1);
	}
});
