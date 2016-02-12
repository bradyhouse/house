var page = require('webpage').create(),
    system = require('system'),
    address = system.args[1] ? system.args[1] : null,
    filename = system.args[2] ? system.args[2] : null;

if (address && filename) {

    page.viewportSize = {width: '640px', height: '480px'};
    page.zoomFactor = .50;
    page.settings.localToRemoteUrlAccessEnabled = true;
    page.settings.resourceTimeout = 10000;
    page.settings.webSecurityEnabled = false;
    page.settings.userAgent = 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/37.0.2062.120 Safari/537.36';

    page.open(address, function (status) {
        if (status!='success') {
            console.log(status);
            phantom.exit();
        }
        window.setTimeout(function () {
            page.render(filename, {format: 'png', quality: '100'});
            phantom.exit();
        }, 10000);
    });

} else {
    console.log('Usage: screenshot.js URL filename');
    phantom.exit(1);
}



