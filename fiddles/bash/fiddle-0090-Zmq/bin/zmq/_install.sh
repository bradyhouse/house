#!/usr/bin/env bash

this=$0;

function isZmqBaseLibInstalled() {
    _installed=$(brew info zmq | grep "Not installed" | wc -l | sed -e 's/^[[:space:]]*//');
    if [[ ${_installed} -eq 1 ]]
    then
        echo "false";
    else
        echo "true";
    fi
}


function zmqBaseLibInstall() {
    groupLog "zmqInstall";
    installed=$(isZmqBaseLibInstalled;);
    if [[ "${installed}" == "false" ]]
    then
        brew install zmq;
    fi
}

function zmqNodeInstall() {
    groupLog "zmqInstall";
    installed=$(isInstalled "zmq";);
    if [[ "${installed}" == "false" ]]
    then
        brew install zmq;
    fi
}


function zmqInstall() {
    groupLog "zmqInstall";
    zmqInstalled=$(isZmqBaseLibInstalled;);
    npmInstalled=$(isInstalled "npm";);

    if [[ ${npmInstalled} == "false" ]]
    then
        groupLog "${this}: npm is not installed";
        exit -1;
    fi

    if [[ ${zmqInstalled} == "false" ]]
    then
        brew install zmq || exit $?;
        if [[ -d "${_path}" ]]
        then
            read -p "\"${_path}\" already exists. Do you want to delete it (Y/n)? " _create;
            if [[ "${_create}" == "n" ]]
            then
                exit 0;
            fi
            rm -rf "${_path}" || exit $?;
        fi
        mkdir "${_path}" || exit $?;
        cd "${_path}" || exit $?;
        npm install zmq || exit $?;
        node --harmony -p -e 'require("zmq")' || exit $?;
    fi

}