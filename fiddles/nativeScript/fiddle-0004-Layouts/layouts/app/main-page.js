/***********************************************************************************
 * (c) 2015, Nathanael Anderson
 * Licensed under the MIT license
 *
 * Version 1.0.0                                       Nathan@master-technology.com
 **********************************************************************************/
"use strict";

var frame = require('ui/frame');
var Dialogs = require('ui/dialogs');
var Observable = require('data/observable').Observable;

// This page is not actually displayed by itself, because their is a .port and an .land version of this page
// that gets loaded and ran, those specific pages include this page so the code only resides in one location.

// Track our color Switch element
var colorSwitch;

// This is used to show you which javascript file was loaded and is running.
var pageSource = new Observable();
pageSource.set('source', 'mainpage.js');
exports.pageSource = pageSource;

exports.pageLoaded = function(args) {
    var page = args.object;
    page.bindingContext = pageSource;
    colorSwitch = page.getViewById('Color');
};

exports.wrap = function() {
    var color = !colorSwitch.checked;
    if (color) {
        frame.topmost().navigate('wrap-layout');
    } else {
        frame.topmost().navigate('wrap-layout-bw');
    }
};

exports.grid = function() {
    var color = !colorSwitch.checked;
    if (color) {
        frame.topmost().navigate('grid-layout');
    } else {
        frame.topmost().navigate('grid-layout-bw');
    }
};
exports.dock = function() {
    var color = !colorSwitch.checked;
    if (color) {
        frame.topmost().navigate('dock-layout');
    } else {
        frame.topmost().navigate('dock-layout-bw');
    }
};
exports.absolute = function() {
    var color = !colorSwitch.checked;
    if (color) {
        frame.topmost().navigate('absolute-layout');
    } else {
        frame.topmost().navigate('absolute-layout-bw');
    }
};
exports.stackH = function() {
    var color = !colorSwitch.checked;
    if (color) {
        frame.topmost().navigate('stack-h-layout');
    } else {
        frame.topmost().navigate('stack-h-layout-bw');
    }
};
exports.stackV = function() {
    var color = !colorSwitch.checked;
    if (color) {
        frame.topmost().navigate('stack-v-layout');
    } else {
        frame.topmost().navigate('stack-v-layout-bw');
    }
};

exports.dialogs = function() {
    Dialogs.alert("Sample Dialog, only a message is set").then(function() {
        return Dialogs.alert({title: "My Alert Title", message: "My Message", okButtonText: "Click me!"});
    }).then(function() {
        return Dialogs.confirm({title: "My Confirm Title", message: "My Message", okButtonText: "Ok Button!", cancelButtonText: "Cancel Me"});
    }).then(function() {
        return Dialogs.prompt({title: "My Prompt Title", message: "My Prompt Message", defaultText: "Default Text", okButtonText: "Ok Button!", cancelButtonText: "Cancel Me"});
    }).then(function() {
        return Dialogs.login({userName: "Username", password: "password", title: "My Login Title", message: "My Login Message", okButtonText: "Ok Button!", cancelButtonText: "Cancel Me"});
    }).then(function() {
        return Dialogs.action({title: "My Action Title", message: "My Action Message", cancelButtonText: "Cancel Me", actions: ["Apple", "Orange", "Grape"]});
    });
};