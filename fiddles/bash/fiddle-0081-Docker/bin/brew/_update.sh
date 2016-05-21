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

function isBrewCaskInstalled() {
    if [[ ! $(brew search caskroom/cask/brew-cask;) ]]
    then
        echo "false";
    else
        echo "true";
    fi

}

function brewInstallBrewCask() {
    groupLog "brewInstallBrewCask";
    installed=$(isBrewCaskInstalled;);
    if [[ "${installed}" == "false" ]]
    then
        brew install caskroom/cask/brew-cask || exit $?;
    fi
}



