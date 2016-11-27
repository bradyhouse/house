const frame = require("ui/frame"),
  Dialogs = require("ui/dialogs"),
  application = require("application");

var dbConnect = require("../../../shared/db.service").open,
  dbInsert = require("../../../shared/db.service").insert,
  dbNextId = require("../../../shared/db.service").nextId,
  dbSelectMin = require("../../../shared/db.service").selectMin,
  page = null,
  subTitle = " - Add High Score",
  newRecord = {
    id: null,
    user: null,
    time: null,
    moves: null,
    level: null
  },
  insertError = "An unknown error has occurred while attempting to record a new high score.",
  invalidInputsError = "The necessary input parameters were not supplied.",
  insertErrorDialogTitle = "D O H !!!",
  inputConfig = {
    nextId: null,
    level: null,
    moves: null,
    callingModuleName: null
  };

function closeScreen() {
  if (inputConfig.callingModuleName) {
    frame.topmost().navigate(inputConfig.callingModuleName);
  } else {
    frame.topmost().goBack();
  }
}

function gotoMainScreen() {
  frame.topmost().navigate("view/main-page");
}

function onInsertError() {
  Dialogs.alert({ title: insertErrorDialogTitle, message: insertError}).then(function() {
    closeScreen();
  });
}
2
function onInvalidInputError() {
  /*Dialogs.alert({ title: insertErrorDialogTitle, message: invalidInputsError}).then(function() {
    closeScreen();
  });*/
  gotoMainScreen();
}

function loadInputConfig(navigationContext) {
  if (navigationContext) {
    if (navigationContext.hasOwnProperty("moves")) {
      inputConfig.moves = navigationContext.moves;
      if (navigationContext.hasOwnProperty("level")) {
        inputConfig.level = navigationContext.level;
        if (navigationContext.hasOwnProperty("callingModuleName")) {
          inputConfig.callingModuleName = navigationContext.callingModuleName;
          return true;
        }
      }
    }
  }
  return false;
}

function onAddButtonTap(args) {
  var id = inputConfig.nextId,
    user = page.getViewById("user"),
    time = 'n/a',
    moves = inputConfig.moves,
    level = inputConfig.level;
  newRecord.id = id;
  newRecord.user = user.text;
  newRecord.time = time;
  newRecord.moves = moves;
  newRecord.level = level;
  dbConnect(function(db) {
    dbInsert(db, newRecord, function(highscore) {
      if (highscore) {
        closeScreen();
      } else {
        onInsertError();
      }
    }, frame);
  }, newRecord);
}

function onCancelButtonTap() {
  frame.topmost().navigate(inputConfig.callingModuleName);
}

function onPageLoaded(args) {
  page = args.object;
  var displayTitle = application.title + subTitle;

  if (loadInputConfig(page.navigationContext)) {
    dbConnect(function(db) {
      dbNextId(db, function(id) {
        inputConfig.nextId = id;
        dbSelectMin(db, inputConfig.level, function(data) {
          var minHighScore = data && data.hasOwnProperty("moves") ? data.moves : 0;
          if (minHighScore > 0) {
            if (minHighScore < inputConfig.moves) {
              page.bindingContext = {
                "level": inputConfig.level,
                "moves": inputConfig.moves,
                "title": displayTitle
              };
            } else {
              onInvalidInputError();
            }
          } else {
            page.bindingContext = {
              "level": inputConfig.level,
              "moves": inputConfig.moves,
              "title": displayTitle
            };
          }
        }, page);
      }, page);
    }, page);
  } else {
    frame.topmost().navigate("view/high-score/high-score");
  }
}

exports.cancelButtonTap = onCancelButtonTap;
exports.addButtonTap = onAddButtonTap;
exports.pageLoaded = onPageLoaded;