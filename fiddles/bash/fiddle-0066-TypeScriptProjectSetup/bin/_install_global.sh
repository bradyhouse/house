#!/usr/bin/env bash

function isBowerInstalled() {
    if [[ ! $(which bower;) ]]
    then
        echo "false";
    else
        echo "true";
    fi
}

function npmInstallBowerGlobal() {
    log "$0" "npmInstallBowerGlobal";
    installed=$(isBowerInstalled;);
    if [[ "${installed}" == "false" ]]
    then
        npm install -g bower;
    fi
}

function isTsdInstalled() {
    if [[ ! $(which tsd;) ]]
    then
        echo "false";
    else
        echo "true";
    fi
}

function npmInstallTsdGlobal() {
    log "$0" "npmInstallTsdGlobal";
    installed=$(isTsdInstalled;);
    if [[ "${installed}" == "false" ]]
    then
        npm install -g tsd;
    fi
}

function isGulpInstalled() {
    if [[ ! $(which gulp;) ]]
    then
        echo "false";
    else
        echo "true";
    fi
}

function npmInstallGulpGlobal() {
    log "$0" "npmInstallGulpGlobal";
    installed=$(isGulpInstalled;);
    if [[ "${installed}" == "false" ]]
    then
        npm install -g gulp;
    fi
}

function isTypescriptInstalled() {
    if [[ ! $(which tsc;) ]]
    then
        echo "false";
    else
        echo "true";
    fi
}

function npmInstallTypescriptGlobal() {
    log "$0" "npmInstallTypescriptGlobal";
    installed=$(isTypescriptInstalled;);
    if [[ "${installed}" == "false" ]]
    then
        npm install -g typescript;
    fi
}

function isBrowserifyInstalled() {
    if [[ ! $(which browserify;) ]]
    then
        echo "false";
    else
        echo "true";
    fi
}

function npmInstallBrowserifyGlobal() {
    log "$0" "npmInstallBrowserifyGlobal";
    installed=$(isBrowserifyInstalled;);
    if [[ "${installed}" == "false" ]]
    then
        npm install -g browserify;
    fi
}

function isBrowserSyncInstalled() {
    if [[ ! $(which browser-sync;) ]]
    then
        echo "false";
    else
        echo "true";
    fi
}

function npmInstallBrowserSyncGlobal() {
    log "$0" "npmInstallBrowserSyncGlobal";
    installed=$(isBrowserSyncInstalled;);
    if [[ "${installed}" == "false"  ]]
    then
        npm install -g browser-sync;
    fi
}

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
