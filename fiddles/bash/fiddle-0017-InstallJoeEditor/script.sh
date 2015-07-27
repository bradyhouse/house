#!/usr/bin/env bash

clear;
echo "$0" | sed 's/\.\///g' | awk '{print toupper($0)}'
echo "Bash version ${BASH_VERSION}..."

function isWgetInstalled() {

    if [[ $(which wget;) ]]
    then
        return 0
    else
        return -1
    fi
}

function isHomeBrewInstalled() {
    if [[ $(which brew;) ]]
    then
        return 0
    else
        return -1
    fi
}
function installWget() {
    brew install wget || return -1
    return 0
}
function downloadJoeEditor() {
    wget http://dickens.rice.iit.edu/456/Files/joe-4.0.tar.gz || return -1
    tar -zxvf joe-4.0.tar.gz || return -1
    return 0
}

#try
(
    if [[ ! $(isWgetInstalled;) ]]
    then
        if [[ ! $(isHomeBrewInstalled;) ]]; then exit 86; fi
        installWget;


    fi
)
#catch
_rc=$?
case ${_rc} in
    0)
        echo "Joe Text Editor version 4.0 downloaded successfully."
        ;;
    86)
        ;;
    *)
        ;;
esac





