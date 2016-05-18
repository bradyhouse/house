#!/usr/bin/env bash

function meteorStart() {
    groupLog "meteorStart";
    _port=1841
    if [[ $? -eq 2 ]]
    then
        _port=$2;
    fi
    cd $1;
    meteor;
    exit 0;
}