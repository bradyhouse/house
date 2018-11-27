
var geolocation = require("nativescript-geolocation");

function onNavigatingTo(args) {
  var page = args.object;
  page.bindingContext = createViewModel();
  if (!enableLocationService()) {
    closeApp();
  }
}

function enableLocationService() {
  var rc = true;
  geolocation.isEnabled().then((isEnabled) => {
    if (!isEnabled) {
      geolocation.enableLocationRequest().then(() => {
      }, (e) => {
        console.log("Error: " + (e.message || e));
        rc = false;
      });
    }
  }, (e) => {
    console.log("Error: " + (e.message || e));
    rc = false;
   });
  return rc;
}

function closeApp() {
  animationSet.cancel();
  if (application.android) {
    android.os.Process.killProcess(android.os.Process.myPid());
  } else {
    exit(0);
  }
}


exports.onNavigatingTo = onNavigatingTo;

