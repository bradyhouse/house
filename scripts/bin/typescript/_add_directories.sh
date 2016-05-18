#!/usr/bin/env bash

function createRootDirectory() {
    groupLog "createRootDirectory";
    _root_path=$1;
    if [[ -d "${_root_path}" ]]
    then
        rm -rf "${_root_path}";
    fi
    mkdir "${_root_path}";
}

function createSrcDirectory() {
    groupLog "createSrcDirectory";
    mkdir src;
}

function createAppDirectory() {
    groupLog "createAppDirectory";
    mkdir app;
}

function addDirectories() {
    log "$0" "addDirectories";
    createSrcDirectory;
    cd "src" || exit -1;
    createAppDirectory;
    cd ..;
    endLog "directories added";
}
