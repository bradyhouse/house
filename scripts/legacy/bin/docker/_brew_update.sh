#!/usr/bin/env bash
# ---------------------------------------------------------------------------------------------------|
#  Repo                    : https://github.com/bradyhouse/house_____________________________________|
#  Specification           : N/A_____________________________________________________________________|
#  Specification Path      : N/A_____________________________________________________________________|
#  Author                  : brady house_____________________________________________________________|
#  Create date             : 05/02/2016______________________________________________________________|
#  Description             : MASTER BREW UPDATE FUNCTION_____________________________________________|
#  Input Parameters        : ASSUMES HOME BREW IS INSTALLED__________________________________________|
#  Initial Consumer        : ../../fiddle-docker.sh__________________________________________________|
# ---------------------------------------------------------------------------------------------------|
#  Revision History::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::|
# ---------------------------------------------------------------------------------------------------|
# Baseline Ver - CHANGELOG.MARKDOWN ~ 201605180420
# ---------------------------------------------------------------------------------------------------|

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



