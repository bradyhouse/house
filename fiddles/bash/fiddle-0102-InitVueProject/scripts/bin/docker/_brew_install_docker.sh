#!/usr/bin/env bash
# ---------------------------------------------------------------------------------------------------|
#  Repo                    : https://github.com/bradyhouse/house_____________________________________|
#  Specification           : N/A_____________________________________________________________________|
#  Specification Path      : N/A_____________________________________________________________________|
#  Author                  : brady house_____________________________________________________________|
#  Create date             : 05/02/2016______________________________________________________________|
#  Description             : MASTER DOCKER / DOCKER-MACHINE INSTALL FUNCTIONS________________________|
#  Input Parameters        : N/A_____________________________________________________________________|
#  Initial Consumer        : ../../fiddle-docker.sh__________________________________________________|
# ---------------------------------------------------------------------------------------------------|
#  Revision History::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::|
# ---------------------------------------------------------------------------------------------------|
# Baseline Ver - CHANGELOG.MARKDOWN ~ 201605180420
# ---------------------------------------------------------------------------------------------------|


function brewInstallDocker() {
    groupLog "brewInstallDocker";
    installed=$(isInstalled "docker";);
    if [[ "${installed}" == "false" ]]
    then
       brew install docker || exit $?;
    fi
}



function brewInstallDockerMachine() {
    groupLog "brewInstallDockerMachine";
    installed=$(isInstalled "docker-machine";);
    if [[ "${installed}" == "false" ]]
    then
        brew install docker-machine || exit $?;
    fi
}