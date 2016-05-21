#!/usr/bin/env bash

function brewInstallVirtualbox() {
    groupLog "brewInstallVirtualbox";
    brew cask install virtualbox || exit $?;
}