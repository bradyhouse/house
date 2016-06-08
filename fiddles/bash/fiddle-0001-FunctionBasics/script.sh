#!/usr/bin/env bash

clear;
echo "$0" | sed 's/\.\///g' | awk '{print toupper($0)}'

function controlFunction() {
    echo "hello $1"
}

function valueFunction() {
    z=`expr $1 + 3`;
    echo ${z};
}

function subDelimStr() {
    _str=$1;
    _delm=$2;
    _pos=$3;
    IFS=${_delm} read -r -a array <<< "${_str}";
    _arrayLength=$(echo "${#array[@]}";);
    if [[ ${_pos} -lt ${_arrayLength} ]]
    then
        echo ${array[${_pos}]};
    else
        echo "";
    fi
}


subDelimStr "fiddle-0000-Template" "-" 2;
