// Add our Requires for the components we need on our page
var frame = require("ui/frame");
var Page = require("ui/page").Page;
var StackLayout = require("ui/layouts/stack-layout").StackLayout;
var Label = require("ui/label").Label;
var Button = require("ui/button").Button;

// Create our required function which NativeScript uses
// to build the page.
exports.createPage = function() {

  // Create our components for this page
  var page = new Page();
  var layout = new StackLayout();
  var welcomeLabel = new Label();
  var backButton = new Button();

  // Assign our page title
  page.actionBar.title = "Settings";

  // Setup our welcome label
  welcomeLabel.text = "You are now in Settings!";
  welcomeLabel.cssClass = "message";

  // Setup our Go Back button
  backButton.text = "Go Back";
  backButton.on("tap", function () {
    frame.topmost().goBack();
  });

  // Add our layout items to our StackLayout
  layout.addChild(welcomeLabel);
  layout.addChild(backButton);

  // Assign our layout to the page.
  page.content = layout;

  // Return our created page
  return page;
};
