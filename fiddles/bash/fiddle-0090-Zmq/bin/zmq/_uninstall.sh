#!/usr/bin/env bash

this=$0;

function zmqUninstall() {
    groupLog "brewUpdate";
    installed=$(isInstalled "brew";);
    if [[ "${installed}" == "false" ]]
    then
        groupLog "${this}: home brew is not installed";
        exit -1;
    else
        brew uninstall --force zeromq || exit $?;
    fi
}