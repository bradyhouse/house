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
    _root_path=$1;
    if [[ -d "${_root_path}" ]]
    then
        cd "${_root_path}";
        mkdir app;
    else
        echo -1;
    fi
}

function addDirectories() {
    log "$0" "addDirectories";
    _root_path=$1;
    _src_root_path="src";
    createRootDirectory "${_root_path}";
    cd "${_root_path}";
    createSrcDirectory;
    createAppDirectory "${_src_root_path}";
    endLog "directories added";
}
