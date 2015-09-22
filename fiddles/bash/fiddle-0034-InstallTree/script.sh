#!/usr/bin/env bash

clear;
echo "$0" | sed 's/\.\///g' | awk '{print toupper($0)}'
echo "Bash version ${BASH_VERSION}..."

function isTreeInstalled() {

    if [[ $(which tree;) ]]
    then
        echo 0
    else
        echo -1
    fi

}

function installTree() {
     brew install tree -y
}


if [[ $(isTreeInstalled;) -eq "0" ]]
then
    echo "Tree is installed"
else
    echo "Tree is not installed";
    echo "Installing Tree ...";
    installTree;
fi
