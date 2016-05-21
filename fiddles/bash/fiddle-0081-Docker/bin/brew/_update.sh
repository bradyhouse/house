#!/usr/bin/env bash

this=$(pwd;);

function isBrewInstalled() {
    if [[ ! $(which brew;) ]]
    then
        echo "false";
    else
        echo "true";
    fi
}


function brewUpdate() {
    groupLog "brewUpdate";
    installed=$(isBrewInstalled;);
    if [[ "${installed}" == "false" ]]
    then
        groupLog "${this}: home brew is not installed";
        exit -1;
    else
        brew update;
    fi
}

function brewInstallCask() {
    groupLog "brewInstallCask";
    brew install caskroom/cask/brew-cask || exit $?;
}



