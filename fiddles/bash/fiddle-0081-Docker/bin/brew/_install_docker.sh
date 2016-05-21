#!/usr/bin/env bash

function brewInstallDocker() {
    groupLog "brewInstallDocker";
    brew install docker || exit $?;
}

function brewInstallDockerMachine() {
    groupLog "brewInstallDockerMachine";
    brew install docker-machine || exit $?;
}