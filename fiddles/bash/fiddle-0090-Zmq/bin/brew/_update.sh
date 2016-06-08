#!/usr/bin/env bash

this=$(pwd;);

function brewUpdate() {
    groupLog "brewUpdate";
    installed=$(isInstalled "brew";);
    if [[ "${installed}" == "false" ]]
    then
        groupLog "${this}: home brew is not installed";
        exit -1;
    else
        brew update;
    fi
}




