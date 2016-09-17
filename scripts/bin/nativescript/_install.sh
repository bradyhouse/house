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
# 09/16/2016 - See CHANGELOG @ 201609160420
# ---------------------------------------------------------------------------------------------------|

this=$0;

function typescriptInstall() {
    groupLog "typescriptInstall";
    installed=$(isInstalled "tns";);
    if [[ "${installed}" == "false" ]]
    then
        npm install -g typescript || exit $?;
    fi
}

function nativescriptInstall() {
    groupLog "nativescriptInstall";
    installed=$(isInstalled "nativescript";);
    if [[ "${installed}" == "false" ]]
    then
        npm install -g nativescript || exit $?;
    fi
}

function isNodeVerInstalled() {
    if [[ ! -d "${NVM_DIR}/versions/node/v${__NODE_VERSION__}" ]]
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
        groupLog "${this}: nvm is not installed or NVM_DIR is not configured.";
        groupLog "${this}: run the following command: ";
        echo -e "\tnpm install -g nvm";
        exit -1;
    else
        if [[ $(isNodeVerInstalled;) -eq 1 ]]
        then
            groupLog "${this}: node version ${__NODE_VERSION__} is not installed";
            exit -1;
        fi
    fi
    . ~/.nvm/nvm.sh;
}

function nvmUseNodeVer() {
    groupLog "nvmUseNodeVer";
    nvm install ${__NODE_VERSION__} || exit $?;
}


function adbInstall() {
    groupLog "adbInstall";
    installed=$(isInstalled "adb";);
    if [[ "${installed}" == "false" ]]
    then
        groupLog "${this}: adb is not installed";
        exit -1;
    fi
}
