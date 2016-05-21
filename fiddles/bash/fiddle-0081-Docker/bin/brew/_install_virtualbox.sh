#!/usr/bin/env bash

function brewInstallVirtualbox() {
    groupLog "brewInstallVirtualbox";
    installed=$(isInstalled "virtualbox";);
    if [[ "${installed}" == "false" ]]
    then
        brew cask install virtualbox || exit $?;
    fi
}