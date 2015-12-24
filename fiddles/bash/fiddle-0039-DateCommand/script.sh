#!/usr/bin/env bash

_date="2015-10-05";
_time="22:17:08";

if [ "$#" -eq 1 ]; then _date=$1; fi
if [ "$#" -gt 1 ]; then _time=$2; fi

function convertToEpoch() {
    rc=$(date -j -f "%Y-%m-%d %X" "$1 $2" "+%s";);
    echo "${rc}";
}

rc=$(convertToEpoch ${_date} ${_time};);

echo ${rc}



