#!/usr/bin/env bash

clear;
echo "$0" | sed 's/\.\///g' | awk '{print toupper($0)}'
echo "Bash version ${BASH_VERSION}..."

function isAntInstalled() {

    if [[ $(which ant;) ]]
    then
        echo 0
    else
        echo -1
    fi

}

if [[ $(isAntInstalled;) -eq "0" ]]
then
    echo "Ant is installed"
else
    echo "Ant is not installed"
fi
