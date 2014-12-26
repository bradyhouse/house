var page = require('webpage').create();
page.open('https://duckduckgo.com/', function(status) {
	if ( status === "success" ) {
		console.log(page.title);
	} else {
		console.log("Page failed to load.");
	}
	phantom.exit(0);
});
