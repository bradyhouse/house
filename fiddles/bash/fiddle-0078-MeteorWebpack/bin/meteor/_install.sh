#!/usr/bin/env bash

function isMeteorInstalled() {
    if [[ ! $(which meteor;) ]]
    then
        echo "false";
    else
        echo "true";
    fi
}

function installMeteor() {
    log "$0" "installMeteor";
    installed=$(isMeteorInstalled;);
    if [[ "${installed}" == "false" ]]
    then
        npm install -g meteor;
    fi
}

function isMeteorWebpackInstalled() {
    if [[ ! $(which meteor-webpack;) ]]
    then
        echo "false";
    else
        echo "true";
    fi
}

function installMeteorWebpack() {
    log "$0" "installMeteorWebpack";
    installed=$(isMeteorWebpackInstalled;);
    if [[ "${installed}" == "false" ]]
    then
        npm install meteor-webpack -g
    fi
}
