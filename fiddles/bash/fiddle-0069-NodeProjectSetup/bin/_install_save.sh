#!/usr/bin/env bash

function npmInstallGulpDev() {
    log "$0" "npmInstallGulpDev";
    npm install --save-dev gulp;
}

function npmInstallGruntDev() {
    log "$0" "npmInstallGruntDev";
    npm install --save-dev grunt;
}

function tsdInstallJquery() {
    log "$0" "tsdInstallJquery";
    tsd install jquery --save;
}

function npmInstallGulpTypescript() {
    log "$0" "npmInstallGulpTypescript";
    npm install gulp-typescript --save-dev;
}

function npmInstallJquery() {
    log "$0" "npmInstallJquery";
    npm install jquery --save;
}

function bowerInstallJasmineDev() {
    log "$0" "bowerInstallJasmineDev";
    bower install jasmine --save-dev;
}

function npmInstallGulpTslintSaveDev() {
    log "$0" "npmInstallGulpTslintSaveDev";
    npm install gulp-tslint --save-dev;
}

function typingsInstallJquery() {
    log "$0" "typingsInstallJquery";
    typings install jquery --ambient --save;
}

function npmInstallBrowserifySaveDev() {
    log "$0" "npmInstallBrowserifySaveDev";
    npm install browserify --save-dev;
}

function npmInstallVinylTransformSaveDev() {
    log "$0" "npmInstallVinylTransformSaveDev";
    npm install vinyl-transform --save-dev;
}

function npmInstallGulpUglifySaveDev() {
    log "$0" "npmInstallGulpUglifySaveDev";
    npm install gulp-uglify --save-dev;
}

function npmInstallGulpSourceMapsSaveDev() {
    log "$0" "npmInstallGulpSourceMapsSaveDev";
    npm install gulp-sourcemaps --save-dev;
}

function npmInstallMochaSaveDev() {
    log "$0" "npmInstallMochaSaveDev";
    npm install mocha chai sinon --save-dev;
}

function npmInstallKarmaSaveDev() {
    log "$0" "npmInstallKarmaSaveDev";
    npm install karma karma-mocha karma-chai karma-sinon karma-coverage karma-phantomjs-launcher gulp-karma --save-dev;
}

function npmInstallBrowserSyncSaveDev() {
    log "$0" "npmInstallBrowserSync";
    npm install browser-sync --save-dev;
}
