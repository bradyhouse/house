#!/usr/bin/env bash

function initFile() {
    groupLog "initFile";
    if [[ -e "karma.conf.js" ]]
    then
        rm -rf "karma.conf.js";
    fi
    touch "karma.conf.js";
}

function startModule() {
    groupLog "beginModule";
    echo -e "module.export = function (config) {" >> "karma.conf.js";
    echo -e "\t'use strict';" >> "karma.conf.js";
}

function endModule() {
    endLog "karma.conf.js added";
    echo -e "};" >> "karma.conf.js"
}

function startConfigSet() {
    groupLog "addConfigSet";
    echo -e "\tconfig.set({" >> "karma.conf.js";
}

function endConfigSet() {
    groupLog "endConfigSet";
    echo -e "\t});" >> "karma.conf.js";
}

function addBasePathConfig() {
    groupLog "addBasePathConfig";
    echo -e "\t\tbasePath: '', " >> "karma.conf.js";
}

function addFrameworksConfig() {
    groupLog "addFrameworksConfig";
    echo -e "\t\tframeworks: ['mocha', 'chai', 'sinon'], " >> "karma.conf.js"
}

function addBrowsersConfig() {
    groupLog "addBrowsersConfig";
    echo -e "\t\tbrowsers: ['PhantomJS'], " >> "karma.conf.js"
}

function addReportersConfig() {
    groupLog "addReportersConfig";
    echo -e "\t\treporters: ['progress', 'coverage'], " >> "karma.conf.js"
}

function addPluginsConfig() {
    groupLog "addPluginsConfig";
    echo -e "\t\tplugins: [ " >> "karma.conf.js"
    echo -e "\t\t\t'karma-coverage', " >> "karma.conf.js"
    echo -e "\t\t\t'karma-mocha', " >> "karma.conf.js"
    echo -e "\t\t\t'karma-chai', " >> "karma.conf.js"
    echo -e "\t\t\t'karma-sinon', " >> "karma.conf.js"
    echo -e "\t\t\t'karma-phantomjs-launcher' " >> "karma.conf.js"
    echo -e "\t\t], " >> "karma.conf.js"
}

function addPreprocessorsConfig() {
    groupLog "addPreprocessorsConfig";
    echo -e "\t\tpreprocessors: {" >> "karma.conf.js"
    echo -e "\t\t\t'./dist/test/*.test.js': ['coverage']" >> "karma.conf.js"
    echo -e "\t\t}," >> "karma.conf.js"
}

function addPortConfig() {
    groupLog "addPortConfig";
    echo -e "\t\tport: 9876, " >> "karma.conf.js"
}

function addColorsConfig() {
    groupLog "addColorsConfig";
    echo -e "\t\tcolors: true, " >> "karma.conf.js"
}

function addAutoWatchConfig() {
    groupLog "addAutoWatchConfig";
    echo -e "\t\tautoWatch: false, " >> "karma.conf.js"
}

function addSingleRunConfig() {
    groupLog "addSingleRunConfig";
    echo -e "\t\tsingleRun: false, " >> "karma.conf.js"
}

function addLogLevelConfig() {
    groupLog "addLogLevelConfig";
    echo -e "\t\tlogLevel: config.LOG_INFO " >> "karma.conf.js"
}

function addKarmaConf() {
    log "$0" "addKarmaConf";
    initFile;
    startModule;
    startConfigSet;
    addBasePathConfig;
    addFrameworksConfig;
    addBrowsersConfig;
    addReportersConfig;
    addPluginsConfig;
    addPreprocessorsConfig;
    addPortConfig;
    addColorsConfig;
    addAutoWatchConfig;
    addSingleRunConfig;
    addLogLevelConfig;
    endConfigSet;
    endModule;
}
