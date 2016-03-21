#!/usr/bin/env bash

function isYoInstalled() {
    if [[ ! $(which yo;) ]]
    then
        echo "false";
    else
        echo "true";
    fi
}

function npmInstallYoGlobal() {
    log "$0" "npmInstallYoGlobal";
    installed=$(isYoInstalled;);
    if [[ "${installed}" == "false"  ]]
    then
        npm install -g browser-sync;
    fi
}

function isGeneratorTypescriptInstalled() {
    if [[ ! $(which generator-typescript;) ]]
    then
        echo "false";
    else
        echo "true";
    fi
}

function npmInstallGeneratorTypescriptGlobal() {
    log "$0" "npmInstallGeneratorTypescriptGlobal";
    installed=$(isGeneratorTypescriptInstalled;);
    if [[ "${installed}" == "false"  ]]
    then
        npm install -g generator-typescript;
    fi
}

function isGeneratorSassTypescriptInstalled() {
    if [[ ! $(which generator-gulp-sass-typescript;) ]]
    then
        echo "false";
    else
        echo "true";
    fi
}

function npmInstallGeneratorSassTypescriptGlobal() {
    log "$0" "npmInstallGeneratorSassTypescriptGlobal";
    installed=$(isGeneratorSassTypescriptInstalled;);
    if [[ "${installed}" == "false"  ]]
    then
        npm install -g generator-gulp-sass-typescript;
    fi
}

function isNodeSassInstalled() {
    if [[ ! $(which node-sass;) ]]
    then
        echo "false";
    else
        echo "true";
    fi
}

function npmInstallNodeSassGlobal() {
    log "$0" "npmInstallNodeSass";
    installed=$(isNodeSassInstalled;);
    if [[ "${installed}" == "false"  ]]
    then
        npm install -g node-sass;
    fi
}



