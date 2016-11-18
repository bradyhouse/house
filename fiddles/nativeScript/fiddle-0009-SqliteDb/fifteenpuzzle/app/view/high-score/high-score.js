const application = require("application"),
  ObservableArray = require("data/observable-array").ObservableArray,
  frame = require("ui/frame"),
  Dialogs = require("ui/dialogs");

var dbConnect = require("../../shared/db.service").open,
  dbSelect = require("../../shared/db.service").select,
  dbDelete = require("../../shared/db.service").delete,
  completeLevel = require("../../shared/main-view-model").completeLevel,
  page = null,
  subTitle = " - High Scores",
  data = new ObservableArray();


function onPageLoaded(args) {
  console.log('onPageLoaded');
  page = args.object;
  var displayTitle = application.title + subTitle;
  dbConnect(function(db) {
    if (db) {
      dbSelect(db, function(data) {
        page.bindingContext = {
          highscores: data,
          title: displayTitle
        };
      }, page);
    }
  }, page);
}



function onHighScore() {
  var navigationEntry = {
    moduleName: "view/high-score/add-high-score/add-high-score",
    context: {
      moves: 43,
      level: 1,
      callingModuleName: "view/high-score/high-score"
    },
    animated: false
  };
  frame.topmost().navigate(navigationEntry);
}

function onAddButtonTap() {
  onHighScore();
}

function onScreenReload() {
  frame.topmost().navigate("view/high-score/high-score");
}

function onResetButtonTap() {
  Dialogs.confirm("Are you sure you want delete all high scores?").then(function (result) {
    if(result) {
      completeLevel(0, function(level) {
        console.log("level reset to " + level);
        dbConnect(function(db) {
          dbDelete(db, function() {
            onScreenReload();
          });
        });
      }, frame);
    }
  });
}




exports.pageLoaded = onPageLoaded;
exports.addButtonTap = onAddButtonTap;
exports.resetButtonTap = onResetButtonTap;


