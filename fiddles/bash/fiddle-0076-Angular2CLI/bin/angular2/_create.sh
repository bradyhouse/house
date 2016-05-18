#!/usr/bin/env bash

function ngCreate() {
    groupLog "ngCreate";
    if [[ -e "$1" ]]
    then
        rm -rf "$1" || exit $?;
    fi
    ng new $1;
}

