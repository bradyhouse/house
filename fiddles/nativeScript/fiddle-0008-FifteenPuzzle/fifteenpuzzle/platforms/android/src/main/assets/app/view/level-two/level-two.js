var createViewModel = require("../../shared/main-view-model").createViewModel;
var frame = require('ui/frame');

function onButtonClick(args) {
  console.log('onButtonClick');
  console.log(args);
}

exports.onButtonClick = onButtonClick;

