#!/usr/bin/env bash

function isEmberInstalled() {
    if [[ ! $(which ember;) ]]
    then
        echo "false";
    else
        echo "true";
    fi
}

function installEmber() {
    log "$0" "installEmber";
    installed=$(isEmberInstalled;);
    if [[ "${installed}" == "false" ]]
    then
        npm install -g ember-cli || exit $?;
    fi
}
