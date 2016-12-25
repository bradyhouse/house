var application = require("application"),
  page = null;


function onPageLoaded(args) {
  page = args.object;
  page.bindingContext = {
    "title": application.title + " - About"
  };
}


exports.pageLoaded = onPageLoaded;