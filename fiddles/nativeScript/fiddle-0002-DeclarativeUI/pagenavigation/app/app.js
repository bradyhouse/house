var application = require("application");
application.mainModule = "main-page";
application.cssFile = "./app.css";

application.on("suspend", function(event) {
  console.log("Hey, I was suspended � I thought I was your favorite app! ");
});
application.on("resume", function(event) {
  console.log(" Awesome, we are back! ");
});

application.start();
