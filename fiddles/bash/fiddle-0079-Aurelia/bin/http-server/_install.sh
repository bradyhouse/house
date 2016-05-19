#!/usr/bin/env bash

function isHttpServerInstalled() {
    if [[ ! $(which http-server;) ]]
    then
        echo "false";
    else
        echo "true";
    fi
}

function installHttpServer() {
    groupLog "installHttpServer";
    installed=$(isHttpServerInstalled;);
    if [[ "${installed}" == "false" ]]
    then
        npm install http-server -g || exit $?;
    fi
}
