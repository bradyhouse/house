#!/usr/bin/env bash

clear;
echo "$0" | sed 's/\.\///g' | awk '{print toupper($0)}'
echo "Bash version ${BASH_VERSION}..."

function isJsBeautifyInstalled() {
    if [[ ! $(which js-beautify;) ]]
    then
        exit -1
    else
        exit 0
    fi
}

function installJsBeautify() {
    if [[ ! $(isJsBeautifyInstalled;) ]]
    then
        sudo npm -g install js-beautify
    else
        $(echo "js-beautify is installed")
    fi
}
