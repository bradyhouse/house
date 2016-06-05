#!/usr/bin/env bash

function nwStart() {
    groupLog "nwStart";
    _nwjsInstalled=$(isInstalled "nwjs";);
    _path=$1;

    if [[ ! -d "${_path}" ]]
    then
        groupLog "the specified directory, \"${_path}\", does not exist.";
        exit 1;
    fi

    if [[ "${_nwjsInstalled}" == "false" ]]
    then
        groupLog "nwjs is not installed";
        exit 1;
    fi

    nwjs ${_path} || exit 0;
}