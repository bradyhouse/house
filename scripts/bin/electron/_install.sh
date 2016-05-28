#!/usr/bin/env bash
# ---------------------------------------------------------------------------------------------------|
#  Repo                    : https://github.com/bradyhouse/house_____________________________________|
#  Specification           : N/A_____________________________________________________________________|
#  Specification Path      : N/A_____________________________________________________________________|
#  Author                  : brady house_____________________________________________________________|
#  Create date             : 05/02/2016______________________________________________________________|
#  Description             : NATIVESCRIPT INSTALL SETUP______________________________________________|
#  Entry Point             : N/A_____________________________________________________________________|
#  Input Parameters        : N/A_____________________________________________________________________|
#  Initial Consumer        : ../fiddle-nativescript.sh_______________________________________________|
# ---------------------------------------------------------------------------------------------------|
#  Revision History::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::|
# ---------------------------------------------------------------------------------------------------|
# Baseline Ver - CHANGELOG.MARKDOWN ~ 201605180420
# ---------------------------------------------------------------------------------------------------|

this=$0;


function isNodeVer426Installed() {
    if [[ ! -d "${NVM_DIR}/versions/node/v4.2.6" ]]
    then
        return 1;
    else
        return 0;
    fi
}

function isNodeVer5Installed() {
    if [[ ! -d "${NVM_DIR}/versions/node/v5.0.0" ]]
    then
        return 1;
    else
        return 0;
    fi
}

function isNvmInstalled() {
    if [[ ! -d "${NVM_DIR}" ]]
    then
        echo "false";
    else
        echo "true";
    fi
}

function nvmInstall() {
    groupLog "nvmInstall";
    installed=$(isNvmInstalled;);
    if [[ "${installed}" == "false" ]]
    then
        groupLog "${this}: nvm is not installed";
        exit 1;
    else
        if [[ $(isNodeVer5Installed;) -eq 1 ]]
        then
            groupLog "${this}: node version 5.0 is not installed";
            exit 1;
        fi
        if [[ $(isNodeVer426Installed;) -eq 1 ]]
        then
            groupLog "${this}: node version 4.2.6 is not installed.";
            exit 1;
        fi
    fi
    . ~/.nvm/nvm.sh;
}

function nvmUseNodeVer5() {
    groupLog "nvmUseNodeVer5";
    nvm use 5.0 || exit $?;
}

function nvmUseNodeVer426() {
    groupLog "nvmUseNodeVer426";
    nvm use 4.2.6 || exit $?;
}

function electronInstall() {
    groupLog "electronInstall";
    installed=$(isInstalled "electron";);
    if [[ "${installed}" == "false" ]]
    then
        npm install electron -g || exit $?;
    fi
}



