#!/usr/bin/env bash

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