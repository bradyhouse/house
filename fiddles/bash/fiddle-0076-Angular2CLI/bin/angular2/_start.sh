#!/usr/bin/env bash

function ngStart() {
    groupLog "ngStart";
    _port=1841
    if [[ $? -eq 2 ]]
    then
        _port=$2;
    fi
    cd $1;
    ng serve --port ${_port};
    exit 0;
}