#!/usr/bin/env bash

function meteorCreate() {
    groupLog "meteorCreate";
    if [[ -e "$1" ]]
    then
        rm -rf "$1" || exit $?;
    fi
    meteor create $1;
}
