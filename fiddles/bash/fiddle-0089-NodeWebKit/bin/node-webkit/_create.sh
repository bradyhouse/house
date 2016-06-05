#!/usr/bin/env bash

nwCreate() {
    groupLog "nwjsCreate";
    _startPath=$(pwd);
    _path=$1;
    _isNode=$(isInstalled "node");
    _isNpm=$(isInstalled "npm");
    if [[ "${_isNode}" == "true" && ("${_isNpm}" == "true") ]]
    then
        if [[ -d "${_path}" ]]
        then
            read -p "\"${_path}\" already exists. Do you want to delete it (Y/n)? " _create;
            if [[ "${_create}" == "n" ]]
            then
                exit 0;
            fi
            rm -rf "${_path}" || exit $?;
        fi
        cp -rf "template" "${_path}" || exit $?;
        cd "${_path}" || exit $?;
        npm install || exit $?;
        cd ${_startPath};
    fi
}