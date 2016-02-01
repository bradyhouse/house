#!/usr/bin/env bash

clear;
echo "$0" | sed 's/\.\///g' | awk '{print toupper($0)}'
echo "Bash version ${BASH_VERSION}..."

par1=$1;

function isVirtualEnvInstalled() {
    if [[ $(which virtualenv;) ]]
    then
        echo 0
    else
        echo -1
    fi
}
function removeVirtualEnvDirectory() {
    dirName=$1;
    if [[ -d ${dirName} ]]
    then
        rm -rf ${dirName} || exit 88;
    fi
}

function virtualEnv() {
    envName=$1;
    removeVirtualEnvDirectory ${envName} || exit #?;
    virtualenv ${envName} || exit 87;
}
function showParameters() {
    echo "Nope ~ Incorrect number of arguments"
    echo ""
    echo "Usage:"
    echo ""
    echo "$0 \"[v]\""
    echo ""
    echo "[v] - virtual environment name"
    echo ""
}

function catch() {
    case $1 in
        0)  echo "A python virtual env, \"${par1}\", has been created.";
            ;;
        85) echo ""
            ;;
        86) echo "fubar! isVirtualEnvInstalled() failed."
            ;;
        87) echo "fubar! virtualEnv() failed."
            ;;
        88) echo "fubar! removeVirtualEnvDirectory() failed."
            ;;
        *)  echo "fubar! Something went wrong."
            ;;
    esac
    exit $1
}
# try
(
    echo "$#";
    echo "$1";
    if [ "$#" -ne 1 ]; then showParameters; exit 85; fi
    if [[ $(isVirtualEnvInstalled;) ]]
    then
        virtualEnv $1 || exit #?;
    else
        exit 86;
    fi
)
catch $?;

