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
