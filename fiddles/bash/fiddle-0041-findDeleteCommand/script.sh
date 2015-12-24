#!/usr/bin/env bash

clear;
echo "$0" | sed 's/\.\///g' | awk '{print toupper($0)}'
echo "Bash version ${BASH_VERSION}..."

function controlFunction() {
    echo " hello $1"
}

function valueFunction() {
    z=`expr $1 + 3`;
    echo ${z};
}
controlFunction;
controlFunction $(whoami;);
rc=$(valueFunction 2;);
echo "2 + 3 = ${rc}";
