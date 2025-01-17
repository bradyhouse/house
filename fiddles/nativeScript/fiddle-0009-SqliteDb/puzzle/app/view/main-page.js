var dbConnect = require("../shared/db.service").open,
  dbSelect = require("../shared/db.service").select,
  frame = require("ui/frame"),
  levels = require("../shared/levels"),
  dbConnect = require("../shared/db.service").open,
  dbSelectLevel = require("../shared/db.service").selectLevel,
  application = require("application"),
  page;

function onPageLoaded(args) {
  page = args.object;
  page.bindingContext = {
    title: application.title,
    highscoreVisibility: "collapsed"
  };

  dbConnect(function(db) {
    if (db) {
      dbSelect(db, function(data) {
        if (data && data.length) {
          page.bindingContext = {
            title: application.title,
            highscoreVisibility: "visible"
          }
        }
      }, page);
    }
  }, page);

}

function onPlayTap(args) {
  screen = levels[1];
  dbConnect(function(db) {
    if (db) {
      dbSelectLevel(db, function(level) {
        var currentLevel = level[0].level;
        if (currentLevel && levels[currentLevel]) {
          frame.topmost().navigate(levels[currentLevel]);
        }
      }, levels)
    } else {
      frame.topmost(screen);
    }
  }, levels);
}

function onAboutTap() {
  frame.topmost().navigate('view/about/about');
}

function onHighScoreTap() {
  frame.topmost().navigate('view/high-score/high-score');
}

exports.pageLoaded = onPageLoaded;
exports.playTap = onPlayTap;
exports.aboutTap = onAboutTap;
exports.highScoreTap = onHighScoreTap;
