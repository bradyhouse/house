#!/usr/bin/env bash

clear;
echo "$0" | sed 's/\.\///g' | awk '{print toupper($0)}'
echo "Bash version ${BASH_VERSION}..."


function reset() {
    if [[ -d "house" ]]
    then
        rm -rf house
    fi
}

function gitClone() {
    git clone https://github.com/bradyhouse/house.git;
}

function gitSubModuleInit() {
    git submodule init;
}

function gitSubModuleUpdate() {
    git submodule update;
}
