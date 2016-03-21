#!/usr/bin/env bash

function createRootDirectory() {
    log "$0" "createRootDirectory";
    _root_path=$1;
    if [[ -d "${_root_path}" ]]
    then
        rm -rf "${_root_path}";
    fi
    mkdir "${_root_path}";
}
