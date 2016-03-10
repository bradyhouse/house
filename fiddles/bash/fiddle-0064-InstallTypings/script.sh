#!/usr/bin/env bash

clear;
echo "$0" | sed 's/\.\///g' | awk '{print toupper($0)}'
echo "Bash version ${BASH_VERSION}..."

function isTypingsInstalled() {
    if [[ ! $(which typings;) ]]
    then
        exit -1
    else
        exit 0
    fi
}

function installTypings() {
    if [[ ! $(isTypingsInstalled;) ]]
    then
        sudo npm install -g typings;
    else
        $(echo "typings is installed")
    fi
}
