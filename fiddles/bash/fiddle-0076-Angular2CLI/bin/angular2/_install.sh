#!/usr/bin/env bash

function isAngularCLIInstalled() {
    if [[ ! $(which ng;) ]]
    then
        echo "false";
    else
        echo "true";
    fi
}

function npmInstallAngularCLIGlobal() {
    log "$0" "npmInstallAngularCLIGlobal";
    installed=$(isAngularCLIInstalled;);
    if [[ "${installed}" == "false" ]]
    then
        npm install -g angular-cli;
    fi
}
