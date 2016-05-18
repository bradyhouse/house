#!/usr/bin/env bash

function isMeteorInstalled() {
    if [[ ! $(which meteor;) ]]
    then
        echo "false";
    else
        echo "true";
    fi
}

function npmInstallMeteorGlobal() {
    log "$0" "npmInstallMeteorGlobal";
    installed=$(isMeteorInstalled;);
    if [[ "${installed}" == "false" ]]
    then
        npm install -g meteor;
    fi
}
