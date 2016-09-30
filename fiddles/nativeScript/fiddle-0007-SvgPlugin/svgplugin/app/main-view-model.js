var Observable = require("data/observable").Observable;
var SVG = require("nativescript-svg");
var svgParser = new SVG.ImageSourceSVG();

var path = '~/images/circle.svg';


function getMessage(counter) {
    if (counter <= 0) {
        return "Hoorraaay! You unlocked the NativeScript clicker achievement!";
    } else {
        return counter + " taps left";
    }
}

function createViewModel() {
    var loaded = svgParser.loadFromFile(path);
    var viewModel = new Observable();
    return viewModel;
}

exports.createViewModel = createViewModel;
