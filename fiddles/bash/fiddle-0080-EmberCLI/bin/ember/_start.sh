#!/usr/bin/env bash

function emberStart() {
    groupLog "emberStart";
    _port=1841
    if [[ $? -eq 1 ]]
    then
        _port=$1;
    fi
    ember serve --port ${_port};
    exit 0;
}
