#!/usr/bin/env bash

clear;
echo "$0" | sed 's/\.\///g' | awk '{print toupper($0)}'
echo "Bash version ${BASH_VERSION}..."

function isLiveServerInstalled() {
    if [[ ! $(which live-server;) ]]
    then
        exit -1
    else
        exit 0
    fi
}

function installLiveServer() {
    if [[ ! $(isLiveServerInstalled;) ]]
    then
        sudo npm install -g live-server;
    else
        $(echo "live-sever is installed")
    fi
}
